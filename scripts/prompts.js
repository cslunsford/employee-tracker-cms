const inquirer = require('inquirer');
const queries = require('./queries');

function initialPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
            name: 'choice'
        }
    ]);
};

function addEmployeePrompt() {
    return Promise.all([queries.getRoles(), queries.getManagers()]).then(([roleChoices, managerChoices]) => {
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName',
                validate: input => input.trim() !== '' || 'Please enter a first name.'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName',
                validate: input => input.trim() !== '' || 'Please enter a last name.'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices,
                name: 'roleTitle'
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                choices: managerChoices,
                name: 'managerName'
            }
        ])
    })
}

function updateEmployeeRole() {
    return Promise.all([queries.getEmployees(), queries.getRoles()]).then(([employeeChoices, roleChoices]) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: "Which employee's role would you like to update?",
                choices: employeeChoices,
                name: 'employeeToUpdate',
            },
            {
                type: 'list',
                message: "What is the employee's new role?",
                choices: roleChoices,
                name: 'selectedRole',
            },
        ])
    })
}

function addRolePrompt(departmentChoices) {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleTitle',
            validate: input => input.trim() !== '' || 'Please enter the role.',
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'roleSalary',
            validate: input => /^\d+(\.\d{1,2})?$/.test(input) || "Please enter the role's salary.",
        },
        {
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: departmentChoices,
            name: 'departmentName'
        }
    ]);
}

function addDepartmentPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'departmentName',
            validate: input => input.trim() !== '' || 'Please enter the department name.' 
        }
    ]);
}

module.exports = {
    initialPrompt,
    addEmployeePrompt,
    updateEmployeeRole,
    addRolePrompt,
    addDepartmentPrompt
};