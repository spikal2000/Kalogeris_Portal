

-- Import Files 
DROP TABLE IF EXISTS Bulk_Files_Main;
DROP TABLE IF EXISTS Bulk_files_dataProducts;
DROP TABLE IF EXISTS Bulk_files_dataEmployees;
DROP TABLE IF EXISTS Bulk_files_dataExpenses;

-- History 
DROP TABLE IF EXISTS Bulk_Files_Main_History;
DROP TABLE IF EXISTS Bulk_files_dataProducts_History;
DROP TABLE IF EXISTS Bulk_files_dataEmployees_History;
DROP TABLE IF EXISTS Bulk_files_dataExpenses_History;

-- Logs 
DROP TABLE IF EXISTS Logs;

-- Bulk_Files_Main
CREATE TABLE Bulk_Files_Main (
    id INT PRIMARY KEY,
    date VARCHAR(255),
    totalEarning VARCHAR(255),
    totalExpenses VARCHAR(255),
    cash VARCHAR(255),
    creditCard VARCHAR(255),
    branch VARCHAR(45),
	insertedAt DATETIME
);

--Bulk_files_dataProducts
CREATE TABLE Bulk_files_dataProducts (
    id INT PRIMARY KEY,
    mainId INT,
    description VARCHAR(255),
    quantity FLOAT,
    value FLOAT,
	insertedAt DATETIME
);

--Bulk_files_dataEmployees
CREATE TABLE Bulk_files_dataEmployees (
    id INT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    receipts FLOAT,
    cash FLOAT,
	credit FLOAT,
	insertedAt DATETIME
);

--Bulk_files_dataExpenses
CREATE TABLE Bulk_files_dataExpenses (
    id INT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
	totalExpenses FLOAT,
	buyDate DATETIME,
	insertedAt DATETIME
);

-- ##########   HISTORY TABLES   ##########

-- Bulk_Files_Main_History
CREATE TABLE Bulk_Files_Main_History (
    id INT PRIMARY KEY,
    date VARCHAR(255),
    totalEarning VARCHAR(255),
    totalExpenses VARCHAR(255),
    cash VARCHAR(255),
    creditCard VARCHAR(255),
    branch VARCHAR(45),
	insertedAt DATETIME,
	historyInsertedAt DATETIME
);

--Bulk_files_dataProducts_History
CREATE TABLE Bulk_files_dataProducts_History (
    id INT PRIMARY KEY,
    mainId INT,
    description VARCHAR(255),
    quantity FLOAT,
    value FLOAT,
	insertedAt DATETIME,
	historyInsertedAt DATETIME
);

--Bulk_files_dataEmployees_History
CREATE TABLE Bulk_files_dataEmployees_History (
    id INT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    receipts FLOAT,
    cash FLOAT,
	credit FLOAT,
	insertedAt DATETIME,
	historyInsertedAt DATETIME
);

--Bulk_files_dataExpenses_History
CREATE TABLE Bulk_files_dataExpenses_History (
    id INT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
	totalExpenses FLOAT,
	buyDate DATETIME,
	insertedAt DATETIME,
	historyInsertedAt DATETIME
);



-- ##########   Logs   ##########
CREATE TABLE Logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tableRef VARCHAR(255),
    description VARCHAR(255),
	error VARCHAR(255),
	insertedAt DATETIME
);





