-- Create Database
CREATE DATABASE databasename;

-- User DataBase
USE databasename;

-- Create branches
CREATE TABLE branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    GPS VARCHAR(50),
    status ENUM('active', 'inactive') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create machines
CREATE TABLE machines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    branch_id INT,
    start TIME,
    end TIME,
    status ENUM('available', 'unavailable') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Insert branches
INSERT INTO branches (name, location, GPS, status) VALUES
('branch 1', 'address 1', '12.345678, 98.765432', 'active'),
('branch 2', 'address 2', '23.456789, 87.654321', 'active'),
('branch 3', 'address 3', '34.567890, 76.543210', 'active');

-- Insert machines
INSERT INTO machines (name, branch_id, start, end, status) VALUES
('machine 1', 1, '00:00:00', '00:00:00', 'available'),
('machine 2', 1, '00:00:00', '00:00:00', 'available'),
('machine 3', 2, '00:00:00', '00:00:00', 'available'),
('machine 4', 2, '00:00:00', '00:00:00', 'available'),
('machine 5', 3, '00:00:00', '00:00:00', 'available'),
('machine 6', 3, '00:00:00', '00:00:00', 'available'),
('machine 7', 1, '00:00:00', '00:00:00', 'available'),
('machine 8', 1, '00:00:00', '00:00:00', 'available'),
('machine 9', 1, '00:00:00', '00:00:00', 'available'),
('machine 10', 2, '00:00:00', '00:00:00', 'available'),
('machine 11', 2, '00:00:00', '00:00:00', 'available'),
('machine 12', 2, '00:00:00', '00:00:00', 'available'),
('machine 13', 3, '00:00:00', '00:00:00', 'available'),
('machine 14', 3, '00:00:00', '00:00:00', 'available'),
('machine 15', 3, '00:00:00', '00:00:00', 'available');
