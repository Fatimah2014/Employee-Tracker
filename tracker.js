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
          updateEmployee();
          break;

        case "Exit":
        connection.end();
        break;
      }
    });
};


// const addDepartment = () => {
//   inquirer
//   .prompt({
//     name: 'addDepartments',
//     type: 'input',
//     message: 'Add Department:',
//   })
//   .then((answer) => {
//     const query = "INSERT INTO department (name) ";
//     connection.query(query,{name: answer.name}, (err, res) => {
//       res.foreach(({name}) => {
//         if (err) throw err;
//       console.log("\n");
//       console.table(`Name: ${name}`);
//       console.log("\n");
//       runSearch();
//       })
//     })
//   })
// }


function addDepartment() {
inquirer
  .prompt({
    name: 'addDepartment',
    type: 'input',
    message: 'Add Department:',
  })
  .then (function (answer) {
    connection.query("INSERT INTO department (name) Values (?) ", answer.addDepartment, function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res`${answer.name}`);
      console.log("\n");
      runSearch(); 
    });
  
  }
  
  )};


  function addRole() {
    
    inquirer
    .prompt([{
        name: 'addRole',
        type: 'title',
        message: 'Add a Role:',
    },{
        name: 'addSalary',
        type: 'salary',
        message: 'Add Salary:',
    },{ 
        name: 'Department_id',
        type: 'department_id',
        message: 'Add Department_id:',
    

    }]).then (function (answer) {
      connection.query("INSERT INTO roles (title, salary, department_id) VALUES(?) ", answer.addRole, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res `${answer.title},${answer.salary},${answer.department_id}`);
        console.log("\n");
        runSearch(); 
      });
   
    })
  };




function addEmployee() {
  console.log("Add Employee")
  inquirer
  .prompt({
    name: 'addEmployee',
    type: 'input',
    message: 'Add Employee:',
  })
  .then (function (answer) {
    connection.query("INSERT INTO employee (first_nme, last_name, role_id, manager_id)  ", answer.addEmployee, function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("\n");
      runSearch(); 
    });
  
  }
  
  )};

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


function departmentSearch() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};




  
const updateEmployee = () => {
  inquirer
    .prompt({
      name: 'updateEmployee',
      type: 'list',
      message: 'Which item would you like to update?',
      choices: [
        'first_name',
        'last_name',
        'role_id',
        'department_id'
    
      ],

  })
  
  .then(function(userInput) {
    let choice = '';
    switch (answer.updateEmployee) {
      case 'first_name':
        updateFirstN();
        break;

      case 'last_name':
        updateLastN();
        break;

      case 'role_id':
        updateRole_id();
        break;

      case 'department_id':
        updateDepartment_id();
        break;

      default:// fix this
        console.log(`Invalid action: ${answer.userInput}`);
        break;
    }
  });
}


function updateFirstN() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};

function updateLastN() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};

function updateRole_id() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};

function updateDepartment_id() {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err)throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};
