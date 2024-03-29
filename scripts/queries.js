const db = require('../config/connection');

function viewAllEmployees() {
    const query = `SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name AS department,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM
    employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id`;
    db.query(query, (err, results) => {
        err ? console.error(err) : console.table(results);
    });
};

function addEmployee(firstName, lastName, roleTitle, managerName) {
    const roleQuery = 'SELECT id FROM role WHERE title = ?';
    const roleValue = [roleTitle];
    db.query(roleQuery, roleValue, (roleErr, roleResults) => {
        if (roleErr) {
            console.error(roleErr);
        } else {
            console.log(roleResults);
            const roleId = roleResults[0].id;
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const values = [firstName, lastName, roleId, managerName];
            db.query(query, values, (err, results) => {
                err ? console.error(err) : console.log(`Successfully added ${firstName} ${lastName} as an employee.`);
            });
        }
    });
};

function getEmployees() {
    return db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) as employee FROM employee')
    .then((results) => {
        const employeeChoices = results[0].map(result => ({ name: result.employee, value: result.id }));
        return employeeChoices;
    })
    .catch((err) => {
        console.error(err);
    });
}

function getRoles() {
    return db.promise().query('SELECT title FROM role')
        .then(results => {
            const roleChoices = results[0].map(result => result.title);
            return roleChoices;
        })
        .catch(err => {
            console.error(err);
        });
};

function getManagers() {
    return db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee WHERE manager_id IS NULL')
        .then(results => {
            const managerChoices = results[0].map(result => ({ name: result.manager, value: result.id }));
            return managerChoices;
        })
        .catch(err => {
            console.error(err);
        });
};

function getDepartments() {
    return db.promise().query('SELECT name FROM department')
        .then(results => {
            const departmentChoices = results[0].map(result => result.name);
            return departmentChoices;
        })
        .catch(err => {
            console.error(err);
        });
}

function updateEmployeeRole(employeeId, newRoleTitle) {
    const query = 'UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE id = ?';

    return db.promise().query(query, [newRoleTitle, employeeId])
        .then(() => {
            console.log("Successfully updated employee's role");
        })
        .catch(err => {
            console.error(err);
        });
};

function viewAllRoles() {
    const query = 'SELECT r.id, r.title AS role_title, d.name AS department_name, r.salary FROM role r JOIN department d ON r.department_id = d.id';
    return db.query(query, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
    });
}

function addRole(roleTitle, roleSalary, departmentName) {
    const departmentQuery = 'SELECT id FROM department WHERE name = ?';
    const departmentValues = [departmentName];
    db.promise().query(departmentQuery, departmentValues)
        .then(([departmentResults]) => {
            const departmentId = departmentResults[0].id;
            const roleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            const roleValues = [roleTitle, roleSalary, departmentId];
            return db.promise().query(roleQuery, roleValues)
        })
        .then(() => {
            console.log(`Successfully added ${roleTitle} to the roles.`);
        })
        .catch(err => {
            console.error(err);
        })
}

function viewAllDepartments() {
    const query = 'SELECT id, name FROM department';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
    });
}

function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    db.promise().query(query, departmentName)
        .then(() => console.log(`Successfully added ${departmentName} to departments.`))
        .catch(err => console.error(err));
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    getEmployees,
    getRoles,
    getManagers,
    getDepartments,
    updateEmployeeRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
}
