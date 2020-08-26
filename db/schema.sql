DROP DATABASE IF EXISTS flixNut_db;
CREATE DATABASE flixNut_db;

USE flixNut_db;

CREATE TABLE movies(
    id INT NOT NULL AUTO_INCREMENT,
    --more information stored in the table--
    PRIMARY KEY(id)
)