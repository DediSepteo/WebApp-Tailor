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
-- Country has to be two-letter ISO code
INSERT INTO Organization (name, email, industry, type, password, status, city, country, address_line1, address_line2, postal_code, state) VALUES
('Tech Innovators', 'info@techinnovators.com', 'Technology', 'Corporate', 'password123', 'active', 'Manila', 'PH', '1234 Tech Park Ave', 'Suite 500', '1000', 'Metro Manila'),
('EcoSolutions', 'contact@ecosolutions.ph', 'Environmental Services', 'Government', 'securepass456', 'inactive', 'Quezon City', 'PH', '789 Greenway Blvd', 'Floor 4', '1101', 'Metro Manila'),
('HealthFirst Clinics', 'support@healthfirst.com', 'Healthcare', 'Corporate', 'clinicpass789', 'active', 'Cebu City', 'PH', '56 Wellness St', NULL, '6000', 'Cebu'),
('Manila Motors', 'info@manilamotors.ph', 'Automotive', 'Corporate', 'drivefast321', 'active', 'Manila', 'PH', '321 Drive Lane', NULL, '1002', 'Metro Manila'),
('BuildStrong Construction', 'contact@buildstrong.ph', 'Construction', 'Government', 'construct2024', 'inactive', 'Davao City', 'PH', '789 Scaffold Rd', 'Warehouse B', '8000', 'Davao'),
('Fashion Forward', 'hello@fashionforward.ph', 'Retail', 'Corporate', 'fashionpass1', 'active', 'Makati', 'PH', '202 Style Ave', 'Unit 10F', '1224', 'Metro Manila'),
('Agricore Enterprises', 'info@agricore.com', 'Agriculture', 'Corporate', 'agripass456', 'active', 'Taguig', 'PH', '456 Harvest Blvd', NULL, '1630', 'Metro Manila'),
('CyberSecure Solutions', 'support@cybersecure.com', 'Cybersecurity', 'Government', 'protectdata789', 'active', 'Pasig', 'PH', '99 Shield St', '5th Floor', '1600', 'Metro Manila'),
('Global Finance Inc.', 'finance@globalfinance.com', 'Finance', 'Corporate', 'moneysecure', 'inactive', 'Pasay', 'PH', '88 Wealth Ave', NULL, '1300', 'Metro Manila'),
('EduGrowth Learning', 'contact@edugrowth.com', 'Education', 'Government', 'learnpass321', 'active', 'Caloocan', 'PH', '123 Knowledge Rd', 'Building A', '1400', 'Metro Manila'),
('Pure Produce Farms', 'info@pureproduce.ph', 'Agriculture', 'Corporate', 'farmfresh1', 'active', 'Cebu City', 'PH', '34 Orchard Rd', NULL, '6001', 'Cebu'),
('SkyHigh Airlines', 'support@skyhighairlines.com', 'Aviation', 'Corporate', 'flysafe2024', 'inactive', 'Muntinlupa', 'PH', '67 Runway St', 'Hangar 2', '1771', 'Metro Manila'),
('PowerPlus Energy', 'info@powerplus.ph', 'Energy', 'Government', 'poweron789', 'active', 'Marikina', 'PH', '789 Volt Ave', NULL, '1800', 'Metro Manila'),
('Green Growth', 'contact@greengrowth.ph', 'Environmental Services', 'Corporate', 'ecofriendly123', 'active', 'Iloilo', 'PH', '12 Sustain St', 'Suite 4', '5000', 'Western Visayas'),
('Metro Transport Corp', 'info@metrotransport.ph', 'Logistics', 'Government', 'transportpass', 'inactive', 'Bacolod', 'PH', '987 Cargo Rd', 'Warehouse 8', '6100', 'Negros Occidental'),
('MedicalCare Solutions', 'hello@medicalcare.ph', 'Healthcare', 'Corporate', 'medsecure456', 'active', 'Quezon City', 'PH', '101 Health Plaza', '3rd Floor', '1102', 'Metro Manila'),
('Insight Media', 'support@insightmedia.ph', 'Media', 'Corporate', 'mediasecure789', 'active', 'Cebu City', 'PH', '15 Broadcast Blvd', NULL, '6002', 'Cebu'),
('TechQuest Innovations', 'info@techquest.com', 'Technology', 'Corporate', 'questpass123', 'inactive', 'Pasig', 'PH', '456 Dev Ave', 'Lab 9', '1601', 'Metro Manila'),
('Unity Logistics', 'logistics@unitylogistics.com', 'Logistics', 'Government', 'logipass', 'active', 'Davao City', 'PH', '102 Cargo Lane', NULL, '8001', 'Davao'),
('Fresh Bakes', 'contact@freshbakes.com', 'Food & Beverage', 'Corporate', 'bakeit456', 'active', 'Las Piñas', 'PH', '654 Pastry Rd', 'Ground Floor', '1741', 'Metro Manila');


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

INSERT INTO Measurements (order_id, name, address, measurement, product_id, qty, postal_code, city) VALUES
(1, 'John Doe', '123 Example Street', 
    '{"Bust girth": "56.78 cm", "Under bust girth": "48.54 cm", "Upper chest girth": "62.39 cm", "Waist girth": "58.25 cm", "Upper hip girth": "66.72 cm", "Hip girth": "72.19 cm", "Upper arm girth": "34.67 cm"}', 
    1, 2, 1000, 'Manila'),

(2, 'Jane Smith', '456 Sample Avenue', 
    '{"Bust girth": "78.52 cm", "Under bust girth": "60.33 cm", "Upper chest girth": "82.74 cm", "Waist girth": "64.18 cm", "Upper hip girth": "70.27 cm", "Hip girth": "88.61 cm", "Upper arm girth": "36.49 cm"}', 
    2, 1, 2000, 'Cebu City'),

(3, 'Alice Tan', '789 Another Blvd', 
    '{"Bust girth": "66.84 cm", "Under bust girth": "54.13 cm", "Upper chest girth": "70.25 cm", "Waist girth": "62.59 cm", "Upper hip girth": "68.93 cm", "Hip girth": "80.42 cm", "Upper arm girth": "32.51 cm"}', 
    3, 1, 3000, 'Davao City'),

(4, 'Bob Lee', '101 Main St', 
    '{"Bust girth": "72.37 cm", "Under bust girth": "58.92 cm", "Upper chest girth": "76.41 cm", "Waist girth": "66.83 cm", "Upper hip girth": "74.26 cm", "Hip girth": "84.79 cm", "Upper arm girth": "34.54 cm"}', 
    4, 3, 4000, 'Quezon City'),

(5, 'Charlie Reyes', '202 Market Road', 
    '{"Bust girth": "84.19 cm", "Under bust girth": "68.35 cm", "Upper chest girth": "88.47 cm", "Waist girth": "72.61 cm", "Upper hip girth": "80.29 cm", "Hip girth": "90.72 cm", "Upper arm girth": "38.14 cm"}', 
    5, 2, 5000, 'Taguig City'),

(6, 'Diana Cruz', '303 Hilltop Street', 
    '{"Bust girth": "64.78 cm", "Under bust girth": "52.46 cm", "Upper chest girth": "68.23 cm", "Waist girth": "60.38 cm", "Upper hip girth": "72.49 cm", "Hip girth": "78.91 cm", "Upper arm girth": "30.67 cm"}', 
    6, 1, 6000, 'Makati City'),

(7, 'Ethan Lim', '404 Coastal Rd', 
    '{"Bust girth": "90.12 cm", "Under bust girth": "72.37 cm", "Upper chest girth": "94.89 cm", "Waist girth": "76.23 cm", "Upper hip girth": "86.15 cm", "Hip girth": "96.43 cm", "Upper arm girth": "40.21 cm"}', 
    7, 2, 7000, 'Pasay City'),

(8, 'Fiona Santos', '505 High Street', 
    '{"Bust girth": "60.83 cm", "Under bust girth": "46.72 cm", "Upper chest girth": "64.58 cm", "Waist girth": "56.48 cm", "Upper hip girth": "62.34 cm", "Hip girth": "70.29 cm", "Upper arm girth": "28.69 cm"}', 
    8, 1, 8000, 'Baguio City'),

(9, 'George Wong', '606 Riverside Drive', 
    '{"Bust girth": "68.95 cm", "Under bust girth": "56.18 cm", "Upper chest girth": "72.37 cm", "Waist girth": "64.59 cm", "Upper hip girth": "76.21 cm", "Hip girth": "82.41 cm", "Upper arm girth": "32.73 cm"}', 
    9, 3, 9000, 'Iloilo City'),

(10, 'Hannah Villa', '707 Lakeside Rd', 
    '{"Bust girth": "74.67 cm", "Under bust girth": "60.24 cm", "Upper chest girth": "78.49 cm", "Waist girth": "68.37 cm", "Upper hip girth": "80.16 cm", "Hip girth": "88.54 cm", "Upper arm girth": "36.12 cm"}', 
    10, 2, 1001, 'Cagayan de Oro'),

(11, 'Ian Gomez', '808 Pine Street', 
    '{"Bust girth": "88.32 cm", "Under bust girth": "70.15 cm", "Upper chest girth": "92.47 cm", "Waist girth": "74.89 cm", "Upper hip girth": "84.56 cm", "Hip girth": "94.37 cm", "Upper arm girth": "40.13 cm"}', 
    11, 1, 1002, 'General Santos City'),

(12, 'Jessica Cruz', '909 Forest Ave', 
    '{"Bust girth": "76.45 cm", "Under bust girth": "64.27 cm", "Upper chest girth": "80.91 cm", "Waist girth": "70.62 cm", "Upper hip girth": "78.52 cm", "Hip girth": "86.49 cm", "Upper arm girth": "36.25 cm"}', 
    12, 2, 1003, 'Batangas City'),

(13, 'Kevin Tan', '1010 Ocean Blvd', 
    '{"Bust girth": "62.72 cm", "Under bust girth": "50.34 cm", "Upper chest girth": "66.47 cm", "Waist girth": "60.16 cm", "Upper hip girth": "70.83 cm", "Hip girth": "76.53 cm", "Upper arm girth": "30.18 cm"}', 
    13, 3, 1004, 'Puerto Princesa'),

(14, 'Laura Lee', '1111 Sunset Road', 
    '{"Bust girth": "82.65 cm", "Under bust girth": "66.52 cm", "Upper chest girth": "86.73 cm", "Waist girth": "72.34 cm", "Upper hip girth": "78.45 cm", "Hip girth": "88.12 cm", "Upper arm girth": "38.76 cm"}', 
    14, 1, 1005, 'Naga City'),

(15, 'Mike Reyes', '1212 Gold Street', 
    '{"Bust girth": "70.48 cm", "Under bust girth": "60.25 cm", "Upper chest girth": "74.33 cm", "Waist girth": "66.57 cm", "Upper hip girth": "76.12 cm", "Hip girth": "82.23 cm", "Upper arm girth": "34.84 cm"}', 
    15, 2, 1006, 'Antipolo'),

(16, 'Nina Santos', '1313 Pearl Avenue', 
    '{"Bust girth": "68.39 cm", "Under bust girth": "54.82 cm", "Upper chest girth": "72.47 cm", "Waist girth": "64.58 cm", "Upper hip girth": "74.29 cm", "Hip girth": "80.57 cm", "Upper arm girth": "32.13 cm"}', 
    16, 1, 1007, 'Legazpi'),

(17, 'Oscar Lim', '1414 Silver Lane', 
    '{"Bust girth": "60.93 cm", "Under bust girth": "50.68 cm", "Upper chest girth": "64.27 cm", "Waist girth": "58.93 cm", "Upper hip girth": "68.51 cm", "Hip girth": "74.29 cm", "Upper arm girth": "30.42 cm"}', 
    17, 3, 1008, 'San Fernando'),

(18, 'Patricia Gomez', '1515 Olive Rd', 
    '{"Bust girth": "66.24 cm", "Under bust girth": "52.94 cm", "Upper chest girth": "70.78 cm", "Waist girth": "62.49 cm", "Upper hip girth": "72.54 cm", "Hip girth": "80.27 cm", "Upper arm girth": "32.69 cm"}', 
    18, 1, 1009, 'Tacloban'),

(19, 'Quincy Villa', '1616 Cedar Way', 
    '{"Bust girth": "84.37 cm", "Under bust girth": "68.47 cm", "Upper chest girth": "88.51 cm", "Waist girth": "74.38 cm", "Upper hip girth": "80.95 cm", "Hip girth": "90.49 cm", "Upper arm girth": "40.72 cm"}', 
    19, 2, 1010, 'Dumaguete City'),

(20, 'Rebecca Cruz', '1717 Elm St', 
    '{"Bust girth": "72.53 cm", "Under bust girth": "58.36 cm", "Upper chest girth": "76.34 cm", "Waist girth": "66.92 cm", "Upper hip girth": "76.49 cm", "Hip girth": "84.78 cm", "Upper arm girth": "36.24 cm"}', 
    20, 3, 1011, 'Ormoc City');



