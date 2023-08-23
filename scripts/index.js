const prompts = require('./prompts');

prompts.initialPrompt()
    .then((data) => {
        if (data.choice === 'View All Employees') {
            queries.viewAllEmployees();
        } else if (data.choice === 'Add Employee') {
            queries.addEmployee();
        } else if (data.choice === 'Update Employee Role') {
            queries.updateEmployeeRole();
        } else if (data.choice === 'View All Roles') {
            queries.viewAllRoles();
        } else if (data.choice === 'Add Role') {
            queries.addRole();
        } else if (data.choice === 'View All Departments') {
            queries.viewAllDepartments();
        } else if (data.choice === 'Add Department') {
            queries.addDepartment();
        } else {
            endPrompt();
        }
    });