const prompts = require('./prompts');
const queries = require('./queries');

async function initializePrompts() {
    let continuePrompts = true;

    while (continuePrompts) {
        const data = await prompts.initialPrompt();

        switch (data.choice) {
            
            case 'View All Employees': queries.viewAllEmployees();
            break;

            case 'Add Employee': await prompts.addEmployeePrompt().then((employeeData) => {
                queries.addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleTitle, employeeData.managerName);
            });
            break;

            case 'Update Employee Role':
                const { employeeToUpdate, selectedRole } = await prompts.updateEmployeeRole();
                await queries.updateEmployeeRole(employeeToUpdate, selectedRole);
            break;
            
            case 'View All Roles': queries.viewAllRoles();
            break;

            case 'Add Role':
                const departmentChoices = await queries.getDepartments();
                const newRole = await prompts.addRolePrompt(departmentChoices);
                queries.addRole(newRole.roleTitle, newRole.roleSalary, newRole.departmentName);
            break;

            case 'View All Departments': queries.viewAllDepartments();
            break;

            case 'Add Department':
                const newDepartment = await prompts.addDepartmentPrompt();
                queries.addDepartment(newDepartment.departmentName);
            break;

            case 'Quit': continuePrompts = false;
            console.log('Goodbye!');
            break;

            default: console.log('Error! Please try again!');
        }
    }
}

initializePrompts();