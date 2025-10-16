# Course Selling App

![Screenshot](https://res.cloudinary.com/dcpz5001o/image/upload/v1759562428/Screenshot_from_2025-10-04_11-56-01_dq9gkr.png)

## Overview

This is a full-stack web application for selling online courses. It features user authentication, course management, purchasing functionality, and admin dashboards. The backend handles data persistence with MongoDB, while the frontend provides a responsive UI built with React.

## Features

- **User Authentication**: Register, login, and OTP verification for users.
- **Course Browsing and Purchase**: View courses, add to cart, and complete purchases.
- **Admin Panel**: Create, manage courses; view users and purchases.
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS.
- **Image Upload**: Integrated with Cloudinary for course images.
- **State Management**: Using Recoil for efficient frontend state handling.

## Tech Stack

### Backend
- **Node.js** with **Express.js** for API server
- **MongoDB** with **Mongoose** for database models (Users, Admins, Courses, Purchases)
- **JWT** for authentication
- **Cloudinary** for image storage
- **CORS** enabled for frontend integration

### Frontend
- **React** with **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Recoil** for state management
- **React Router** for navigation
- **Axios** (assumed) for API calls

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image uploads

## Installation

### Backend Setup (Server/)

1. Clone the repository and navigate to the `Server/` directory:
   ```
   cd Server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file and add your credentials (example provided in the file):
   ```
   MONGO_DB_URL="your_mongodb_connection_string"
   JWT_USER_PASSWORD="your_jwt_secret_for_users"
   JWT_ADMIN_PASSWORD="your_jwt_secret_for_admins"
   CLOUDINARY_SECRET="your_cloudinary_secret"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   ```

4. Start the server:
   ```
   node index.js
   ```
   The server runs on `http://localhost:3000`.

### Frontend Setup (client/Tutty/)

1. Navigate to the `client/Tutty/` directory:
   ```
   cd client/Tutty
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The app runs on `http://localhost:5173` (default Vite port).

## Usage

1. **Backend API Endpoints**:
   - **User Routes** (`/user`):
     - `POST /user/register` - Register new user
     - `POST /user/login` - User login
     - `GET /user/dashboard` - User dashboard (protected)
   - **Course Routes** (`/course`):
     - `GET /course/all` - Fetch all courses
     - `POST /course/purchase` - Purchase a course (protected)
   - **Admin Routes** (`/admin`):
     - `POST /admin/login` - Admin login
     - `POST /admin/create-course` - Create new course (protected)
     - `GET /admin/courses` - View all courses (protected)

2. **Frontend Navigation**:
   - Home page with course categories and featured courses.
   - User dashboard for purchased courses.
   - Admin dashboard for course creation and management.
   - Authentication pages for login/register.

Ensure the backend is running before starting the frontend, as it makes API calls to `http://localhost:3000`.

## Project Structure

- **Server/**: Backend API
  - `db.js`: Database models and connection
  - `index.js`: Express app setup
  - `routes/`: API route handlers (User.js, Courses.js, Admin.js)
  - `middleware/`: Authentication middleware (User.js, admin.js)
  - `uploads/`: Local upload directory (uses Cloudinary)

- **client/Tutty/**: React frontend
  - `src/app/`: Main app components (Sidebar, Admin/User containers)
  - `src/components/`: Reusable UI (Navbar, Footer, CourseCard, etc.)
  - `src/context/`: App context for global state
  - `src/recoil/`: Recoil atoms for user/admin state

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, open a GitHub issue or contact TAjinder SIngh.
