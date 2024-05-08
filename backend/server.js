
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8081;
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());

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

//UPKOAD FILE 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { exec } = require('child_process');

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

//  USER AUTHENTICATION

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

app.get('/', verifyUser,(req, res) => {
    return res.json({ Status: "User logged in", username: req.username, role: req.role});

});

const salt = 10;
// addUser 
app.post('/addUser', (req, res) => {

    const sql = "INSERT INTO users (username, email, password) VALUES (?);";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err){
            return res.status(500).json({ error: "Error for hassing password"});
        }
        const values = [req.body.username, req.body.email, hash];
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error('SQL Error:', err);  // This will log the specific SQL error
                res.status(500).json({ Status: 'Error creating an user' });
            } else {
                return res.json({ Status: 'User created' });
            }
        });
    })
   
});

const jwtSecret = 'root';

app.post('/login', (req, res) => {
    
    const sql = "SELECT * FROM users WHERE username = ?;";
    db.query(sql, [req.body.username], (err, data) => {
        if(err){
            return res.status(500).json({ error: "Login error in server"});
        }
        if(data.length > 0){
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if(err){
                    return res.status(500).json({ error: "Login error in server"});
                }
                if(result){
                    const name = data[0].username;
                    const token = jwt.sign({username: data[0].username, role: data[0].role}, jwtSecret, {expiresIn: '1d'});
                    res.cookie('token', token, {sameSite: 'none', secure: true});
                    return res.json({Status: "User logged in", username: data[0].username});
                }else{
                    return res.status(401).json({ error: "Wrong password"});
                }
            });
        }else{
            return res.status(404).json({ error: "User not found"});
        }
    });
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "User logged out"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
