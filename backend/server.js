
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const app = express();
const port = 8000;
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors({
    origin: true,
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
    port: 3306
    // authPlugin: 'mysql_native_password'
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

    const sql = "INSERT INTO users (username, email, name, surname, branch, password) VALUES (?);";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err){
            return res.status(500).json({ error: "Error for hassing password"});
        }
        const values = [req.body.username, req.body.email,req.body.name,req.body.surname,req.body.branch, hash];
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error('SQL Error:', err);
                console.log([values]);
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


// --- Orders ---

// Fetch orders
apiRouter.get('/orders', (req, res) => {

    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, data) => {
        if(err){
            return res.status(500).json({ error: "Login error in server"});
        }
        res.json(results);
    });
});

// Create order
apiRouter.post('/orders', async (req, res) => {
    const { current_branch, destination_branch, description } = req.body;
    const user_id = req.user.id; // Assuming user is authenticated and user ID is available

    try {
        await db.query(
            'INSERT INTO orders (user_id, current_branch, destination_branch, description) VALUES (?, ?, ?, ?)',
            [user_id, current_branch, destination_branch, description]
        );
        res.status(201).send('Order created');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Server error');
    }
});

// POWER BI 
apiRouter.post('/get-embed-token', async (req, res) => {
    const tenantId = '083e698c-26e8-4b8d-aed1-fcdb11680e42';
    const clientId = 'f604c8f7-8d40-4bb5-9b6f-ed22378278f4';
    const clientSecret = 'y5K8Q~dll14gTH77dELNjI.9WPTfby496l8Z_aOV';
    const authority = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');

    try {
        const response = await axios.post(authority, params);
        const accessToken = response.data.access_token;

        const reportId = '45cc3b33-6b36-4b08-814e-68fb18d55bb9';
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        const body = {
            reports: [{ id: reportId }],
            datasets: []
        };
        const embedResponse = await axios.post(`https://api.powerbi.com/v1.0/myorg/reports/${reportId}/GenerateToken`, body, config);
        res.json({ embedToken: embedResponse.data.token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).send(`Error generating token: ${error.message}`);
    }
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
