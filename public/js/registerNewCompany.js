// Main Company Registration Authentication
//const { Company } = require('../../models/user');
const fs = require('fs');


const companyRegAuth = (req, res, file_variable, user_obj) => {
    let errors = [];
    const { companyName, companyEmail, companyBranch, companySalary, companyDescription, companyImage } = req.body;

    // Making sure all fields are filled
    if (!companyName || !companyEmail || !companyBranch || !companySalary || !companyDescription) {
        errors.push({ msg: "Please Fill all Fields!" });
    }

    // If there are errors, render the page again with the errors
    if (errors.length > 0) {
        res.render('newCompany', {
            errors,
            companyName,
            companyEmail,
            companyBranch,
            companySalary,
            companyDescription,
            companyImage
        })
    } else {
        // Find the company with the same email
        Company.findOne({ companyEmail: companyEmail })
            .then(company => {
                if (company) {
                    errors.push({ msg: "Company is already Registered!" });
                    res.render('newCompany', {
                        errors,
                        companyName,
                        companyEmail,
                        companyBranch,
                        companySalary,
                        companyDescription,
                        companyImage
                    })
                }
                else {
                    // Create a new company
                    const newCompany = new Company({
                        companyName: companyName,
                        companyEmail: companyEmail,
                        companyBranch: companyBranch,
                        companySalary: companySalary,
                        companyDescription: companyDescription,
                        companyImage: file_variable,

                    });
                    newCompany.save()
                        .then(company => {
                            res.render('companies', { company });
                            console.log("Company Registered!");

                        }
                        )
                        .catch(err => console.log(err));

                }
            })
    }

}
// Exporting the user authentication 
//export default registerAuth;
module.exports = companyRegAuth;
