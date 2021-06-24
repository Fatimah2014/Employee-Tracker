const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet= require("figlet");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Grant#$12582',
    database: 'schema_db',
  
});

figlet('EMPLOYEE TRACKER!', function(err,data) {
  if(err) {
    console.log('OH NO!');
    console.dir(err);
    return;
  }
  console.log(data)
});



connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

// added some style to the Name Employee tracker in the command line
// questions are prompted in the command line 
  const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add Departments',
          'Add Roles',
          'Add Employee',
          'View All Employees',
          'View All Roles',
          'View All Departments',
          'Update Employee Role',
          'Delete Department',
          'exit'
        ],

    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add Departments':
          addDepartment();
          break;
        case 'Add Roles':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'View All Employees':
          employeesSearch();
          break;
        case 'View All Roles':
          roleSearch();
          break;
        case 'View All Departments':
          departmentSearch();
          break;
       case 'Update Employee Role':
          updateEmpRole();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case "Exit":
        connection.end();
        return;
      }
    });
};

const addDepartment = () => {
  inquirer
.prompt({
    name: 'addDepartment',
    type: 'input',
    message: 'Add Department:',
  })
  .then (function (answer) {
    connection.query("INSERT INTO department (name) VALUES (?) ", answer.addDepartment, function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("\n");
      runSearch(); 
    });
  
  }
  
  )};





  function addRole() {
    inquirer
    .prompt([{
        name: 'title',
        type: 'input',
        message: 'Add a Role:',
    },{
        name: 'addSalary',
        type: 'input',
        message: 'Add Salary:',
    },{ 
        name: 'Department_id',
        type: 'input',
        message: 'Add Department_id:',
    }]).then (function (answer) {
      connection.query("INSERT INTO roles (title, salary, department_id) VALUES ?", `${answer.title}, ${answer.salary}, ${answer.department_id}`, function (err, res) {
      
      });
      
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        runSearch(); 
      
   
    })
  };


//   function addRole() {
//     inquirer
//     .prompt([{
//         name: 'title',
//         type: 'input',
//         message: 'Add a Role:',
//     },{
//         name: 'addSalary',
//         type: 'input',
//         message: 'Add Salary:',
//     },{ 
//         name: 'Department_id',
//         type: 'input',
//         message: 'Add Department_id:',
//     }]).then (function (answer) {
//       let query = "INSERT INTO roles (title, salary, department_id) VALUES ?"
//       connection.query(query,[answer.title, answer.salary, answer.department_id], (err, res) => {
//         console.log(`${res.length} role is updated!`); 
//       res.foreach(({title,salary, department_id}, i) => {
//         const ans= i+1;
//         console.log(
//           `${ans} Role: ${title} Salary: ${salary} DepId: ${department_id}`
//         );


//       });

//       runSearch();
//     });
//   });
// };


  function addEmployee() {
    
    inquirer
    .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'Add Employee First Name:',
    },{
        name: 'last_name',
        type: 'input',
        message: 'Add Employee Last Name',
    },{ 
        name: 'role_id',
        type: 'input',
        message: 'Add Employee role_id:',
    },{
        name: 'department_id',
        type: 'input',
        message: 'Add Employee Department_id:',

    }]).then (function (answer) {
      connection.query("INSERT INTO roles (first_name, last_name, role_id, department_id) VALUES(?) ", answer.first_name, answer.last_name, answer.role_id, answer.department_id, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        runSearch(); 
      });
   
    })
  };





//displays employee table 
function employeesSearch() {
  console.log("Employees from database")

  let queryString = `
  SELECT first_name, last_name, title, salary, name AS dept_name, manager_id
  FROM employee
  LEFT JOIN roles
  ON role_id = roles.id
  LEFT JOIN department
  ON department_id = department.id`


  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch(); 
  });

};

//displays role table
function roleSearch() {
  console.log("it works")
  connection.query("SELECT * FROM roles", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};

//display department table
function departmentSearch() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};



  
// const updateEmpRole = () => {
//   inquirer
//     .prompt({
//       name: 'updateEmployee',
//       type: 'list',
//       Message: 'Choose the employee you would like to update:',
//       choices: employee,
//     }).then(function(answer) {
//       let value= answer.employee.split("");
//       inquirer.prompt({
//         name: "employee",
//         message: 'Which item would you like to update?',
//         choices: [
//           'first_name',
//           'last_name',
//           'role_id',
//           'department_id']

//       }).then(function (answer){
//         inquirer
//         .prompt({
//           name:'employee',
//           type:"input",
//           message: `Enter new${answer.employee}`
//         })
//       })
//     })

//   .then(function(updatedInput) {
//     let choice = '';
//     switch (answer.employee) {
//       case 'first_name':
//         choice="first_name"
//         break;

//       case 'last_name':
//         choice= "last_name"
//         break;

//       case 'role_id':
//         option = "Role_id"
//         break;

//       case 'department_id':
//         option= "department_id"
//         break;

//       default:// fix this
//         console.log(`Invalid action: ${answer.updatedInput}`);
//         break;
//     }
//   });
// }

// function deleteDepartment() {
//   inquirer.prompt([{
//     name:"departments",
//     type: "list",
//     message: "Choose a Department you would like to delete:",
//     choice: [name
//   }]).then(function (res) {
//     var sql = "DELETE FROM department WHERE name = ?";
//     connection.query(sql,[res.departmentSearch], function (err, res){
//       if (err) throw err;
//       console.log(res);
//       runSearch();
//     });
//   });
// }
// // function updateFirstN() {
//   connection.query("SELECT * FROM department", (err, res) => {
//     if(err)throw err;
//     console.log("\n");
//     console.table(res);
//     console.log("\n");
//     runSearch();
//   });
// };

// function updateLastN() {
//   connection.query("SELECT * FROM department", (err, res) => {
//     if(err)throw err;
//     console.log("\n");
//     console.table(res);
//     console.log("\n");
//     runSearch();
//   });
// };

// function updateRole_id() {
//   connection.query("SELECT * FROM department", (err, res) => {
//     if(err)throw err;
//     console.log("\n");
//     console.table(res);
//     console.log("\n");
//     runSearch();
//   });
// };

// function updateDepartment_id() {
//   connection.query("SELECT * FROM department", (err, res) => {
//     if(err)throw err;
//     console.log("\n");
//     console.table(res);
//     console.log("\n");
//     runSearch();
//   });
// };
