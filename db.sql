DROP DATABASE IF EXISTS kalogeris_portal;
create database kalogeris_portal;
USE kalogeris_portal;
Drop Table IF EXISTS dataExpenses;
Drop Table IF EXISTS dataProducts;
Drop Table IF EXISTS dataEmployees;
Drop Table IF EXISTS dataMain;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS usersDetails;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    branch VARCHAR(255),
    role VARCHAR(45) DEFAULT 'user',
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usersDetails(
    User_id INT PRIMARY KEY,
    year VARCHAR(255),
    month VARCHAR(255),
    baseSalary FLOAT,
    threeYears FLOAT DEFAULT 0,
    SSE FLOAT, 
    sh FLOAT,
    holdings FLOAT,
    salary FLOAT,
    extraSalary FLOAT,
    FOREIGN KEY (User_id) REFERENCES users(id),
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS dataMain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    totalEarning FLOAT,
    totalExpenses FLOAT,
    cash FLOAT,
    creditCard FLOAT,
    branch VARCHAR(255),
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dataExpenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    totalExpenses FLOAT,
    buyDate DATETIME,
    FOREIGN KEY (mainId) REFERENCES dataMain(id),
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS dataProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    description VARCHAR(255),
    quantity FLOAT,
    value FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id),
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS dataEmployees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    receipts FLOAT,
    cash FLOAT,
    credit FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id),
    insertedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@admin.admin', '$2b$10$uZ1soPGXLTfN9VdbpgT6OOUP9KW2qAsCbRt7N13KVdlvQNp1rQC4.', 'admin'),
('user', 'user@user.user', '$2b$10$3hA0uNtkULMGdjSiF0OzKO2ONkas2zZOg9.6uI6n6.kieJ06aagrm', 'user');








