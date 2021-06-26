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
          updateEmpRole();
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
   
    var querysql= `SELECT * FROM department`
    connection.query(querysql,function(err,res){
      if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n"); 
    
    var departmentNames = []
    var depId = []

    // Note = this is the alternative method to lines 120-123
    //  res.map( r => depId.push(r.id) ) 
    //  res.map( r => departmentNames.push(r.name) ) 

      res.map((r)=>{
        depId.push(r.id)
        departmentNames.push(r.name)
      })
      console.log(departmentNames)
    inquirer
    .prompt([{
        name: 'title',
        type: 'input',
        message: 'Add a Role:',
    },{
        name: 'salary',
        type: 'input',
        message: 'Add Salary:',
    },{ 
        name: 'department_id',
        type: 'list',
        message: 'Add Department_id:',
        choices: departmentNames
      
    }]).then (function (answer) {
      var querySql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
      
      // '${answer.title}',${answer.salary}, ${answer.department_id}`
     
     console.log(querySql, 'query')
      connection.query(querySql,[answer.title, answer.salary, answer.department_id],function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");

        runSearch(); 
        });
      })
    })
    }





  function addEmployee() {

 var query1sql= `SELECT * FROM roles`
    connection.query(query1sql,function(err,res){
      if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n"); 
    
    var roleTitle= []
    var roleId = []

      res.map((r)=>{
        roleId.push(r.id)
        roleTitle.push(r.title)
      })
      console.log(roleTitle)





    var query2sql= `SELECT * FROM department`
    connection.query(query2sql,function(err,res){
      if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n"); 
    
    var deptNames = []
    var depId = []

      res.map((r)=>{
        depId.push(r.id)
        deptNames.push(r.name)
      })
      console.log(deptNames)

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
        type: 'list',
        message: 'Add Employee role_id:',
        choices: roleTitle
    },{
        name: 'department_id',
        type: 'list',
        message: 'Add Employee Department_id:',
        choices: deptNames
      }]).then (function (answer) {
        var querySql = `INSERT INTO employee (first_name, last_name, role_id, department_id)  VALUES (?, ?, ?, ?)`
       
       
        console.log(querySql, 'query')
        connection.query(querySql,[answer.first_name, answer.last_name, answer.role_id, answer.department_id], function (err, res) {

          if (err) throw err;
          console.log("\n");
          console.table(res);
          console.log("\n");
  
          runSearch(); 
        });
       })
      })
      })
    };
  
  //   }]).then (function (answer) {
  //     connection.query("INSERT INTO roles (first_name, last_name, role_id, department_id) VALUES(?) ", answer.first_name, answer.last_name, answer.role_id, answer.department_id, function (err, res) {
  //       if (err) throw err;
  //       console.log("\n");
  //       console.table(res);
  //       console.log("\n");
  //       runSearch(); 
  //     });
   
  //   })
  // };
//displays employee table 
function employeesSearch() {
  console.log("Employees from database")
  let queryString= `SELECT * FROM employee 
`
  // let queryString = 
  // SELECT first_name, last_name, title, salary, name AS dept_name, department_id
  // FROM employee
  // LEFT JOIN roles
  // ON role_id = roles.id
  // LEFT JOIN department
  // ON department_id = department.id`

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





const updateEmpRole = () => {

 
  connection.query(
    "SELECT *From employee ",
(err ,results) => {
  if (err) throw err;

  inquirer
  .prompt([
    {
    name:"Emp",
    type: "list",
    message: "Which employee would you like to update ",
    choices () {
      const empArray= [];
      results.array.forEach(id => {
        empArray.push(id);
        
      });
      return choiceArray;
     },
     
 },
{
  name:"newRole",
  type: "list",
  message: "Which employee role would you like to update",
  choices() {
    const choicesArray = [];
    results.forEach(({title}) => {
      choicesArray.push(title);
    });
    return choicesArray;
  },
    
   
},
])
.then((answer) => {
  console.log("chosen employee:", any.chosenEmp )
  console.log("New Role:", answer.newRole)
  connection.query(`UPDATE employee SET role_id= ? WHERE employee_id= ? ${answer.chosenEmp}`);
runSearch();
})} 
)}



