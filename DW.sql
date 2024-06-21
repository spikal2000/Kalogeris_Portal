-- UPDATE productNames
INSERT INTO [dbo].[salesProductNames](productName)
SELECT DISTINCT description
FROM [dbo].[salesProducts_Staging];

-- UPdate salesSuppliers
INSERT INTO [dbo].[salesSuppliers](supplier, vat, iban, rf, phone1, phone2)
SELECT DISTINCT name, vat, iban, rf, phone1,phone2
FROM [dbo].[salesExpenses_Staging];

--UPDATE branchNames
INSERT INTO [dbo].[salesBranchNames_Dim](branchName)
SELECT DISTINCT branch
FROM [dbo].[salesMain_Staging]

-- UPDATE FACT
INSERT INTO [dbo].[salesMainTable_Fact] 
(	date, 
	totalEarnings, 
	cash,
	creditCard,
	branchID
)
SELECT 
	main.[date] AS [date],
	main.totalEarning AS totalEarnings,
	main.cash AS cash,
	main.creditCard AS creditCard,
	branch.ID AS branchID
FROM [dbo].[salesMain_Staging] main
INNER JOIN [salesBranchNames_Dim] branch
	ON main.branch = branch.branchName

--UPDATE salesProducts_Dim
INSERT INTO [dbo].[salesProducts_Dim]
(
	mainID,
	productNameID,
	quantity,
	value
)
SELECT 
	products.mainId,
	branch.ID,
	products.quantity,
	products.value
FROM [dbo].[salesProducts_Staging] products
INNER JOIN [dbo].[salesBranchNames_Dim] branch
	ON products.description = branch.branchName

--UPDATE [dbo].[salesExpenses_Dim]
INSERT INTO [dbo].[salesExpenses_Dim]
(
	mainID,
	totalExpenses,
	supplierID
)
SELECT 
	expenses.mainId,
	expenses.totalExpenses,
	sup.ID
FROM [dbo].[salesExpenses_Staging] expenses
INNER JOIN [dbo].[salesSuppliers] sup
	ON expenses.name = sup.supplier

-- UPDATE [dbo].[salesEmployees_Dim]
INSERT INTO [dbo].[salesEmployees_Dim]
(
	mainID,
	receipts,
	cash,
	credit,
	employeeID
)
SELECT 
	employee.mainId,
	employee.receipts,
	employee.cash,
	employee.credit,
	ename.ID
FROM [dbo].[salesEmployees_Staging] employee
INNER JOIN [dbo].[salesEmployeeName] ename
	ON employee.name = ename.EmployeeName
--TRUNCATE Staging TAbles
TRUNCATE TABLE [dbo].[salesEmployees_Staging];
TRUNCATE TABLE [dbo].[salesExpenses_Staging];
TRUNCATE TABLE [dbo].[salesProducts_Staging];
TRUNCATE TABLE [dbo].[salesMain_Staging];


--Run Once
TRUNCATE TABLE[dbo].[salesProducts_Dim]
TRUNCATE TABLE[dbo].[salesExpenses_Dim]
TRUNCATE TABLE[dbo].[salesEmployees_Dim]
TRUNCATE TABLE [dbo].[salesBranchNames_Dim]

-- Step 1: Disable Foreign Key Constraints
ALTER TABLE [dbo].[salesMainTable_Fact] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesEmployeeName] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesProductNames] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesSuppliers] NOCHECK CONSTRAINT ALL;

-- Step 2: Delete Data
DELETE FROM [dbo].[salesMainTable_Fact];
DELETE FROM [dbo].[salesEmployeeName];
DELETE FROM [dbo].[salesProductNames];
DELETE FROM [dbo].[salesSuppliers];

-- Step 3: Re-enable Foreign Key Constraints
ALTER TABLE [dbo].[salesMainTable_Fact] WITH CHECK CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesEmployeeName] WITH CHECK CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesProductNames] WITH CHECK CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[salesSuppliers] WITH CHECK CHECK CONSTRAINT ALL;





SELECT *
FROM [dbo].[salesMain_Staging]
SELECT * 
FROM salesProducts_Staging


SELECT *
FROM [dbo].[salesBranchNames_Dim]

SELECT *
FROM salesSuppliers

SELECT *
FROM [dbo].[salesExpenses_Staging]




INSERT INTO [dbo].[salesMainTable_Fact] 
(	
	ID,
	date, 
	totalEarnings, 
	cash,
	creditCard,
	branchID
)
SELECT 
	main.id AS [ID],
	main.[date] AS [date],
	main.totalEarning AS totalEarnings,
	main.cash AS cash,
	main.creditCard AS creditCard,
	branch.ID AS branchID
FROM [dbo].[salesMain_Staging] main
INNER JOIN [salesBranchNames_Dim] branch
	ON main.branch = branch.branchName