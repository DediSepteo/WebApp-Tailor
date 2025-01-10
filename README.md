

# Tailoring Web Application

This project is a comprehensive tailoring web application designed to serve both Business-to-Business (B2B) and Business-to-Consumer (B2C) needs. The platform provides functionalities for business owners, employees, and administrators to manage uniforms, orders, and measurements efficiently.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Routes](#api-routes)
- [License](#license)

---

## Features


### For Administrators
- Admin url - *frontend-url*/admin/login
- View and manage all orders, products, and organizations.
- Handle employee and business registrations.
- Approve or deactivate organizations.

### General
- Secure authentication and authorization (Admin and Org roles).
- Dynamic routing for shops and products.
- Responsive design for a seamless user experience.

---

## Tech Stack

### Frontend:
- React.js with React Router for SPA functionality.
- Context API for state management.
- CSS for styling.

### Backend:
- Node.js with Express for API handling.
- MySQL for database management.
- Nodemailer for email functionality (e.g., password reset, contact forms).

### Deployment:
- Amazon RDS for the MySQL database.
- AWS EC2 for hosting
- AWS S3 for image


---

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/DediSepteo/WebApp-Tailor.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Import the `schema.sql` file into your MySQL instance.
   - Create a `.env` file and add your database credentials (see [Environment Variables](#environment-variables)).

4. Start the development server:
   ```bash
   npm start
   ```

5. Navigate to `http://localhost:3000` in your browser.

---

## Folder Structure

```
src/
├── components/    # Reusable components (NavBar, Footer, etc.)
├── pages/         # Page-specific components (Home, Login, Admin Pages)
├── styles/        # CSS files
├── utils/         # Utility functions
├── App.js         # Main application entry point
└── index.js       # React DOM rendering
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_USER=your-database-username
DB_HOST=your-host-name
DB_DATABASE=your-database-name
DB_PASSWORD=your-database-password
JWT_SECRET=jwt-token

EMAIL_NAME = your-email
EMAIL_PASS = your-email-password (need create from gmail app password)
    
FRONTEND_URL=whatever-url-your-frontend-is
```

---

## Usage

### Run Locally
```bash
npm start
```

```Run DB
node/nodemon server.js (on another terminal)
```


### Build for Production
```bash
npm run build
```

---

## API Routes

### Authentication
- `POST /api/login`: Authenticate users (Admin/Employee).
- `POST /api/register`: Register new users.

### Orders
- `GET /api/orders`: Get all orders.
- `POST /api/orders`: Create a new order.

### Products
- `GET /api/products`: Retrieve available products.
- `POST /api/products`: Add new products.

_For a complete list of routes and details, refer to the backend documentation._

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further to suit your specific project details. Let me know if you'd like to tweak any section!
