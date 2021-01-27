const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jabeen98",
    database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    begin();
});

function begin() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select one of the options to continue",
            choices: ["Add Employee, Department or Role", "View Employee, Department or Role", "Update Employee Roles"],
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    return "You must select one of the options to continue"
                }
            },
        }
    ])
}.then(function (answers) {
    console.log("----" + answers.choice.toUpperCase + "----")
    if (answers.choice === 'Add') {
        addEmpDepRol()
    } else {
        viewEmpDepRol
    }
})

function addEmpDepRol() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeName",
            message: "What is the full name of the Employee?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    reutrn "Please enter a value to continue";
                }
            },
        },
        {
            type: "input", 
            name: "departmentName",
            message: "What is the name of the department?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    reutrn "Please enter a value to continue";
                }
        },
        },
        {
            type: "input", 
            name: "roleName",
            message: "What is the role?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    reutrn "Please enter a value to continue";
                }
            },    
        
        }
    ]).then(function (response) {
        var value = []

        values.push(response.employeeName)
        values.push(response.departmentName)
        values.push(response.roleName)

        postDB(values)
    })
}