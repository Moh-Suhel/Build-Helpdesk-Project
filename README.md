# HelpDesk Ticket System

A full-stack HelpDesk Ticket System that allows users to create and manage support tickets, while administrators can manage all tickets, update ticket status and priority, assign tickets, and monitor support requests.

## Features

### User Features

- User Registration and Login
- JWT-based Authentication
- Secure Logout
- Create Support Tickets
- View My Tickets
- View Ticket Details
- Update Own Tickets
- Delete Own Tickets
- Add Comments to Tickets
- View Ticket Comments

### Admin Features

- Admin Authentication and Authorization
- Admin Dashboard
- View All Tickets
- View Ticket Details
- Update Ticket Status
- Update Ticket Priority
- Assign Tickets to Users
- Search Tickets
- Filter Tickets by Status, Priority and Category
- View Ticket Creator Information

## Ticket Categories

- Hardware
- Software
- Network
- Account
- Other

## Ticket Priority

- Low
- Medium
- High

## Ticket Status

- Open
- In Progress
- Resolved
- Closed

## User Roles

### USER

Regular users can:

- Create tickets
- View their own tickets
- Update their tickets
- Delete their tickets
- Add comments

### ADMIN

Administrators can:

- View all tickets
- Search and filter tickets
- Update ticket status
- Update ticket priority
- Assign tickets
- View ticket creator information

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- CORS
- Multer
- Cloudinary

### Development Tools

- VS Code
- Git
- GitHub
- MongoDB Atlas

## Project Structure

My First Project/
│
├── frontend/
│ ├── HTML/
│ ├── CSS/
│ └── JS/
│
├── src/
│ ├── controllers/
│ ├── db/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ └── utils/
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Authentication

The application uses JWT-based authentication.

Access Token is stored in an HTTP-only cookie.
Authentication middleware verifies the token.
The authenticated user's ID is obtained from the token.
User authorization is handled using roles such as USER and ADMIN.
API Base URL
Local Development
http://127.0.0.1:8000
Running the Project Locally

1. Clone the repository
   git clone <YOUR_GITHUB_REPOSITORY_URL>
2. Go to the project directory
   cd helpdesk-ticket-system
3. Install dependencies
   npm install
4. Configure environment variables

Create a .env file in the project root and add the required MongoDB and JWT configuration.

Never upload the .env file to GitHub.

5. Start the backend
   npm run dev
6. Run the frontend

Open the frontend using a local server such as VS Code Live Server.

Security
Passwords are hashed using bcrypt.
JWT authentication is used for protected routes.
HTTP-only cookies are used for authentication tokens.
Role-based authorization protects admin routes.
Environment variables are used for sensitive configuration.
.env and node_modules are excluded from Git using .gitignore.
Future Improvements
Pagination
Advanced admin dashboard statistics
Better validation and error messages
Email notifications
Improved UI/UX
Ticket history and activity logs
Project Purpose

This project was developed as a full-stack web application to understand and implement:

REST APIs
Authentication and Authorization
CRUD Operations
MongoDB and Mongoose
Express.js backend development
Frontend-backend communication
Role-based access control
Ticket management workflows

```

```
