const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081;
app.use(express.json());
app.use(cors());

// Create a single MySQL connection configuration
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'kalogeris_portal',
    port: 3306,
    // authPlugin: 'mysql_native_password'  // Uncomment this line if necessary for authentication
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Define a route for the root URL to fetch data
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM employees;';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('SQL Error:', err);  // This will log the specific SQL error
            res.status(500).json({ error: 'Error retrieving data from the database' });
        } else {
            res.json(data);
        }
    });
});

app.post('/create', (req, res) => {
    const { name, surname, email, role } = req.body;
    const sql = 'INSERT INTO employees (name, surname, email, role) VALUES (?, ?, ?, ?);';
    db.query(sql, [name, surname, email, role], (err, data) => {
        if (err) {
            console.error('SQL Error:', err);  // This will log the specific SQL error
            res.status(500).json({ error: 'Error creating an employee' });
        } else {
            res.json({ message: 'Employee created' });
        }
    });
}   );


app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, email, role } = req.body;
    const sql = 'UPDATE employees SET name = ?, surname = ?, email = ?, role = ? WHERE id = ?;';
    db.query(sql, [name, surname, email, role, id], (err, data) => {
        if (err) {
            console.error('SQL Error:', err);  // This will log the specific SQL error
            res.status(500).json({ error: 'Error updating an employee' });
        } else {
            res.json({ message: 'Employee updated' });
        }
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
