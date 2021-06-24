DROP DATABASE IF EXISTS schema_db;
CREATE DATABASE schema_db;
USE schema_db;
CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary INTEGER (8.50) NULL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES roles(id)
);