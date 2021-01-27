DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department ( 
id INT NOT NULL AUTO_INCREMENT,
department VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);


