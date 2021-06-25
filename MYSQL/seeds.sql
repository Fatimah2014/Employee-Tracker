USE schema_db;

INSERT INTO department(name)
VALUES ("Human Resources"),
("Sales"),
("Marketing");

INSERT INTO roles(title, salary, department_id)
VALUES ("Sales person", 100000.00, 2),
("Hiring Manager", 1000000.00, 1),
("Marketing Specialist", 12.00, 3);

INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Jim", "Jimbo", 2, NULL),
("Jam", "Yam", 1, 1),
("Andy", "G", 3, 2);


--  SELECT first_name, last_name, title, salary, name AS dept_name, department_id
--   FROM employee
--   LEFT JOIN roles
--   ON role_id = roles.id
--   LEFT JOIN department
--   ON department_id = department.id