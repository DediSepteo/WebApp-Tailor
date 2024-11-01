CREATE TABLE Organization (
    org_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    industry varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL
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

CREATE TABLE Order_List (
    product_id INT,
    order_id INT,
    PRIMARY KEY (product_id, order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id)
);		

CREATE TABLE Measurements (
	order_id INT,
    emp_id INT,
    measurement JSON,
    PRIMARY KEY (order_id, emp_id),
    FOREIGN KEY (order_id) REFERENCES `Orders`(order_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

INSERT INTO Organization (name, email, industry, type, password, address, status)
VALUES
    ("Tech Innovations", "info@techinnovations.com", "Technology", "Corporate", "$2y$10$hashedPassword1", "101 Tech Way, Silicon Valley, CA 94043", "active"),
    ("Gourmet Bites", "contact@gourmetbites.com", "Food Services", "Corporate", "$2y$10$hashedPassword2", "202 Culinary Rd, New York, NY 10001", "active"),
    ("HealthCare Solutions", "support@healthcaresolutions.com", "Healthcare", "Government", "$2y$10$hashedPassword3", "303 Wellness Blvd, Chicago, IL 60601", "active"),
    ("Eco-Friendly Products", "info@ecofriendlyproducts.com", "Sustainable Goods", "Corporate", "$2y$10$hashedPassword4", "404 Green St, Portland, OR 97201", "active"),
    ("Smart Home Technologies", "contact@smarthometech.com", "Consumer Electronics", "Corporate", "$2y$10$hashedPassword5", "505 Future Ln, San Francisco, CA 94101", "active"),
    ("Fashion Fusion", "hello@fashionfusion.com", "Fashion Retail", "Corporate", "$2y$10$hashedPassword6", "606 Trendy St, Miami, FL 33101", "inactive"), -- Only inactive
    ("Education Hub", "support@educationhub.com", "E-Learning", "Government", "$2y$10$hashedPassword7", "707 Knowledge Blvd, Boston, MA 02101", "active"),
    ("Green Energy Solutions", "contact@greenenergy.com", "Renewable Energy", "Corporate", "$2y$10$hashedPassword8", "808 Eco Ave, Denver, CO 80201", "active"),
    ("Travel Adventures", "info@traveladventures.com", "Travel & Tourism", "Corporate", "$2y$10$hashedPassword9", "909 Wanderlust Rd, Las Vegas, NV 89101", "active"),
    ("Digital Marketing Pros", "support@digitalmarketing.com", "Marketing", "Corporate", "$2y$10$hashedPassword10", "123 Media St, Los Angeles, CA 90001", "active"),
    ("Real Estate Ventures", "contact@realestateventures.com", "Real Estate", "Corporate", "$2y$10$hashedPassword11", "234 Property Ave, Seattle, WA 98101", "active"),
    ("Fitness Fanatics", "info@fitnessfanatics.com", "Health & Fitness", "Corporate", "$2y$10$hashedPassword12", "345 Workout Way, Austin, TX 73301", "active"),
    ("Creative Design Agency", "hello@creativedesign.com", "Graphic Design", "Corporate", "$2y$10$hashedPassword13", "456 Art Ln, Atlanta, GA 30301", "active"),
    ("Finance Solutions", "support@financesolutions.com", "Financial Services", "Government", "$2y$10$hashedPassword14", "567 Money Blvd, Philadelphia, PA 19101", "active"),
    ("Construction Experts", "info@constructionexperts.com", "Construction", "Corporate", "$2y$10$hashedPassword15", "678 Build Ave, Charlotte, NC 28201", "active"),
    ("Pet Supplies Co.", "support@petsupplies.com", "Pet Products", "Corporate", "$2y$10$hashedPassword16", "789 Pet St, Orlando, FL 32801", "active"),
    ("Beauty & Wellness", "contact@beautywellness.com", "Beauty Products", "Corporate", "$2y$10$hashedPassword17", "890 Glam Ave, New York, NY 10001", "active"),
    ("Non-Profit Organization", "info@nonprofitorg.com", "Non-Profit", "Government", "$2y$10$hashedPassword18", "901 Charity St, Washington, DC 20001", "active"),
    ("Local Grocery Store", "support@localgrocery.com", "Retail", "Corporate", "$2y$10$hashedPassword19", "102 Fresh Rd, Houston, TX 77001", "active"),
    ("Event Management Co.", "hello@eventmanagement.com", "Event Planning", "Corporate", "$2y$10$hashedPassword20", "203 Celebration Blvd, Nashville, TN 37201", "active");


-- Note: Passwords are hashed (using bcrypt in this example) and are placeholders.


-- Note: The hashed passwords above are just examples. 
-- Use a hashing library like bcrypt in your application to generate real hashes.

-- Insert dummy data into the Employee table

INSERT INTO Employee (org_id, email, password, name, address) VALUES
(1, 'john.doe@example.com', 'password123', 'John Doe', '123 Elm St, CityA'),
(2, 'jane.smith@example.com', 'password123', 'Jane Smith', '456 Oak St, CityB'),
(3, 'alice.johnson@example.com', 'password123', 'Alice Johnson', '789 Pine St, CityC'),
(4, 'bob.brown@example.com', 'password123', 'Bob Brown', '321 Maple St, CityD'),
(5, 'charlie.jones@example.com', 'password123', 'Charlie Jones', '654 Cedar St, CityE'),
(6, 'david.white@example.com', 'password123', 'David White', '987 Birch St, CityF'),
(7, 'emma.green@example.com', 'password123', 'Emma Green', '135 Willow St, CityG'),
(8, 'frank.lee@example.com', 'password123', 'Frank Lee', '246 Spruce St, CityH'),
(9, 'grace.harris@example.com', 'password123', 'Grace Harris', '369 Fir St, CityI'),
(10, 'henry.miller@example.com', 'password123', 'Henry Miller', '147 Elm St, CityJ'),
(11, 'isabella.garcia@example.com', 'password123', 'Isabella Garcia', '258 Oak St, CityK'),
(12, 'jack.wilson@example.com', 'password123', 'Jack Wilson', '369 Pine St, CityL'),
(13, 'karen.martinez@example.com', 'password123', 'Karen Martinez', '789 Maple St, CityM'),
(14, 'liam.davis@example.com', 'password123', 'Liam Davis', '951 Cedar St, CityN'),
(15, 'mason.rodriguez@example.com', 'password123', 'Mason Rodriguez', '357 Birch St, CityO'),
(16, 'nora.perez@example.com', 'password123', 'Nora Perez', '159 Willow St, CityP'),
(17, 'olivia.brown@example.com', 'password123', 'Olivia Brown', '753 Spruce St, CityQ'),
(18, 'peter.jones@example.com', 'password123', 'Peter Jones', '159 Fir St, CityR'),
(19, 'quinn.smith@example.com', 'password123', 'Quinn Smith', '753 Elm St, CityS'),
(20, 'ryan.clark@example.com', 'password123', 'Ryan Clark', '951 Oak St, CityT');


-- Note: Passwords are hashed (using bcrypt in this example) and are placeholders.
-- The measurements column contains typical height, weight, and body measurements.


INSERT INTO Products (product_id, org_id, price, description, name, status) 
VALUES 
(1, 12, 499.99, 'This elegant tuxedo is crafted from luxurious wool, featuring a satin peak lapel and a fitted silhouette that flatters every body type. Ideal for formal events and black-tie occasions.', 'Classic Wool Tuxedo', 'active'), 
(2, 9, 299.99, 'Made from premium linen, this lightweight suit offers breathability and comfort for summer weddings. The natural fibers give a relaxed yet refined look.', 'Lightweight Linen Suit', 'active'), 
(3, 2, 399.99, 'This striking navy blazer is tailored to perfection, with a modern cut and intricate stitching. Perfect for professional settings or upscale events.', 'Tailored Navy Blazer', 'active'), 
(4, 8, 350.00, 'This sophisticated three-piece suit features a subtle check pattern, ideal for making a lasting impression at business meetings and social gatherings.', 'Checked Three-Piece Suit', 'active'), 
(5, 5, 450.00, 'An eye-catching velvet suit that adds a touch of opulence to your wardrobe. Perfect for parties and special events, it features a slim fit and deep color.', 'Luxury Velvet Suit', 'discontinued'), 
(6, 6, 329.99, 'This modern-fit suit is made from breathable polyester fabric, ensuring a comfortable wear throughout the day. Perfect for both work and play.', 'Modern Fit Polyester Suit', 'active'), 
(7, 14, 599.99, 'This high-end silk suit shines with elegance, featuring fine tailoring and a luxurious feel. Ideal for weddings and gala events, it makes you stand out in any crowd.', 'Premium Silk Suit', 'active'), 
(8, 17, 279.99, 'With a contemporary cut and soft fabric, this casual suit is perfect for less formal occasions while maintaining an air of sophistication.', 'Casual Smart Suit', 'active'), 
(9, 11, 399.00, 'A versatile charcoal suit that can transition from the office to a night out with ease. Features a classic notch lapel and two-button closure.', 'Charcoal Classic Suit', 'active'), 
(10, 3, 550.00, 'This statement-making burgundy suit is ideal for those looking to stand out. Made from rich fabric with a unique pattern, it’s perfect for weddings and events.', 'Burgundy Statement Suit', 'active'), 
(11, 14, 379.99, 'A timeless black suit with a modern twist, featuring a slightly tapered leg and crisp lines. Perfect for any formal occasion.', 'Modern Black Suit', 'active'), 
(12, 16, 320.00, 'This elegant cream suit is perfect for summer events, offering a light and airy feel while maintaining style and sophistication.', 'Summer Cream Suit', 'active'), 
(13, 12, 450.00, 'This refined houndstooth suit is made from premium materials, ensuring comfort and durability while making a stylish statement.', 'Houndstooth Suit', 'active'), 
(14, 5, 475.00, 'Crafted with attention to detail, this striking patterned suit adds personality to your wardrobe. Perfect for fashion-forward individuals.', 'Patterned Designer Suit', 'active'), 
(15, 19, 299.99, 'A sleek and simple suit made from stretch fabric that allows for ease of movement, making it perfect for active professionals.', 'Stretch Fabric Suit', 'active'), 
(16, 14, 369.99, 'An exquisite navy plaid suit that offers a refined look. Great for both business and formal occasions, it ensures you look sharp and polished.', 'Navy Plaid Suit', 'active'), 
(17, 11, 400.00, 'This versatile light grey suit features a modern cut, ideal for any occasion from business meetings to evening events.', 'Light Grey Modern Suit', 'active'), 
(18, 15, 450.00, 'A sharp and stylish dark green suit that brings a unique twist to formal wear. Perfect for those who want to make a bold statement.', 'Dark Green Suit', 'active'), 
(19, 13, 310.00, 'This fitted suit offers a contemporary silhouette, making it an excellent choice for young professionals looking to elevate their style.', 'Fitted Young Professional Suit', 'active'), 
(20, 5, 420.00, 'An upscale charcoal tweed suit that combines classic elements with modern design, perfect for chilly evenings and stylish outings.', 'Charcoal Tweed Suit', 'active');


-- Note: The `org_id` values correspond to the 20 different organizations (1 through 20).

-- Insert dummy data into the Orders table

INSERT INTO Orders (org_id, qty, subtotal, status, date)
VALUES 
    (1, 10, 199.90, 'Awaiting Measurements', '2024-09-01'),
    (2, 5, 499.75, 'Ready', '2024-09-05'),
    (3, 12, 2388.00, 'Completed', '2024-09-10'),
    (4, 8, 366.00, 'Cancelled', '2024-09-15'),
    (5, 7, 1750.00, 'Awaiting Measurements', '2024-09-20'),
    (6, 4, 59.96, 'Completed', '2024-09-22'),
    (7, 20, 2599.80, 'Ready', '2024-09-25'),
    (8, 15, 1125.00, 'Awaiting Measurements', '2024-09-28'),
    (9, 18, 1619.82, 'Completed', '2024-10-01'),
    (10, 25, 1499.75, 'Cancelled', '2024-10-03'),
    (11, 6, 660.00, 'Ready', '2024-10-07'),
    (12, 3, 119.97, 'Cancelled', '2024-10-10'),
    (13, 2, 599.98, 'Completed', '2024-10-12'),
    (14, 10, 499.90, 'Awaiting Measurements', '2024-10-15'),
    (15, 8, 1439.92, 'Ready', '2024-10-18'),
    (16, 7, 1399.93, 'Completed', '2024-10-19'),
    (17, 12, 906.00, 'Cancelled', '2024-10-20'),
    (18, 9, 2025.00, 'Awaiting Measurements', '2024-10-21'),
    (19, 5, 499.95, 'Completed', '2024-10-22'),
    (20, 4, 598.00, 'Ready', '2024-10-23');

-- Note: The `org_id` values correspond to the 20 different organizations (1 through 20).
-- The `status` field is randomly selected from the provided statuses.

-- Insert dummy data into the Order_List table

INSERT INTO Order_List (product_id, order_id)
VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (16, 16),
    (17, 17),
    (18, 18),
    (19, 19),
    (20, 20);
    
INSERT INTO Measurements (order_id, emp_id, measurement) VALUES
(1, 1, '{"Chest": "40 inches", "Waist": "32 inches", "Inseam": "30 inches"}'),
(1, 2, '{"Chest": "38 inches", "Waist": "30 inches", "Inseam": "29 inches"}'),
(2, 3, '{"Chest": "42 inches", "Waist": "34 inches", "Inseam": "31 inches"}'),
(2, 4, '{"Chest": "36 inches", "Waist": "28 inches", "Inseam": "30 inches"}'),
(3, 5, '{"Chest": "41 inches", "Waist": "33 inches", "Inseam": "31 inches"}'),
(3, 6, '{"Chest": "39 inches", "Waist": "31 inches", "Inseam": "29 inches"}'),
(4, 7, '{"Chest": "43 inches", "Waist": "35 inches", "Inseam": "32 inches"}'),
(4, 8, '{"Chest": "37 inches", "Waist": "29 inches", "Inseam": "30 inches"}'),
(5, 9, '{"Chest": "45 inches", "Waist": "36 inches", "Inseam": "33 inches"}'),
(5, 10, '{"Chest": "38 inches", "Waist": "30 inches", "Inseam": "31 inches"}'),
(6, 11, '{"Chest": "40 inches", "Waist": "32 inches", "Inseam": "30 inches"}'),
(6, 12, '{"Chest": "36 inches", "Waist": "28 inches", "Inseam": "29 inches"}'),
(7, 13, '{"Chest": "42 inches", "Waist": "34 inches", "Inseam": "31 inches"}'),
(7, 14, '{"Chest": "41 inches", "Waist": "33 inches", "Inseam": "30 inches"}'),
(8, 15, '{"Chest": "39 inches", "Waist": "31 inches", "Inseam": "32 inches"}'),
(8, 16, '{"Chest": "43 inches", "Waist": "35 inches", "Inseam": "29 inches"}'),
(9, 17, '{"Chest": "37 inches", "Waist": "29 inches", "Inseam": "30 inches"}'),
(9, 18, '{"Chest": "45 inches", "Waist": "36 inches", "Inseam": "33 inches"}'),
(10, 19, '{"Chest": "38 inches", "Waist": "30 inches", "Inseam": "31 inches"}'),
(10, 20, '{"Chest": "44 inches", "Waist": "34 inches", "Inseam": "32 inches"}');


-- Note: The `product_id` and `order_id` values assume that the `Products` and `Orders` tables 
-- have 20 entries each, with product IDs and order IDs ranging from 1 to 20.
	



