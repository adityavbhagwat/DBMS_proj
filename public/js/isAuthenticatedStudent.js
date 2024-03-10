// Importing the required libraries
const bcrypt = require('bcryptjs');
//const { Student, Company } = require('../../models/user.js');

const isAuthenticatedStudent = (studentRegNumber, password, res, admin) => {
    Student.findOne({ _id: studentRegNumber })
        .then(user => {
            // User Exists
            if (user) {
                bcrypt.compare(password, user.studentPassword, (err, isMatch) => {
                    console.log(user);
                    // Error
                    if (err) return 0
                    // , { user, admin })
                    if (isMatch) {

                        res.render('dashboard', { user });

                    } else {
                        console.log("User Not Authenticated");
                        res.render('student');
                    }
                })
            } else {
                console.log("User Not Found");
                res.render('student');
            }
        })

}

// Exporting the function
module.exports = isAuthenticatedStudent
