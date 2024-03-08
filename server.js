// Importing required libraries
const express = require('express');
const path = require('path');
const mysql = require('mysql');

//const mongoose = require('mongoose');
const mainRoute = require('./routes/main');

// Making the main express app
const app = express();

// Connecting to mongoose
//mongoose.connect('mongodb://127.0.0.1:27017/irisWeb')
//    .then(() => {
//        console.log("DATABASE CONNECTED");
//    })
//    .catch(err => {
//        console.log("COULD NOT CONNECT DATABASE");
//        console.log(err);
//    })
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sunil', // Modify to mYSQL paswiord
    database: 'iris' // Create a database called iris in ur mysql
})

connection.connect((err) => {
    if (err) {
        console.log("COULD NOT CONNECT TO DATABASE");
        console.log(err);
    } else {
        console.log("CONNECTED TO DATABASE");

        // Creating the table

        // const createTable = `CREATE TABLE users (
        //     id int AUTO_INCREMENT,
        //     name VARCHAR(255),
        //     email VARCHAR(255),
        //     password VARCHAR(255),

        //     PRIMARY KEY (id)
        // )`;

        // connection.query(createTable, (err, result) => {
        //     if (err) {
        //         console.log("COULD NOT CREATE TABLE");

        //     } else {

        //         console.log("TABLE CREATED");

        //     }


    }
});

// Setting app settings
app.set('view engine', 'ejs');
// Passing body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Setting up static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Using the routes
app.use('/', mainRoute);

// Running the Website
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})
