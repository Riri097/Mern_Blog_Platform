# MERN Blogging Platform - Internship Task
This project is a Blog Platform built with the MERN stack (MongoDB, Express, React, Node.js). It follows a strict service-oriented architecture and implements manual logic for slugs and pagination without external libraries.

## Architecture & Constraints

- **Folder Structure:** `backend` and `frontend`.
- **Backend Architecture:**
  - **Services:** All Mongoose/Database logic lives here.
  - **Controllers:** Handle HTTP requests and call Services.
  - **Utils:** Manual logic for slug generation and pagination.
  - **Middleware:** `asyncHandler` (to avoid try-catch), Global Error Handler, JWT Auth.
- **Constraints:**
  - Use `asyncHandler` instead of try-catch blocks.
  - Manual Regex for Slugs.
  - Manual `.skip()` & `.limit()` for Pagination.
  - JWT Authentication (No cookies/sessions).

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
# Packages used: express, mongoose, dotenv, jsonwebtoken, bcryptjs, cors

3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
4. Start server:
   ```bash
   npm run dev
   ```

