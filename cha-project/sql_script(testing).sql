-- Create Organization Table
CREATE TABLE Organization (
    Org_ID INT PRIMARY KEY,
    Org_Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

-- Create Employee Table
CREATE TABLE Employee (
    Emp_ID INT PRIMARY KEY,
    Org_ID INT,
    Measurements TEXT,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Org_ID) REFERENCES Organization(Org_ID)
);

-- Create Order Table
CREATE TABLE `Order` (
    Order_ID INT PRIMARY KEY,
    Org_ID INT,
    Qty INT NOT NULL,
    Category VARCHAR(255) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    FOREIGN KEY (Org_ID) REFERENCES Organization(Org_ID)
);

-- Create Product Table
CREATE TABLE Product (
    Prod_ID INT PRIMARY KEY,
    Category VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Description TEXT
);

-- Create Order_List Table
CREATE TABLE Order_List (
    Prod_ID INT,
    Order_ID INT,
    PRIMARY KEY (Prod_ID, Order_ID),
    FOREIGN KEY (Prod_ID) REFERENCES Product(Prod_ID),
    FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID)
);

-- Insert data into Organization Table
INSERT INTO Organization (Org_ID, Org_Name, Email, Password) 
VALUES 
(1, 'TailorCorp', 'contact@tailorcorp.com', 'tailorpass123'),
(2, 'FashionHub', 'info@fashionhub.com', 'fashionhub456'),
(3, 'UniformPros', 'admin@uniformpros.com', 'uniform2023');

-- Insert data into Employee Table
INSERT INTO Employee (Emp_ID, Org_ID, Measurements, Email, Password, Name)
VALUES
(1, 1, 'Height: 175cm, Chest: 100cm, Waist: 85cm', 'john.doe@tailorcorp.com', 'john123', 'John Doe'),
(2, 1, 'Height: 165cm, Chest: 90cm, Waist: 70cm', 'jane.smith@tailorcorp.com', 'jane456', 'Jane Smith'),
(3, 2, 'Height: 180cm, Chest: 105cm, Waist: 90cm', 'peter.jones@fashionhub.com', 'peter789', 'Peter Jones'),
(4, 3, 'Height: 160cm, Chest: 85cm, Waist: 75cm', 'emma.wong@uniformpros.com', 'emma2023', 'Emma Wong');