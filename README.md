
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

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation and Security Setup

1. Install dependencies for the server:
```
cd server
npm install
```

2. Install dependencies for the client:
```
cd ../client
npm install
```

3. If you encounter npm audit issues:
   - For non-critical warnings, you can typically ignore them in development
   - For critical issues, run `npm audit fix` to apply safe updates
   - If more aggressive fixes are needed, use `npm audit fix --force` (may cause breaking changes)
   - For the most stubborn issues, you may need to update specific packages manually

4. Start the application:
   - Server: `cd server && npm run dev`
   - Client: `cd client && npm start`

## Features

- User authentication (student, tutor, admin roles)
- Tutor discovery and filtering
- Session booking system
- Wishlist functionality
- Rating and review system
- User profiles

## License

This project is licensed under the MIT License.
