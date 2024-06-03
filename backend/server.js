
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8081;
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());
const apiRouter = express.Router();


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

const userAccess = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.username = decoded.username;
            req.role = decoded.role;

            if (req.role === 'user') {
                next();
            } else {
                return res.status(403).json({ error: "Forbidden - Admin access required" });
            }
        });
    }
};

const adminAccess = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.username = decoded.username;
            req.role = decoded.role;

            if (req.role === 'admin') {
                next();
            } else {
                return res.status(403).json({ error: "Forbidden - Admin access required" });
            }
        });
    }
};
require('dotenv').config({ path: './process.env'});
// Create a single MySQL connection configuration
const db = mysql.createConnection({
    host:  process.env.DB_HOST,
    user:  process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
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

apiRouter.post('/upload', adminAccess,upload.single('file'), (req, res) => {
    console.log("file received", req.file);
    const code = req.body.branch;
    const param1 = req.body.param1;
    const param2 = req.body.param2;
    // code to string
    //code = code.toString();
    console.log('code:', code);
    
    
    
    const safeCode = encodeURIComponent(code);

    exec(`python ../scripts/uploadFile.py ${req.file.path} ${param2} ${code}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing the script:', error);
            res.status(500).json({ error: 'Error executing the script' });
        }
        console.log('Script output:', stdout);
        console.error('Script errors:', stderr);
        res.send({ message: 'File uploaded successfully', output: stdout });
    });
});



apiRouter.get('/', verifyUser,(req, res) => {
    return res.status(200).send({ authenticated: true, username: req.username, role: req.role });

});

const salt = 10;
// addUser 
apiRouter.post('/addUser', adminAccess, (req, res) => {

    const sql = "INSERT INTO users (username, email, password) VALUES (?);";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err){
            return res.status(500).json({ error: "Error for hassing password"});
        }
        const values = [req.body.username, req.body.email, hash];
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error('SQL Error:', err);
                res.status(500).json({ Status: 'Error creating an user' });
            } else {
                return res.json({ Status: 'User created' });
            }
        });
    })
   
});

const jwtSecret = 'root';

apiRouter.post('/login', (req, res) => {
    
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


apiRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    authenticated = false;
    return res.status(200).send({Status: "User logged out", authenticated: false});
});

// Use the router with the /api prefix
app.use('/api', apiRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
