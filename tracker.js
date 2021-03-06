const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Grant#$12582',
  database: 'schema_db',

});

figlet('EMPLOYEE TRACKER!', function (err, data) {
  if (err) {
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
    .then(function (answer) {
      connection.query("INSERT INTO department (name) VALUES (?) ", answer.addDepartment, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        runSearch();
      });

    }

    )
};





function addRole() {

  var querysql = `SELECT * FROM department`
  connection.query(querysql, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");

    var departmentNames = []
    var depId = []

    // Note = this is the alternative method to lines 120-123
    //  res.map( r => depId.push(r.id) ) 
    //  res.map( r => departmentNames.push(r.name) ) 

    res.map((r) => {
      depId.push(r.id)
      departmentNames.push(r.name)
    })
    console.log(departmentNames)
    inquirer
      .prompt([{
        name: 'title',
        type: 'input',
        message: 'Add a Role:',
      }, {
        name: 'salary',
        type: 'input',
        message: 'Add Salary:',
      }, {
        name: 'department_id',
        type: 'list',
        message: 'Add Department_id:',
        choices: departmentNames

      }]).then(function (answer) {
        var deptQuery = `SELECT * FROM department WHERE name = '${answer.department_id}';`
        connection.query(deptQuery, function (err, res) {
          if (err) {
            console.log(err, "dept..id =====")
          } else {
            console.log(res[0].id, "===============")
            var querySql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`

            // '${answer.title}',${answer.salary}, ${answer.department_id}`

            console.log(querySql, 'query')
            connection.query(querySql, [answer.title, answer.salary, res[0].id], function (err, res) {
              if (err) throw err;
              console.log("\n");
              console.table(res);
              console.log("\n");

              runSearch();
            });
          }

        })

      })
  })

}

function addEmployee() {

  var query1sql = `SELECT * FROM roles`
  connection.query(query1sql, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");

    var roleTitle = []
    var roleId = []

    res.map((r) => {
      roleId.push(r.id)
      roleTitle.push(r.title)
    })
    console.log(roleTitle)

    var query2sql = `SELECT * FROM department`
    connection.query(query2sql, function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("\n");

      var deptNames = []
      var depId = []

      res.map((r) => {
        depId.push(r.id)
        deptNames.push(r.name)
      })
      console.log(deptNames)

      inquirer
        .prompt([{
          name: 'first_name',
          type: 'input',
          message: 'Add Employee First Name:',
        }, {
          name: 'last_name',
          type: 'input',
          message: 'Add Employee Last Name',
        }, {
          name: 'role_id',
          type: 'list',
          message: 'Add Employee role_id:',
          choices: roleTitle
        }, {
          name: 'department_id',
          type: 'list',
          message: 'Add Employee Department_id:',
          choices: deptNames
        }]).then(function (answer) {
          let roleId; 
          let deptId;
          var role2Query = `SELECT * FROM roles WHERE title = '${answer.role_id}';`
              
          connection.query(role2Query, function (err, results) {
            if (err) {
              console.log(err, "role..id =====")
            } else {
              console.log(results[0].id, "===============")
             roleId= results[0].id 

          var dept2Query = `SELECT * FROM department WHERE name = '${answer.department_id}';`
          connection.query(dept2Query, function (err, res) {
            if (err) {
              console.log(err, "dept..id =====")
            } else {
              console.log(res[0].id, "===============")
              deptId= res[0].id
      

          var querySql = `INSERT INTO employee (first_name, last_name, role_id, department_id)  VALUES (?, ?, ?, ?)`

   
          console.log(querySql, 'query')
          connection.query(querySql, [answer.first_name, answer.last_name, roleId, deptId], function (err, res) {

            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("\n");

            runSearch();
          });
          }})}})
        })
    })
  })
};


function employeesSearch() {
  console.log("Employees from database")
   let queryString = `SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS dept_name
  FROM employee
  LEFT JOIN roles
  ON employee.role_id = roles.id
  LEFT JOIN department
  ON employee.department_id = department.id`

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
  let depQuery= `SELECT roles.title, roles.salary, department.name AS dept_name
  FROM roles
  LEFT JOIN department
  ON roles.department_id = department.id`
  // connection.query("SELECT roles.id, roles.tile, roles.salary LEFT JOIN department ON employee.department_id = department.id, ", (err, res) => {
    connection.query(depQuery, function (err, res) {
  
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};

//display department table
function departmentSearch() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    runSearch();
  });
};



const updateEmpRole = () => {
 connection.query(
    "SELECT *FROM employee ",(err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("\n");
      const employeeArray = res.map(employee => {
        return `${employee.id}, ${employee.first_name}, ${employee.last_name}`
      })
      console.log(employeeArray)

      inquirer
        .prompt([
          {
            name: "Emp",
            type: "list",
            message: "Which employee would you like to update ",
            choices: employeeArray
          },
        ])
        .then((answer) => {
          console.log("chosen employee:", Number(answer.Emp.slice(0, 1)))
          const empId = Number(answer.Emp.slice(0, 1))

          connection.query("SELECT * FROM roles",
            (err, results) => {
              const empRole = results.map(role => {
                return `${role.id} ${role.title}`
              })

              inquirer.prompt([{
                name: "newRole",
                type: "list",
                message: "What is the new Role?",
                choices: empRole

              }]).then((answer) => {
                console.log(answer.newRole)
                const newRoleId = Number(answer.newRole.slice(0, 1))
                const upQuery = `UPDATE employee SET role_id = ${newRoleId} WHERE id = ${empId};`
                connection.query(upQuery, (err) => {
                  if (err) throw err

                  runSearch();
                })
              })
            })


        })
    }
  )
}



