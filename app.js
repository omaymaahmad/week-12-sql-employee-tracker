const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
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
    // console.log(answers)
    switch (answers.choice) {
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            console.log("Add Department")
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
async function addEmployee() {
    const roleOptions = await connection.query("SELECT * FROM role");
    const managerOptions = await connection.query("SELECT * FROM employee");

    const employee = await inquirer.prompt([
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
           

    ]);
    
    const roleChoices = roleOptions.map(({id, title}) => ({
        name: title,
        value: id
    }));

    const  {roleId} = await inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "What role will this new employee hold?",
        choices: roleChoices
    })

    employee.role_id = roleId; 

    const managerChoices = managerOptions.map(({id, first_name, last_name}) => ({
        name: first_name + last_name,
        value: id
    }));

    const {managerId} = await inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Who will be this new emnployees manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId; 

    await addEmployeeToDB(employee);
    //viewEmployees();
    begin();
}

async function addEmployeeToDB(employee){
    connection.query("INSERT INTO employee SET ?", employee)
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
async function addRole() {
    const newRole = await inquirer.prompt([
            {
                name: "title",
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
                name: "salary",
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
                name: "department_id",
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
        ]);
    await addRoleToDB(newRole);
    begin();    
    
}

async function addRoleToDB(newRole){
    connection.query("INSERT INTO role SET ?", newRole)
}

// view employee function
async function viewEmployees(){
    const employees = await getEmployeesFromDatabase();
    console.table(employees); 
    begin();
}
async function getEmployeesFromDatabase(){
    return connection.query("SELECT * FROM employee")
}

// view department function
async function viewDepartment(){
    const department = await getDepartmentFromDatabase();
    console.table(department); 
    begin();
}
async function getDepartmentFromDatabase(){
    return connection.query("SELECT * FROM department")
}

// view role function 
async function viewRole(){
    const role = await getRoleFromDatabase();
    console.table(role); 
    begin();
}
async function getRoleFromDatabase(){
    return connection.query("SELECT * FROM role")
}
