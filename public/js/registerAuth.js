// Main User Registration Authentication
const { Student } = require('../../models/user');
const makeStudentAccount = require('./makeStudentAccount');

const registerAuth = (req, res) => {
    let errors = [];
    const { studentName, studentEmail, studentBranch, studentPassword, studentConfPass } = req.body;

    // Making sure all fields are filled
    if (!studentName || !studentEmail || !studentBranch || !studentPassword || !studentConfPass) {
        errors.push({ msg: "Please Fill all Fields!" });
    }

    if (studentPassword !== studentConfPass) {
        errors.push({ msg: "Passwords do not Match!" });
    }

    if (studentPassword.length < 6) {
        errors.push({ msg: "Password must be atleast 6 characters!" });
    }

    // If there are errors, render the page again with the errors
    if (errors.length > 0) {
        res.render('register', {
            errors,
            studentName,
            studentEmail,
            studentBranch,
            studentPassword,
            studentConfPass,
        })
    } else {

        // Find the student with the same email
        Student.findOne({ studentEmail: studentEmail })
            .then(user => {
                if (user) {

                    errors.push({ msg: "Email is already Registered!" });
                    res.render('register', {
                        errors,
                        studentName,
                        studentEmail,
                        studentBranch,
                        studentPassword,
                        studentConfPass,
                    })
                }
                else {
                    //studentName, studentEmail, studentBranch, studentPassword - syntax of makeStudentAccount
                    makeStudentAccount(studentName, studentEmail, studentBranch, studentPassword, res, req);
                }
            })
    }

}
// Exporting the user authentication 

module.exports = registerAuth;