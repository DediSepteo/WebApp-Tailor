CREATE TABLE Organization (
    org_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(125) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    industry varchar(100) NOT NULL,
    type varchar(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    postal_code VARCHAR(32) NOT NULL,
	state VARCHAR(50) NOT NULL
);	

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,	
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,	
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

CREATE TABLE `Orders` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT,
    qty INT NOT NULL,	
    subtotal DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT, 
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    name varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    Foreign Key (org_id) References Organization(org_id)
);	

CREATE TABLE Order_Products (
    product_id INT,
    order_id INT,
    qty INT,
    PRIMARY KEY (product_id, order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id)
);		

CREATE TABLE Measurements (
	order_id INT,
    name varchar(100), 
    address varchar(255),
    measurement JSON,
    product_id INT,
    qty INT,
    postal_code INT(32),
    city VARCHAR(50),
    PRIMARY KEY (order_id, name, product_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert data into Organization (20 entries)
INSERT INTO Organization (name, email, industry, type, password, address, status, city, country, address_line1, address_line2, postal_code, state) VALUES
('Tech Innovators Inc.', 'contact@techinnovators.ph', 'Technology', 'Corporate', 'password123', '1234 Tech Street', 'active', 'Manila', 'Philippines', '1234 Tech Street', 'Suite 101', '1000', 'NCR'),
('Eco Solutions Ltd.', 'info@ecosolutions.ph', 'Environment', 'Government', 'securepass', '567 Green Road', 'inactive', 'Quezon City', 'Philippines', '567 Green Road', 'Room 202', '1101', 'NCR'),
('Health First', 'hello@healthfirst.ph', 'Healthcare', 'Corporate', 'password456', '789 Health Ave', 'active', 'Cebu City', 'Philippines', '789 Health Ave', 'Building B', '6000', 'Central Visayas'),
('Safety Group PH', 'support@safetygroup.ph', 'Security', 'Corporate', 'safe2023', '101 Secure Blvd', 'inactive', 'Davao City', 'Philippines', '101 Secure Blvd', 'Floor 4', '8000', 'Davao Region'),
('Green Energy PH', 'contact@greenenergy.ph', 'Energy', 'Corporate', 'energy123', '202 Solar Road', 'active', 'Taguig', 'Philippines', '202 Solar Road', 'Building C', '1630', 'NCR'),
('Tech Futures', 'contact@techfutures.ph', 'Technology', 'Corporate', 'futures456', '303 AI Avenue', 'inactive', 'Makati', 'Philippines', '303 AI Avenue', '5th Floor', '1200', 'NCR'),
('Build Better Inc.', 'support@buildbetter.ph', 'Construction', 'Government', 'builder789', '404 Stone Street', 'active', 'Pasig', 'Philippines', '404 Stone Street', 'Suite 12', '1600', 'NCR'),
('Farm Fresh Foods', 'info@farmfresh.ph', 'Agriculture', 'Corporate', 'farmer123', '505 Harvest Way', 'inactive', 'Cavite', 'Philippines', '505 Harvest Way', 'Farm B', '4100', 'Calabarzon'),
('EcoSmart', 'hello@ecosmart.ph', 'Technology', 'Corporate', 'eco456', '606 Green Plaza', 'active', 'Caloocan', 'Philippines', '606 Green Plaza', 'Unit 202', '1400', 'NCR'),
('City Health PH', 'support@cityhealth.ph', 'Healthcare', 'Government', 'health2023', '707 Wellness Rd', 'active', 'Las Pinas', 'Philippines', '707 Wellness Rd', 'Clinic 1A', '1740', 'NCR'),
('Visionary Designs', 'info@visionarydesigns.ph', 'Architecture', 'Corporate', 'designs123', '808 Blue Print Ave', 'inactive', 'Mandaluyong', 'Philippines', '808 Blue Print Ave', '4th Floor', '1550', 'NCR'),
('SecureWorld', 'contact@secureworld.ph', 'Security', 'Corporate', 'secure123', '909 Shield Blvd', 'active', 'Quezon City', 'Philippines', '909 Shield Blvd', 'Main HQ', '1102', 'NCR'),
('Clean City PH', 'support@cleancity.ph', 'Sanitation', 'Government', 'clean1234', '1010 Hygiene St', 'inactive', 'Pasay', 'Philippines', '1010 Hygiene St', 'Block 3', '1300', 'NCR'),
('TechConnect', 'hello@techconnect.ph', 'IT Services', 'Corporate', 'connect123', '1111 Network Ln', 'active', 'Muntinlupa', 'Philippines', '1111 Network Ln', 'Suite 5', '1770', 'NCR'),
('Power Solutions', 'info@powersolutions.ph', 'Energy', 'Corporate', 'power456', '1212 Power Dr', 'inactive', 'Marikina', 'Philippines', '1212 Power Dr', 'Plant A', '1800', 'NCR'),
('Blue Sky', 'support@bluesky.ph', 'Airline', 'Corporate', 'sky789', '1313 Cloud St', 'active', 'Bacolod', 'Philippines', '1313 Cloud St', 'Unit 304', '6100', 'Western Visayas'),
('Civic Help PH', 'contact@civichealth.ph', 'Healthcare', 'Government', 'civic123', '1414 Care St', 'inactive', 'Zamboanga', 'Philippines', '1414 Care St', 'Clinic 1', '7000', 'Zamboanga Peninsula'),
('Agri Life', 'info@agrilife.ph', 'Agriculture', 'Corporate', 'agri456', '1515 Farm Rd', 'active', 'Iloilo', 'Philippines', '1515 Farm Rd', 'Field 8', '5000', 'Western Visayas'),
('Protective Services', 'hello@protective.ph', 'Security', 'Corporate', 'protect789', '1616 Shield St', 'inactive', 'Dagupan', 'Philippines', '1616 Shield St', 'Unit 8', '2400', 'Ilocos Region'),
('Clean Water Initiative', 'info@cleanwater.ph', 'Non-Profit', 'Government', 'water123', '1717 Waterway Blvd', 'active', 'Manila', 'Philippines', '1717 Waterway Blvd', 'Floor 2', '1005', 'NCR');

-- Insert data into Employee (20 entries)
INSERT INTO Employee (org_id, email, password, name, address) VALUES
(1, 'employee1@techinnovators.ph', 'emp123', 'Juan dela Cruz', '1234 Tech Street, Manila'),
(1, 'employee2@techinnovators.ph', 'emp456', 'Maria Santos', '5678 Innovate Road, Manila'),
(2, 'employee1@ecosolutions.ph', 'emp789', 'Jose Rizal', '910 Greenfield, Quezon City'),
(3, 'employee1@healthfirst.ph', 'emp321', 'Ana de la Cruz', '321 Healthy Lane, Cebu City'),
(4, 'employee1@safetygroup.ph', 'emp654', 'Carlos Garcia', '101 Secure Blvd, Davao City'),
(5, 'employee1@greenenergy.ph', 'emp987', 'Miguel Tan', '202 Solar Road, Taguig'),
(6, 'employee1@techfutures.ph', 'emp111', 'Luis Reyes', '303 AI Avenue, Makati'),
(7, 'employee1@buildbetter.ph', 'emp222', 'Patricia Cruz', '404 Stone Street, Pasig'),
(8, 'employee1@farmfresh.ph', 'emp333', 'Lorna Abad', '505 Harvest Way, Cavite'),
(9, 'employee1@ecosmart.ph', 'emp444', 'Gabriel Villanueva', '606 Green Plaza, Caloocan'),
(10, 'employee1@cityhealth.ph', 'emp555', 'Isabel Romero', '707 Wellness Rd, Las Pinas'),
(11, 'employee1@visionarydesigns.ph', 'emp666', 'Francis Torres', '808 Blue Print Ave, Mandaluyong'),
(12, 'employee1@secureworld.ph', 'emp777', 'Alvin Aquino', '909 Shield Blvd, Quezon City'),
(13, 'employee1@cleancity.ph', 'emp888', 'Dolores Mateo', '1010 Hygiene St, Pasay'),
(14, 'employee1@techconnect.ph', 'emp999', 'Emilio Ramos', '1111 Network Ln, Muntinlupa'),
(15, 'employee1@powersolutions.ph', 'emp101', 'Jessica Lee', '1212 Power Dr, Marikina'),
(16, 'employee1@bluesky.ph', 'emp102', 'Oscar Dominguez', '1313 Cloud St, Bacolod'),
(17, 'employee1@civichealth.ph', 'emp103', 'Lorena Gomez', '1414 Care St, Zamboanga'),
(18, 'employee1@agrilife.ph', 'emp104', 'Carlos Bautista', '1515 Farm Rd, Iloilo'),
(19, 'employee1@protective.ph', 'emp105', 'Sofia Cruz', '1616 Shield St, Dagupan'),
(20, 'employee1@cleanwater.ph', 'emp106', 'Rafael Jimenez', '1717 Waterway Blvd, Manila');

-- Note: Passwords are hashed (using bcrypt in this example) and are placeholders.
-- The measurements column contains typical height, weight, and body measurements.


INSERT INTO `Orders` (org_id, qty, subtotal, status, date) VALUES
(1, 10, 1500.00, 'Awaiting Measurements', '2024-11-01'),
(2, 5, 750.00, 'Completed', '2024-10-15'),
(3, 20, 2000.00, 'Ready', '2024-11-10'),
(4, 15, 1800.00, 'Cancelled', '2024-09-05'),
(5, 7, 1050.00, 'Completed', '2024-08-20'),
(6, 12, 1350.00, 'Ready', '2024-07-10'),
(7, 3, 450.00, 'Cancelled', '2024-06-25'),
(8, 14, 1680.00, 'Awaiting Measurements', '2024-10-02'),
(9, 9, 1260.00, 'Completed', '2024-11-03'),
(10, 6, 900.00, 'Ready', '2024-11-05'),
(11, 15, 2250.00, 'Cancelled', '2024-05-15'),
(12, 4, 600.00, 'Awaiting Measurements', '2024-08-01'),
(13, 18, 2700.00, 'Completed', '2024-07-18'),
(14, 8, 1200.00, 'Ready', '2024-04-04'),
(15, 10, 1500.00, 'Cancelled', '2024-09-12'),
(16, 2, 300.00, 'Awaiting Measurements', '2024-10-11'),
(17, 20, 3000.00, 'Completed', '2024-10-23'),
(18, 16, 2400.00, 'Ready', '2024-03-30'),
(19, 11, 1650.00, 'Cancelled', '2024-06-15'),
(20, 13, 1950.00, 'Awaiting Measurements', '2024-11-08');

-- Insert data into Products (20 entries)
INSERT INTO Products (org_id, price, description, name, status) VALUES
(1, 150.00, 'High-quality office chair', 'ErgoChair', 'active'),
(2, 300.00, 'Eco-friendly desk', 'GreenDesk', 'inactive'),
(3, 75.00, 'Ergonomic mouse', 'ComfortMouse', 'active'),
(4, 50.00, 'Anti-glare screen protector', 'ClearVision', 'inactive'),
(5, 120.00, 'Wireless keyboard', 'KeyFree', 'active'),
(6, 250.00, 'Laptop stand', 'LaptopElevate', 'inactive'),
(7, 40.00, 'Cable organizer', 'NeatCables', 'active'),
(8, 200.00, 'Standing desk mat', 'ComfortMat', 'inactive'),
(9, 175.00, 'Noise-cancelling headphones', 'SilenceMax', 'active'),
(10, 65.00, 'Smartphone holder', 'PhoneGrip', 'active'),
(11, 150.00, 'Lumbar support cushion', 'BackEase', 'inactive'),
(12, 85.00, 'Wireless charger', 'ChargeFast', 'active'),
(13, 130.00, 'Adjustable desk lamp', 'BrightLight', 'inactive'),
(14, 300.00, 'Air purifier', 'CleanAir', 'active'),
(15, 110.00, 'Desktop whiteboard', 'IdeaBoard', 'inactive'),
(16, 60.00, 'Portable projector', 'ProjectX', 'active'),
(17, 220.00, 'Smart coffee maker', 'BrewSmart', 'active'),
(18, 95.00, 'Document scanner', 'ScanEasy', 'inactive'),
(19, 150.00, 'Desk organizer', 'DeskMate', 'active'),
(20, 70.00, 'USB hub', 'HubCentral', 'inactive');

-- Insert data into Order_Products (20 entries)
INSERT INTO Order_Products (product_id, order_id, qty) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 1),
(4, 4, 5),
(5, 5, 7),
(6, 6, 4),
(7, 7, 6),
(8, 8, 8),
(9, 9, 10),
(10, 10, 9),
(11, 11, 1),
(12, 12, 2),
(13, 13, 5),
(14, 14, 3),
(15, 15, 4),
(16, 16, 2),
(17, 17, 6),
(18, 18, 7),
(19, 19, 8),
(20, 20, 3);

-- Insert data into Measurements (20 entries)
INSERT INTO Measurements (order_id, name, address, measurement, product_id, qty, postal_code, city) VALUES
(1, 'Juan dela Cruz', '1234 Tech Street, Manila', '{"height":170,"chest":38,"waist":32}', 1, 2, 1000, 'Manila'),
(2, 'Maria Santos', '5678 Innovate Road, Manila', '{"height":165,"chest":36,"waist":30}', 2, 3, 1101, 'Quezon City'),
(3, 'Jose Rizal', '910 Greenfield, Quezon City', '{"height":168,"chest":37,"waist":32}', 3, 1, 6000, 'Cebu City'),
(4, 'Ana de la Cruz', '321 Healthy Lane, Cebu City', '{"height":172,"chest":39,"waist":34}', 4, 5, 8000, 'Davao City'),
(5, 'Carlos Garcia', '101 Secure Blvd, Davao City', '{"height":175,"chest":40,"waist":36}', 5, 7, 1630, 'Taguig'),
(6, 'Miguel Tan', '202 Solar Road, Taguig', '{"height":167,"chest":35,"waist":31}', 6, 4, 1200, 'Makati'),
(7, 'Luis Reyes', '303 AI Avenue, Makati', '{"height":174,"chest":39,"waist":33}', 7, 6, 1600, 'Pasig'),
(8, 'Patricia Cruz', '404 Stone Street, Pasig', '{"height":169,"chest":37,"waist":32}', 8, 8, 4100, 'Cavite'),
(9, 'Lorna Abad', '505 Harvest Way, Cavite', '{"height":166,"chest":36,"waist":30}', 9, 10, 1400, 'Caloocan'),
(10, 'Gabriel Villanueva', '606 Green Plaza, Caloocan', '{"height":178,"chest":41,"waist":35}', 10, 9, 1740, 'Las Pinas'),
(11, 'Isabel Romero', '707 Wellness Rd, Las Pinas', '{"height":160,"chest":34,"waist":29}', 11, 1, 1550, 'Mandaluyong'),
(12, 'Francis Torres', '808 Blue Print Ave, Mandaluyong', '{"height":172,"chest":39,"waist":33}', 12, 2, 1102, 'Quezon City'),
(13, 'Alvin Aquino', '909 Shield Blvd, Quezon City', '{"height":165,"chest":35,"waist":31}', 13, 5, 1300, 'Pasay'),
(14, 'Dolores Mateo', '1010 Hygiene St, Pasay', '{"height":169,"chest":36,"waist":32}', 14, 3, 1770, 'Muntinlupa'),
(15, 'Emilio Ramos', '1111 Network Ln, Muntinlupa', '{"height":175,"chest":40,"waist":34}', 15, 4, 1800, 'Marikina'),
(16, 'Jessica Lee', '1212 Power Dr, Marikina', '{"height":164,"chest":35,"waist":30}', 16, 2, 6100, 'Bacolod'),
(17, 'Oscar Dominguez', '1313 Cloud St, Bacolod', '{"height":176,"chest":41,"waist":35}', 17, 6, 7000, 'Zamboanga'),
(18, 'Lorena Gomez', '1414 Care St, Zamboanga', '{"height":170,"chest":38,"waist":32}', 18, 7, 5000, 'Iloilo'),
(19, 'Carlos Bautista', '1515 Farm Rd, Iloilo', '{"height":171,"chest":39,"waist":33}', 19, 8, 2400, 'Dagupan'),
(20, 'Sofia Cruz', '1616 Shield St, Dagupan', '{"height":162,"chest":35,"waist":30}', 20, 3, 1005, 'Manila');


