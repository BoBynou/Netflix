CREATE DATABASE netflix;
USE netflix;


CREATE TABLE acteurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  date_de_naissance DATE NOT NULL
);

CREATE TABLE realisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  date_de_naissance DATE NOT NULL
);

CREATE TABLE films (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(128) NOT NULL,
  description TEXT,
  date_de_parution DATE
);