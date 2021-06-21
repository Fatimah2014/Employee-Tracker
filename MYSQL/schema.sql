
DROP DATABASE IF EXISTS schema_db;
CREATE DATABASE schema_db;

USE schema_db;

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)

);
CREATE TABLE role (
   id INTEGER NOT NULL AUTO_INCREMENT,
   title VARCHAR(30) NULL, 
   salary INTEGER (8.50) NULL,
   deparment_id INTEGER(10),
   PRIMARY KEY(id)
    );
CREATE TABLE employee (

  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER(10) NULL,
  manager_id INTEGER(10) NULL,
  PRIMARY KEY(id)
  )
  