# -*- coding: utf-8 -*-
"""
Created on Sat Apr 27 12:44:06 2024
@author: spika
"""
import pymysql
import pandas as pd
import re
import sys
from datetime import datetime
import os

def read_file(filepath, encoding='ISO-8859-7'):
    with open(filepath, 'r', encoding=encoding) as file:
        return file.read()

def extract_general_info(content):
    patterns = {
        'date': r"\d{2}\.\d{2}\.\d{4}",
        'total_receipts': r"Σύνολο εισπράξεων: (\d+,\d+)",
        'cash': r"Μετρητά\s+(\d+,\d+)",
        'credit': r"ΠΙΣΤΩΤΙΚΗ\s+(\d+,\d+)",
        'total_expenses': r"Σύνολο εξόδων: (\d+,\d+)"
    }
    extracted_info = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, content)
        if match:
            if key == 'date':
                date_obj = datetime.strptime(match.group(), '%d.%m.%Y')
                extracted_info[key] = date_obj.strftime('%Y-%m-%d')
            else:
                extracted_info[key] = match.group(1).replace(',', '.')
    return extracted_info

def extract_detailed_entries(content):
    pattern_entries = r"--- (\w+) ---([\s\S]+?)(?=---|$)"
    entries = re.findall(pattern_entries, content)
    name_data = []
    for name, data in entries:
        extracted = {
            'Name': name,
            'Receipts': _extract_pattern(data, 'total_receipts'),
            'Cash': _extract_pattern(data, 'cash'),
            'Credit': _extract_pattern(data, 'credit'),
            'Expenses': _extract_pattern(data, 'total_expenses'),
        }
        name_data.append(extracted)
    return name_data

def extract_products(content):
    product_pattern = r"^\s*([^\d\n]+)\s+(\d+,\d+)\s+(\d+,\d+)\s*$"
    products = re.findall(product_pattern, content, re.MULTILINE)
    categorized_products = {'special': [], 'regular': []}
    for product in products:
        if 'Κλείσιμο ημέρας' in product[0] or 'Μετρητά' in product[0]:
            categorized_products['special'].append(product)
        else:
            categorized_products['regular'].append(product)
    return categorized_products

def _extract_pattern(text, pattern_key):
    patterns = {
        'total_receipts': r"Σύνολο εισπράξεων: (\d+,\d+)",
        'cash': r"Μετρητά\s+(\d+,\d+)",
        'credit': r"ΠΙΣΤΩΤΙΚΗ\s+(\d+,\d+)",
        'total_expenses': r"Σύνολο εξόδων: (\d+,\d+)"
    }
    match = re.search(patterns[pattern_key], text)
    return match.group(1) if match else "0,00"

def create_dataframe(entries, products):
    entries_df = pd.DataFrame(entries)
    entries_df[['Receipts', 'Cash', 'Credit', 'Expenses']] = entries_df[['Receipts', 'Cash', 'Credit', 'Expenses']].replace(',', '.', regex=True).astype(float)
    special_df = pd.DataFrame(products['special'], columns=["Description", "Quantity", "Value"])
    regular_df = pd.DataFrame(products['regular'], columns=["Description", "Quantity", "Value"])
    for df in [special_df, regular_df]:
        df["Description"] = df["Description"].str.strip()
        df[['Quantity', 'Value']] = df[['Quantity', 'Value']].replace(',', '.', regex=True).astype(float)
    return entries_df, special_df, regular_df

def connect_to_db():
    return pymysql.connect(host='84.254.29.206', user='admin', password='Vaggosspyros!997', db='kalogeris_portal', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)

def insert_database(entries_df, special_df, regular_df, expenses_df, total_expenses, general_info, branchCode):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            total_receipts = float(general_info['total_receipts'].replace(',', '')) if isinstance(general_info['total_receipts'], str) else float(general_info['total_receipts'])
            cash = float(general_info['cash'].replace(',', '')) if isinstance(general_info['cash'], str) else float(general_info['cash'])
            credit = float(general_info['credit'].replace(',', '')) if isinstance(general_info['credit'], str) else float(general_info['credit'])

            sql = "INSERT INTO dataMain (date, totalEarning, totalExpenses, cash, creditCard, branch) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (general_info['date'], total_receipts, total_expenses, cash, credit, branchCode))
            main_id = cursor.lastrowid

            for index, row in entries_df.iterrows():
                sql = "INSERT INTO dataEmployees (mainId, name, receipts, cash, credit) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(sql, (main_id, row['Name'], row['Receipts'], row['Cash'], row['Credit']))

            combined_df = pd.concat([special_df, regular_df])
            for index, row in combined_df.iterrows():
                sql = "INSERT INTO dataProducts (mainId, description, quantity, value) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (main_id, row['Description'], row['Quantity'], row['Value']))

            for index, row in expenses_df.iterrows():
                name = index
                value = row[0]
                sql = "INSERT INTO dataExpenses (mainId, name, totalExpenses) VALUES (%s, %s, %s)"
                cursor.execute(sql, (main_id, name, value))

            connection.commit()
    finally:
        connection.close()

def extract_expenses(content):
    # Regex to capture the expenses section including the total expenses line
    expenses_pattern = r"\*\*\* Ανάλυση εξόδων \*\*\*(.*?)Σύνολο εξόδων: (\d+,\d+)"
    match = re.search(expenses_pattern, content, re.DOTALL)
    
    if match:
        expenses_content = match.group(1)
        total_expenses = float(match.group(2).replace(',', '.'))
        
        # Extract individual expense items
        item_pattern = r"([\w\s]+)\s+(\d+,\d+)"
        items = re.findall(item_pattern, expenses_content)
        expenses = {item.strip(): float(amount.replace(',', '.')) for item, amount in items}

        return expenses, total_expenses

    return {}, 0.0

def process_all_files_in_folder(folder_path, branchCode):
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            filepath = os.path.join(folder_path, filename)
            content = read_file(filepath)
            
            general_info = extract_general_info(content)
            detailed_entries = extract_detailed_entries(content)
            products = extract_products(content)

            entries_df, special_df, regular_df = create_dataframe(detailed_entries, products)
            
            expenses_dict, total_expenses = extract_expenses(content)
            expenses_df = pd.DataFrame.from_dict(expenses_dict, orient='index')
            
            insert_database(entries_df, special_df, regular_df, expenses_df, total_expenses, general_info, branchCode)
            print(f"Data from {filename} successfully saved to the database.")

# Run the script
if __name__ == "__main__":
    folder_path = sys.argv[1]
    branchCode = sys.argv[2]
    process_all_files_in_folder(folder_path, branchCode)
    print("All data successfully saved to the database.")