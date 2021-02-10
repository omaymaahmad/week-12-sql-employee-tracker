const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const databaseQuestions = require("./db/employeeDatabase");
const { connection } = require("./db/employeeDatabase");

// creating connection to SQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jabeen98",
    database: "employee_tracker_db"
});

// connect to MYSQL server and SQL database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    begin();
});

// question prompts
function begin() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select one of the options to continue",
            choices: ["Add Employee", "Add Department", "Add Role", "View Employee", "View Department", "View Role", "Update Employee Roles", "Exit"],
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
    console.log(answers)
    switch (answers.action) {
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "View Employee":
            viewEmployee();
            break; 
        case "View Department":
            viewDepartment();
            break;   
        case "View Role":
            viewRole();
            break;
        case "Update Employee Roles":
            updateEmployeeRoles();
            break;  
        case "Exit":
            end();
            break;          
    };
    
});

function addEmployee() {
    connection.query("SELECT * FROME role", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "enter Employee's first name: ",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must enter the name to continue"
                    }
                },
            },
            {
                name: "last_name",
                type: "input",
                message: "enter Employee's last name: ",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must enter the name to continue"
                    }
                },
            },
            {
                name: "role_id",
                type: "list",
                message: "select the role for new Employee: ",
                choices: [1,2,3],
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must select one of the options to continue"
                    }
                },
            },

        ]);
    })
}