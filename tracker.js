const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Grant#$12582',
    database: 'schema_db',
  
});
connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });
  
  const runSearch = () => {
    inquirer
      .prompt({
        name: 'begin',
        type: 'question',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View all Employees by Manager',
          'View All Employees br Department',
          'Add Employee',
          'Remove Employee',
          'Update Employee Role',
          'exit'
        ],

    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          artistSearch();
          break;

        case 'View all Employees by Manager':
          byMangerSearch();
          break;

        case 'View All Employees by Department':
          byDepartmentSearch();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

          case 'Update Employee Role':
          updateRole();
          break;

        default:// fix this
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
// function allEmployees () {
//     const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary,  '
    



// e   
// const addEmployee = () => {
//   inquirer
//     .prompt({
//       name: 'begin',
//       type: 'question',
//       message: 'Who is the Employee Manager?',
//       choices: [
//         'Fatimah'
//         'Angelique'
//       ],//just a example

//   })
//   .then((answer) => {
//     switch (answer.action) {
//       case 'View All Employees':
//         artistSearch();
//         break;

//       case 'View all Employees by Manager':
//         byMangerSearch();
//         break;


//       default:// fix this
//         console.log(`Invalid action: ${answer.action}`);
//         break;
//     }
//   });
// };