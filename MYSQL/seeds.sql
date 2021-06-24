USE schema_db;

INSERT INTO department(name)
VALUES ("Human Resources"),
("Sales"),
("Marketing");

INSERT INTO roles(title, salary, department_id)
VALUES ("Sales person", 100000.00, 2),
("Hiring Manager", 1000000.00, 1),
("Marketing Specialist", 12.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Jimbo", 2, NULL),
("Jam", "Yam", 1, 1),
("Andy", "G", 3, 2);

INSERT INTO department (name) VALUES ('');

INSERT INTO roles (name) VALUES ('');
INSERT INTO employee (name) VALUES ('')