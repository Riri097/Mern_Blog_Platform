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
# Core packages used: express, mongoose, dotenv, jsonwebtoken, bcryptjs, cors 

3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
4. Start backend:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install axios react-router-dom
   npm install react-toastify
   npm install react-icons
   ```
3. Start frontend:
   ```bash
   npm start
   ```


## API Usage Examples

### Authentication Module

| Endpoint          | Method | Description          | Request Body                                      |
|------------------|--------|--------------------|--------------------------------------------------|
| `/api/users`      | POST   | Register a new user | `{ "name": "John", "email": "j@test.com", "password": "123" }` |
| `/api/users/login`| POST   | Login & Get Token   | `{ "email": "j@test.com", "password": "123" }` |

## Blog API Usage

### Blog Posts

| Endpoint               | Method | Access      | Description                                   | Request Body |
|----------------------- |--------|------------ |-----------------------------------------------|--------------|
| `/api/posts`           | GET    | Public      | Get all published blog posts                  | — |
| `/api/posts`           | POST   | Admin only  | Create a new blog post                        | `{ "title": "Your Title", "content": "Post content", "image": "base64" }` |
| `/api/posts/admin`     | GET    | Admin only  | Get all blog posts (published + drafts)       | — |
| `/api/posts/:slug`     | GET    | Public      | Get a single published post by slug           | — |
| `/api/posts/id/:id`    | PUT    | Admin only  | Update a blog post by ID                      | `{ "title": "Updated title", "content": "Updated content" }` |
| `/api/posts/id/:id`    | DELETE | Admin only  | Delete a blog post by ID                      | — |

