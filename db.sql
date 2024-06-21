
create database kalogeris_portal;

Drop Table IF EXISTS dataExpenses;
Drop Table IF EXISTS dataProducts;
Drop Table IF EXISTS dataEmployees;
Drop Table IF EXISTS dataMain;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL,
    email varchar(255) NULL,
    password varchar(255) NOT NULL,
    role varchar(45) default 'user'
    
)

CREATE TABLE IF NOT EXISTS dataMain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    totalEarning FLOAT,
    totalExpenses FLOAT,
    cash FLOAT,
    creditCard FLOAT,
    branch VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dataExpenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    totalExpenses FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id)
);



CREATE TABLE IF NOT EXISTS dataProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    description VARCHAR(255),
    quantity FLOAT,
    value FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id)
);


CREATE TABLE IF NOT EXISTS dataEmployees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    receipts FLOAT,
    cash FLOAT,
    credit FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id)
);









