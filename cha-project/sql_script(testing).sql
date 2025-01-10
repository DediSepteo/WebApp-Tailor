	CREATE TABLE Organization (
    org_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(125) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    industry varchar(100) NOT NULL,
    type varchar(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    postal_code VARCHAR(32) NOT NULL,
	state VARCHAR(50) NOT NULL,
    phone VARCHAR(25) NOT NULL
);	

-- CREATE TABLE Employee (
--     emp_id INT PRIMARY KEY AUTO_INCREMENT,
--     org_id INT NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,	
--     name VARCHAR(255) NOT NULL,
--     address VARCHAR(255) NOT NULL,	
--     FOREIGN KEY (org_id) REFERENCES Organization(org_id)
-- );

CREATE TABLE `Orders` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT,
    subtotal DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT,
    org_id INT, 
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    name varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    PRIMARY KEY (product_id), 
    UNIQUE KEY org_name_unique (org_id, name),
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
    phone VARCHAR(25),
    PRIMARY KEY (order_id, name, product_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE TempAccount (
	account_id INT AUTO_INCREMENT,
	org_id INT,
	name VARCHAR(35) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    status varchar(15) NOT NULL,
    PRIMARY KEY (account_id, org_id),
    FOREIGN KEY (org_id) REFERENCES Organization(org_id)
);

-- Insert data into Organization (20 entries)
INSERT INTO Organization (name, email, industry, type, password, status, city, country, address_line1, address_line2, postal_code, state, phone) VALUES
('TechVision Solutions', 'contact@techvision.com', 'Technology', 'Corporate', 'securepassword123', 'active', 'Manila', 'Philippines', '123 Tech Park', NULL, '1000', 'Metro Manila', 639171234567),
('EcoHarvest Co.', 'info@ecoharvest.com', 'Agriculture', 'Corporate', 'greenworld456', 'active', 'Cebu City', 'Philippines', '45 Green Lane', NULL, '6000', 'Cebu', 639188765432),
('HealthFirst Inc.', 'support@healthfirst.com', 'Healthcare', 'Corporate', 'healthcare789', 'inactive', 'Quezon City', 'Philippines', '789 Wellness Ave', 'Suite 200', '1101', 'Metro Manila', 639198765123),
('BuildPro Enterprises', 'contact@buildpro.com', 'Construction', 'Corporate', 'builder101', 'active', 'Davao City', 'Philippines', '67 Progress Blvd', NULL, '8000', 'Davao del Sur', 639182345678),
('EduGrow Learning', 'hello@edugrow.com', 'Education', 'Corporate', 'learnnow555', 'active', 'Pasig', 'Philippines', '22 Knowledge St', NULL, '1600', 'Metro Manila', 639174567890),
('CyberSecurity Solutions', 'secure@cybersec.com', 'Technology', 'Corporate', 'cyber12345', 'inactive', 'Makati', 'Philippines', '456 Secure Dr', 'Unit 5', '1226', 'Metro Manila', 639175432187),
('QuickTransport Inc.', 'info@quicktransport.com', 'Logistics', 'Corporate', 'transit202', 'active', 'Taguig', 'Philippines', '88 Mobility Ln', NULL, '1630', 'Metro Manila', 639184321765),
('GreenEnergy Innovations', 'contact@greenenergy.com', 'Energy', 'Corporate', 'renewable001', 'inactive', 'Bacolod City', 'Philippines', '55 Solar Ave', NULL, '6100', 'Negros Occidental', 639181234876),
('UrbanStyle Design', 'design@urbanstyle.com', 'Fashion', 'Corporate', 'fashionista789', 'active', 'Baguio', 'Philippines', '99 Trendy Rd', NULL, '2600', 'Benguet', 639198765432),
('SmartFinance Corp.', 'finance@smartfinance.com', 'Finance', 'Corporate', 'financepro101', 'active', 'Cagayan de Oro', 'Philippines', '78 Money Blvd', 'Level 2', '9000', 'Misamis Oriental', 639193456789),
('RuralBanking PH', 'services@ruralbanking.com', 'Banking', 'Government', 'securebank456', 'inactive', 'Dumaguete City', 'Philippines', '12 Savings St', NULL, '6200', 'Negros Oriental', 639192345678),
('AgroGov Initiatives', 'connect@agrogov.com', 'Agriculture', 'Government', 'farming789', 'active', 'Iloilo City', 'Philippines', '34 Crop Rd', NULL, '5000', 'Iloilo', 639185432198),
('HealthCare Trust', 'admin@healthcaretrust.com', 'Healthcare', 'Government', 'trustme007', 'inactive', 'Tacloban City', 'Philippines', '67 Health Ave', NULL, '6500', 'Leyte', 639187654321),
('InfraGov Projects', 'infra@infragov.com', 'Infrastructure', 'Government', 'infra2021', 'active', 'Zamboanga City', 'Philippines', '45 Bridge Rd', NULL, '7000', 'Zamboanga del Sur', 639186543210),
('TechGov Innovations', 'innovate@techgov.com', 'Technology', 'Government', 'govtech999', 'active', 'Caloocan', 'Philippines', '89 Future Blvd', 'Suite 3', '1400', 'Metro Manila', 639184567321),
('CleanCity Sanitation', 'help@cleancity.com', 'Sanitation', 'Government', 'cleancity123', 'active', 'Las Piñas', 'Philippines', '101 Clean Rd', NULL, '1740', 'Metro Manila', 639194321098),
('CulturalHeritage Office', 'culture@heritage.gov.ph', 'Cultural', 'Government', 'heritage456', 'inactive', 'Vigan City', 'Philippines', '12 History Ln', NULL, '2700', 'Ilocos Sur', 639193214567),
('DisasterRelief PH', 'contact@relief.ph', 'Disaster Management', 'Government', 'helpme321', 'active', 'Ormoc City', 'Philippines', '76 Relief Dr', NULL, '6541', 'Leyte', 639184321098),
('MetroHousing Authority', 'housing@metrohousing.com', 'Housing', 'Government', 'housing789', 'active', 'Mandaluyong', 'Philippines', '34 Shelter Blvd', NULL, '1550', 'Metro Manila', 639183456789),
('WaterWorks PH', 'water@waterworks.ph', 'Utilities', 'Government', 'watersafe001', 'inactive', 'San Fernando', 'Philippines', '78 Aqua St', NULL, '2000', 'Pampanga', 639187654123);


-- Insert data into Employee (20 entries)
-- INSERT INTO Employee (org_id, email, password, name, address) VALUES
-- (1, 'employee1@techinnovators.ph', 'emp123', 'Juan dela Cruz', '1234 Tech Street, Manila'),
-- (1, 'employee2@techinnovators.ph', 'emp456', 'Maria Santos', '5678 Innovate Road, Manila'),
-- (2, 'employee1@ecosolutions.ph', 'emp789', 'Jose Rizal', '910 Greenfield, Quezon City'),
-- (3, 'employee1@healthfirst.ph', 'emp321', 'Ana de la Cruz', '321 Healthy Lane, Cebu City'),
-- (4, 'employee1@safetygroup.ph', 'emp654', 'Carlos Garcia', '101 Secure Blvd, Davao City'),
-- (5, 'employee1@greenenergy.ph', 'emp987', 'Miguel Tan', '202 Solar Road, Taguig'),
-- (6, 'employee1@techfutures.ph', 'emp111', 'Luis Reyes', '303 AI Avenue, Makati'),
-- (7, 'employee1@buildbetter.ph', 'emp222', 'Patricia Cruz', '404 Stone Street, Pasig'),
-- (8, 'employee1@farmfresh.ph', 'emp333', 'Lorna Abad', '505 Harvest Way, Cavite'),
-- (9, 'employee1@ecosmart.ph', 'emp444', 'Gabriel Villanueva', '606 Green Plaza, Caloocan'),
-- (10, 'employee1@cityhealth.ph', 'emp555', 'Isabel Romero', '707 Wellness Rd, Las Pinas'),
-- (11, 'employee1@visionarydesigns.ph', 'emp666', 'Francis Torres', '808 Blue Print Ave, Mandaluyong'),
-- (12, 'employee1@secureworld.ph', 'emp777', 'Alvin Aquino', '909 Shield Blvd, Quezon City'),
-- (13, 'employee1@cleancity.ph', 'emp888', 'Dolores Mateo', '1010 Hygiene St, Pasay'),
-- (14, 'employee1@techconnect.ph', 'emp999', 'Emilio Ramos', '1111 Network Ln, Muntinlupa'),
-- (15, 'employee1@powersolutions.ph', 'emp101', 'Jessica Lee', '1212 Power Dr, Marikina'),
-- (16, 'employee1@bluesky.ph', 'emp102', 'Oscar Dominguez', '1313 Cloud St, Bacolod'),
-- (17, 'employee1@civichealth.ph', 'emp103', 'Lorena Gomez', '1414 Care St, Zamboanga'),
-- (18, 'employee1@agrilife.ph', 'emp104', 'Carlos Bautista', '1515 Farm Rd, Iloilo'),
-- (19, 'employee1@protective.ph', 'emp105', 'Sofia Cruz', '1616 Shield St, Dagupan'),
-- (20, 'employee1@cleanwater.ph', 'emp106', 'Rafael Jimenez', '1717 Waterway Blvd, Manila');

-- Note: Passwords are hashed (using bcrypt in this example) and are placeholders.
-- The measurements column contains typical height, weight, and body measurements.


INSERT INTO `Orders` (org_id, subtotal, status, date) VALUES
(1, 1500.00, 'Awaiting Measurements', '2024-11-01'),
(2, 750.00, 'Completed', '2024-10-15'),
(3, 2000.00, 'Ready', '2024-11-10'),
(4, 1800.00, 'Cancelled', '2024-09-05'),
(5, 1050.00, 'Completed', '2024-08-20'),
(6, 1350.00, 'Ready', '2024-07-10'),
(7, 450.00, 'Cancelled', '2024-06-25'),
(8, 1680.00, 'Awaiting Measurements', '2024-10-02'),
(9, 1260.00, 'Completed', '2024-11-03'),
(10, 900.00, 'Ready', '2024-11-05'),
(11, 2250.00, 'Cancelled', '2024-05-15'),
(12, 600.00, 'Awaiting Measurements', '2024-08-01'),
(13, 2700.00, 'Completed', '2024-07-18'),
(14, 1200.00, 'Ready', '2024-04-04'),
(15, 1500.00, 'Cancelled', '2024-09-12'),
(16, 300.00, 'Awaiting Measurements', '2024-10-11'),
(17, 3000.00, 'Completed', '2024-10-23'),
(18, 2400.00, 'Ready', '2024-03-30'),
(19, 1650.00, 'Cancelled', '2024-06-15'),
(20, 1950.00, 'Awaiting Measurements', '2024-11-08');

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
INSERT INTO Measurements (order_id, name, address, measurement, product_id, qty, postal_code, city, phone) VALUES
(1, 'John Doe', '123 Main St, Manila', '{"Bust girth": "56.78 cm", "Under bust girth": "48.54 cm", "Upper chest girth": "62.39 cm", "Waist girth": "58.25 cm", "Upper hip girth": "66.72 cm", "Hip girth": "72.19 cm", "Upper arm girth": "34.67 cm"}', 1, 2, 1000, 'Manila', 639176543210),
(2, 'Jane Smith', '456 High Rd, Quezon City', '{"Bust girth": "60.12 cm", "Under bust girth": "50.33 cm", "Upper chest girth": "65.45 cm", "Waist girth": "59.87 cm", "Upper hip girth": "70.10 cm", "Hip girth": "75.56 cm", "Upper arm girth": "35.14 cm"}', 2, 3, 1101, 'Quezon City', 639185432109),
(3, 'Carlos Dela Cruz', '789 Ocean Dr, Cebu City', '{"Bust girth": "58.34 cm", "Under bust girth": "49.28 cm", "Upper chest girth": "63.78 cm", "Waist girth": "57.45 cm", "Upper hip girth": "68.20 cm", "Hip girth": "73.90 cm", "Upper arm girth": "34.21 cm"}', 3, 4, 6000, 'Cebu City', 639174321987),
(4, 'Anna Reyes', '101 Palm Ave, Makati', '{"Bust girth": "55.47 cm", "Under bust girth": "47.90 cm", "Upper chest girth": "61.22 cm", "Waist girth": "56.10 cm", "Upper hip girth": "65.80 cm", "Hip girth": "71.45 cm", "Upper arm girth": "33.87 cm"}', 4, 2, 1224, 'Makati', 639176543211),
(5, 'Liam Santos', '202 Ridge Rd, Davao City', '{"Bust girth": "59.23 cm", "Under bust girth": "51.12 cm", "Upper chest girth": "64.85 cm", "Waist girth": "60.34 cm", "Upper hip girth": "67.42 cm", "Hip girth": "74.63 cm", "Upper arm girth": "36.19 cm"}', 5, 1, 8000, 'Davao City', 639189876543),
(6, 'Emily Garcia', '789 Vogue Blvd, Cebu City', '{"Bust girth": "57.19 cm", "Under bust girth": "48.99 cm", "Upper chest girth": "62.45 cm", "Waist girth": "58.23 cm", "Upper hip girth": "66.32 cm", "Hip girth": "72.88 cm", "Upper arm girth": "35.02 cm"}', 6, 3, 6001, 'Cebu City', 639176547891),
(7, 'Noah Cruz', '555 Needle Rd, Pasig', '{"Bust girth": "58.45 cm", "Under bust girth": "49.56 cm", "Upper chest girth": "64.11 cm", "Waist girth": "59.75 cm", "Upper hip girth": "68.20 cm", "Hip girth": "74.12 cm", "Upper arm girth": "34.78 cm"}', 7, 2, 1600, 'Pasig', 639176548765),
(8, 'Sophia Lim', '202 Design St, Makati', '{"Bust girth": "54.89 cm", "Under bust girth": "46.75 cm", "Upper chest girth": "60.45 cm", "Waist girth": "55.30 cm", "Upper hip girth": "64.22 cm", "Hip girth": "70.89 cm", "Upper arm girth": "33.45 cm"}', 8, 3, 1225, 'Makati', 639187654321),
(9, 'Ethan Tan', '321 Sharp Rd, Manila', '{"Bust girth": "60.12 cm", "Under bust girth": "51.34 cm", "Upper chest girth": "66.15 cm", "Waist girth": "61.02 cm", "Upper hip girth": "69.70 cm", "Hip girth": "76.22 cm", "Upper arm girth": "36.80 cm"}', 9, 4, 1002, 'Manila', 639176543213),
(10, 'Olivia Ramos', '77 Tailor Blvd, Bacolod', '{"Bust girth": "55.78 cm", "Under bust girth": "48.22 cm", "Upper chest girth": "61.90 cm", "Waist girth": "57.45 cm", "Upper hip girth": "65.95 cm", "Hip girth": "72.11 cm", "Upper arm girth": "33.89 cm"}', 10, 2, 6100, 'Bacolod', 639176543567),
(11, 'Jacob Chua', '99 Fashion Lane, Iloilo', '{"Bust girth": "57.67 cm", "Under bust girth": "49.88 cm", "Upper chest girth": "63.70 cm", "Waist girth": "58.85 cm", "Upper hip girth": "66.90 cm", "Hip girth": "73.34 cm", "Upper arm girth": "34.54 cm"}', 11, 1, 5000, 'Iloilo', 639174321999),
(12, 'Isabella Reyes', '555 Needle Rd, Pasig', '{"Bust girth": "56.12 cm", "Under bust girth": "47.45 cm", "Upper chest girth": "62.30 cm", "Waist girth": "56.89 cm", "Upper hip girth": "65.70 cm", "Hip girth": "71.20 cm", "Upper arm girth": "33.90 cm"}', 12, 3, 1601, 'Pasig', 639189874563),
(13, 'Mia Mendoza', '101 Palm Ave, Makati', '{"Bust girth": "59.34 cm", "Under bust girth": "50.87 cm", "Upper chest girth": "65.22 cm", "Waist girth": "60.10 cm", "Upper hip girth": "67.11 cm", "Hip girth": "74.12 cm", "Upper arm girth": "36.45 cm"}', 13, 2, 1226, 'Makati', 639176543214),
(14, 'Daniel Sy', '202 Ridge Rd, Davao City', '{"Bust girth": "58.88 cm", "Under bust girth": "49.99 cm", "Upper chest girth": "64.75 cm", "Waist girth": "59.55 cm", "Upper hip girth": "67.50 cm", "Hip girth": "73.78 cm", "Upper arm girth": "35.67 cm"}', 14, 1, 8001, 'Davao City', 639187654332),
(15, 'Emma Perez', '789 Vogue Blvd, Cebu City', '{"Bust girth": "54.90 cm", "Under bust girth": "47.10 cm", "Upper chest girth": "61.10 cm", "Waist girth": "55.30 cm", "Upper hip girth": "64.12 cm", "Hip girth": "70.23 cm", "Upper arm girth": "33.10 cm"}', 15, 3, 6002, 'Cebu City', 639185432222),
(16, 'Lucas Fernandez', '123 Green Lane, Taguig', '{"Bust girth": "57.50 cm", "Under bust girth": "48.60 cm", "Upper chest girth": "63.40 cm", "Waist girth": "58.20 cm", "Upper hip girth": "67.00 cm", "Hip girth": "73.80 cm", "Upper arm girth": "34.80 cm"}', 16, 2, 1630, 'Taguig', 639176548123),
(17, 'Chloe Navarro', '456 Heritage Rd, Quezon City', '{"Bust girth": "56.30 cm", "Under bust girth": "47.20 cm", "Upper chest girth": "62.90 cm", "Waist girth": "56.70 cm", "Upper hip girth": "65.90 cm", "Hip girth": "72.10 cm", "Upper arm girth": "33.60 cm"}', 17, 3, 1102, 'Quezon City', 639185432123),
(18, 'Aiden Valdez', '789 Baywalk Blvd, Cebu City', '{"Bust girth": "58.10 cm", "Under bust girth": "49.70 cm", "Upper chest girth": "64.60 cm", "Waist girth": "59.40 cm", "Upper hip girth": "68.50 cm", "Hip girth": "74.30 cm", "Upper arm girth": "35.30 cm"}', 18, 1, 6003, 'Cebu City', 639174321654),
(19, 'Grace Sison', '101 Garden St, Baguio', '{"Bust girth": "55.70 cm", "Under bust girth": "47.50 cm", "Upper chest girth": "61.80 cm", "Waist girth": "56.20 cm", "Upper hip girth": "65.30 cm", "Hip girth": "71.50 cm", "Upper arm girth": "33.80 cm"}', 19, 4, 2600, 'Baguio', 639176543876),
(20, 'Ethan Cruz', '202 Summit Ave, Davao City', '{"Bust girth": "59.20 cm", "Under bust girth": "51.00 cm", "Upper chest girth": "66.00 cm", "Waist girth": "60.70 cm", "Upper hip girth": "69.00 cm", "Hip girth": "76.20 cm", "Upper arm girth": "36.50 cm"}', 20, 3, 8002, 'Davao City', 639189874567);




UPDATE organization
SET country = "PH"
WHERE country = 'Philippines';



