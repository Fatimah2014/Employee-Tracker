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
          'Update Employee Role'
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

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
const artistSearch = () => {
    inquirer
      .prompt({
        name: 'artist',
        type: 'input',
        message: 'What artist would you like to search for?',
      })
      .then((answer) => {
        const query = 'SELECT position, song, year FROM top5000 WHERE ?';
        connection.query(query, { artist: answer.artist }, (err, res) => {
          res.forEach(({ position, song, year }) => {
            console.log(
              `Department: ${id} || name: ${department}
            );
          });
          runSearch();
        });
      });
  };
  