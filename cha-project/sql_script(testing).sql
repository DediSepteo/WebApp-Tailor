-- Create Organization Table
Drop Table if exists Organization;
CREATE TABLE Organization (
    org_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    industry varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


Select * from Organization;

Drop Table If Exists Employee;
-- Create Employee Table
CREATE TABLE Employee (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT,
    measurements TEXT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

Drop Table If Exists Orders;
-- Create Order Table
CREATE TABLE `Orders` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT,
    qty INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    price varchar(255) NOT NULL,
    measurementNo varchar(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

-- Create Product Table
CREATE TABLE Uniforms (
    uni_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT, 
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    name varchar(255) NOT NULL,
    Foreign Key (org_ID) References Organization(org_ID)
);

-- Create Order_List Table
Drop Table If Exists Order_List;
CREATE TABLE Order_List (
    uni_id INT,
    order_id INT,
    PRIMARY KEY (uni_id, order_id),
    FOREIGN KEY (uni_id) REFERENCES Uniforms(uni_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id)
);

-- Insert data into Organization Table
INSERT INTO Organization (Org_Name, Email, Password) 
VALUES 
('TailorCorp', 'contact@tailorcorp.com', 'tailorpass123', ),
('FashionHub', 'info@fashionhub.com', 'fashionhub456'),
('UniformPros', 'admin@uniformpros.com', 'uniform2023');

-- Insert data into Employee Table
INSERT INTO Employee (Emp_ID, Org_ID, Measurements, Email, Password, Name)
VALUES
(1, 1, 'Height: 175cm, Chest: 100cm, Waist: 85cm', 'john.doe@tailorcorp.com', 'john123', 'John Doe'),
(2, 1, 'Height: 165cm, Chest: 90cm, Waist: 70cm', 'jane.smith@tailorcorp.com', 'jane456', 'Jane Smith'),
(3, 2, 'Height: 180cm, Chest: 105cm, Waist: 90cm', 'peter.jones@fashionhub.com', 'peter789', 'Peter Jones'),
(4, 3, 'Height: 160cm, Chest: 85cm, Waist: 75cm', 'emma.wong@uniformpros.com', 'emma2023', 'Emma Wong');