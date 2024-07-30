DROP DATABASE IF EXISTS paw_planner_db;
CREATE DATABASE paw_planner_db;

USE paw_planner_db;

CREATE TABLE pets (
	pet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);

CREATE TABLE tasks (
	task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    pet_id INT NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
    INDEX idx_pet_id (pet_id)
    );

-- Dummy Data
INSERT INTO  pets (name)
VALUES
('Miles'),
('Meena');  
