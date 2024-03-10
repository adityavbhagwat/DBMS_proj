// Importing required libraries
const mongoose = require('mongoose');
//const { Student } = require('../../models/user.js');
const bcrypt = require('bcryptjs');
const sendMail = require('./mailStudentEmail.js')

// Connecting to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/irisWeb')
    .then(() => {
        console.log("DATABASE CONNECTED");
    })
    .catch(err => {
        console.log("COULD NOT CONNECT DATABASE");
        console.log(err);
    })

// Making the student account
const makeStudentAccount = async (studentName, studentEmail, studentBranch, studentPassword, res, req) => {
    const entries = await Student.countDocuments();
    const date = new Date();
    const year = date.getFullYear();
    const last_two = year % 100;


    let rollNumber;
    if (entries >= 0 && entries < 10) {
        rollNumber = `${last_two}1${studentBranch}10${entries}`
    }
    else if (entries >= 10 && entries <= 65) {
        rollNumber = `${last_two}1${studentBranch}1${entries % 65}`; // considering only 65 students are in 1 batch
    }
    else {
        rollNumber = `${last_two}1${studentBranch}${Math.floor(entries / 100)}${entries % 65}`
    }

    // Creating the new student registration number
    let RegNumber = last_two * 100000 + 1 * 10000 + entries;
    const newStudent = new Student({
        _id: RegNumber,
        studentRollNum: rollNumber,
        studentName: studentName,
        studentEmail: studentEmail,
        studentBranch: studentBranch,
        studentPassword: studentPassword,
    })

    // Hasing the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.studentPassword, salt, (err, hash) => {
            newStudent.studentPassword = hash;

            // Saving the user to database
            newStudent.save()
                .then(student => {
                    res.render('student');
                    console.log("User Registered!");
                    sendMail(studentEmail, RegNumber, rollNumber).then((success) => console.log("SENT"));

                })
                .catch(err => console.log(err));
        })
    })

}

// Exporting the function
module.exports = makeStudentAccount;
