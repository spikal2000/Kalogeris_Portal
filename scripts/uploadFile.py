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

class FileHandler:
    def __init__(self, filepath):
        self.filepath = filepath
    
    def read_file(self, encoding='ISO-8859-7'):
        with open(self.filepath, 'r', encoding=encoding) as file:
            return file.read()

class DataExtractor:
    def __init__(self, file_content):
        self.content = file_content

    def extract_general_info(self):
        patterns = {
            'date': r"\d{2}\.\d{2}\.\d{4}",
            'total_receipts': r"Σύνολο εισπράξεων: (\d+,\d+)",
            'cash': r"Μετρητά\s+(\d+,\d+)",
            'credit': r"ΠΙΣΤΩΤΙΚΗ\s+(\d+,\d+)",
            'total_expenses': r"Σύνολο εξόδων: (\d+,\d+)"
        }
        extracted_info = {}
        for key, pattern in patterns.items():
            match = re.search(pattern, self.content)
            if match:
                if key == 'date':
                    # Convert the date format from DD.MM.YYYY to YYYY-MM-DD
                    date_obj = datetime.strptime(match.group(), '%d.%m.%Y')
                    extracted_info[key] = date_obj.strftime('%Y-%m-%d')
                else:
                    extracted_info[key] = match.group(1).replace(',', '.')
        return extracted_info
    
    def extract_detailed_entries(self):
        pattern_entries = r"--- (\w+) ---([\s\S]+?)(?=---|$)"
        entries = re.findall(pattern_entries, self.content)
        name_data = []
        for name, data in entries:
            extracted = {
                'Name': name,
                'Receipts': self._extract_pattern(data, 'total_receipts'),
                'Cash': self._extract_pattern(data, 'cash'),
                'Credit': self._extract_pattern(data, 'credit'),
                'Expenses': self._extract_pattern(data, 'total_expenses'),
            }
            name_data.append(extracted)
        return name_data

    def extract_products(self):
        product_pattern = r"^\s*([^\d\n]+)\s+(\d+,\d+)\s+(\d+,\d+)\s*$"
        products = re.findall(product_pattern, self.content, re.MULTILINE)
        categorized_products = {
            'special': [],
            'regular': []
        }
        for product in products:
            if 'Κλείσιμο ημέρας' in product[0] or 'Μετρητά' in product[0]:
                categorized_products['special'].append(product)
            else:
                categorized_products['regular'].append(product)
        return categorized_products

    def _extract_pattern(self, text, pattern_key):
        patterns = {
            'total_receipts': r"Σύνολο εισπράξεων: (\d+,\d+)",
            'cash': r"Μετρητά\s+(\d+,\d+)",
            'credit': r"ΠΙΣΤΩΤΙΚΗ\s+(\d+,\d+)",
            'total_expenses': r"Σύνολο εξόδων: (\d+,\d+)"
        }
        match = re.search(patterns[pattern_key], text)
        return match.group(1) if match else "0,00"

class DataProcessor:
    def __init__(self, entries, products):
        self.entries = entries
        self.products = products
    
    def create_dataframe(self):
        entries_df = pd.DataFrame(self.entries)
        entries_df[['Receipts', 'Cash', 'Credit', 'Expenses']] = entries_df[['Receipts', 'Cash', 'Credit', 'Expenses']].replace(',', '.', regex=True).astype(float)
        
        special_df = pd.DataFrame(self.products['special'], columns=["Description", "Quantity", "Value"])
        regular_df = pd.DataFrame(self.products['regular'], columns=["Description", "Quantity", "Value"])
        
        # Clean and convert columns
        for df in [special_df, regular_df]:
            df["Description"] = df["Description"].str.strip()
            df[['Quantity', 'Value']] = df[['Quantity', 'Value']].replace(',', '.', regex=True).astype(float)

        return entries_df, special_df, regular_df

def connect_to_db():
    return pymysql.connect(host='localhost', user='root', password='root', db='kalogeris_portal', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)


def insert_database(entries_df, special_df, regular_df, expenses_df, general_info):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Convert string to float by removing commas if present and handling as float
            total_receipts = float(general_info['total_receipts'].replace(',', ''))
            cash = float(general_info['cash'].replace(',', ''))
            credit = float(general_info['credit'].replace(',', ''))
            # Insert into dataMain and retrieve the mainId
            sql = "INSERT INTO dataMain (date, totalEarning, cash, creditCard) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (general_info['date'], total_receipts, cash, credit))
            main_id = cursor.lastrowid  # Fetch the last inserted id

            # Insert into dataEmployees
            for index, row in entries_df.iterrows():
                sql = "INSERT INTO dataEmployees (mainId, name, receipts, cash, credit, expenses) VALUES (%s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (main_id, row['Name'], row['Receipts'], row['Cash'], row['Credit'], row['Expenses']))

            # Insert into dataProducts
            combined_df = pd.concat([special_df, regular_df])
            for index, row in combined_df.iterrows():
                sql = "INSERT INTO dataProducts (mainId, description, quantity, value) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (main_id, row['Description'], row['Quantity'], row['Value']))

            
            # Insert into dataExpenses
            for index, row in expenses_df.iterrows():
                # Ensure that TotalExpenses is converted to float properly
                if isinstance(row['TotalExpenses'], str):
                    total_expenses = float(row['TotalExpenses'].replace(',', ''))
                else:
                    total_expenses = float(row['TotalExpenses'])  # Already a number, just convert to ensure it's float

                # Handle potentially missing 'Name'
                name = row.get('Name', None)

                # Prepare and execute the SQL command
                sql = "INSERT INTO dataExpenses (mainId, name, totalExpenses) VALUES (%s, %s, %s)"
                cursor.execute(sql, (main_id, name, total_expenses))

            connection.commit()
    finally:
        connection.close()


# Run the modified function
if __name__ == "__main__":
    filepath = sys.argv[1]
    file_handler = FileHandler(filepath)
    content = file_handler.read_file()

    extractor = DataExtractor(content)
    general_info = extractor.extract_general_info()
    detailed_entries = extractor.extract_detailed_entries()
    products = extractor.extract_products()

    processor = DataProcessor(detailed_entries, products)
    entries_df, special_df, regular_df = processor.create_dataframe()

    # Assume expenses_df is prepared, similar to entries_df
    expenses_df = pd.DataFrame({
        'Name': ['Expense1', 'Expense2'],
        'TotalExpenses': [100, 200]
    })

    insert_database(entries_df, special_df, regular_df, expenses_df, general_info)

    print("Data successfully saved to the database.")