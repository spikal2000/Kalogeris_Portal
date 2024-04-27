const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081;
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // or replace with the origin of your React app
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
}));

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

// delete employee
app.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE id = ?;';
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('SQL Error:', err);  // This will log the specific SQL error
            res.status(500).json({ error: 'Error deleting an employee' });
        } else {
            // Choose what to return; you probably don't need `data` if deletion was successful
            res.json({ message: 'Employee deleted', details: data });
        }
    });
});


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


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { exec } = require('child_process');


//UPKOAD FILE 
app.post('/upload', upload.single('file'), (req, res) => {
    console.log("file received", req.file);
    const param1 = req.body.param1;
    const param2 = req.body.param2;
    exec(`python ../scripts/uploadFile.py ${req.file.path} ${param2}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing the script:', error);
            res.status(500).json({ error: 'Error executing the script' });
        }
        console.log('Script output:', stdout);
        console.error('Script errors:', stderr);
        res.send({ message: 'File uploaded successfully', output: stdout });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
