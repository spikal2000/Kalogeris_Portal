


Drop Table IF EXISTS dataExpenses;
Drop Table IF EXISTS dataProducts;
Drop Table IF EXISTS dataEmployees;
Drop Table IF EXISTS dataMain;

CREATE TABLE IF NOT EXISTS dataMain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    totalEarning FLOAT,
    cash FLOAT,
    creditCard FLOAT
);

CREATE TABLE IF NOT EXISTS dataExpenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainId INT,
    name VARCHAR(255),
    totalExpenses FLOAT,
    insertedOn Date,
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
    expenses FLOAT,
    FOREIGN KEY (mainId) REFERENCES dataMain(id)
);









