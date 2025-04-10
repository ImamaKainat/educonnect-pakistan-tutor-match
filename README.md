
# EduConnect Pakistan

A comprehensive tutoring platform connecting students with qualified tutors across Pakistan.

## Project Structure

This project uses the MERN stack (MongoDB, Express.js, React, Node.js) and is organized into two main directories:

### Client (Frontend)
- `client/src/components`: Reusable UI components
- `client/src/pages`: Page components and routes
- `client/src/context`: Context providers (Auth, etc.)
- `client/src/hooks`: Custom React hooks
- `client/src/utils`: Utility functions and helpers

### Server (Backend)
- `server/models`: MongoDB models (User, Tutor, Booking, etc.)
- `server/routes`: API routes and controllers
- `server/middleware`: Custom middleware (auth, etc.)
- `server/server.js`: Main Express.js server

## Features

- User authentication (student, tutor, admin roles)
- Tutor discovery and filtering
- Session booking system
- Wishlist functionality
- Rating and review system
- User profiles

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```
git clone [repository-url]
cd educonnect-pakistan
```

2. Install dependencies for the server:
```
cd server
npm install
```

3. Install dependencies for the client:
```
cd ../client
npm install
```

4. Create a `.env` file in the server directory with your MongoDB URI and other environment variables (see `.env.example`).

### Running the Application

1. Start the server:
```
cd server
npm run dev
```

2. In a separate terminal, start the client:
```
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Demo Accounts

For testing purposes, you can use the following demo accounts:

- Student: student@example.com / password
- Tutor: tutor@example.com / password
- Admin: admin@example.com / password

## License

This project is licensed under the MIT License.
