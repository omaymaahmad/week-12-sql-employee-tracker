const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util")
require("console.table");

// creating connection to SQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jabeen98",
    database: "employee_tracker_db"
});

connection.query = util.promisify(connection.query)

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
.then(function (answers) {
    console.log(answers)
    switch (answers.choice) {
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
            viewEmployees();
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
}
// add employee function
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
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

// add department function
function addDepartment() {
    inquirer.prompt([
        {
            name: "new_dept",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
        var query = "SELECT * FROM department";
        connection.query(query, function (err,res) {
            if (err) throw err;
            console.table("all departments: ", res);
            begin();
        })
    })
}

// add role function
function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "new_role",
                type: "input",
                message: "enter the title of the new role: ",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must enter the title to continue"
                    }
                },
            },
            {
                name: "dept_salary",
                type: "input",
                message: "enter the salary of this position?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must enter the amount to continue"
                    }
                },
            },
            {
                name: "dept_id",
                type: "list",
                message: "what department does the role belong to? ",
                choices: [1, 2, 3],
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "You must select one of the options to continue"
                    }
                },

            },
        ])
    })
}

async function viewEmployees(){
    const employees = await getEmployeesFromDatabase();
    console.table(employees); 
    begin();
}
async function getEmployeesFromDatabase(){
    return connection.query("SELECT * FROM employee")
}

