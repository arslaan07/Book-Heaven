# Bookstore Application

## Overview
This is a MERN (MongoDB, Express, React, Node.js)-based bookstore application that allows users to browse recently added books, add new books, and manage books through an admin panel. The application also incorporates localStorage for caching recently viewed books and uses an API for dynamic data fetching.

---

## Project Structure
The project is organized into two main folders:

- **Frontend**: Contains the React.js codebase for the user interface.
- **Backend**: Contains the Node.js and Express.js server-side code for API handling and database interaction.

---

## Features

### User Features
- User Registration
- Browse a collection of recently added books.
- View details of each book through individual book cards.
- Optimized for responsiveness across devices.

### Admin Panel Features
- Add, update, and delete books from the collection.
- Manage the book inventory seamlessly through a simple interface.
- Authentication for secure access.

### Storage
- **LocalStorage:** Recently viewed books are stored in localStorage to enhance performance and user experience.


---

## Technologies Used
- **Frontend:** Contains the Vite-based React.js codebase for the user interface.
- **Backend:** Node.js with Express.js.
- **Database:** MongoDB for storing book, user and admin data.
- **Styling:** Tailwind CSS for a modern and responsive design.

---

## Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bookstore.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bookstore
   ```
3. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
4. Install backend dependencies:
   ```bash
   npm install
   ```
5. Set up environment variables:
   - Create a `.env` file in the `Backend` folder.
   - Add the following variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     PORT=3000
     ```
6. Start the backend server:
   ```bash
   npm run server
   ```
7. Navigate to the `Frontend` folder:
   ```bash
   cd ../Frontend
   ```
8. Install frontend dependencies:
   ```bash
   npm install
   ```
9. Start the frontend development server:
   ```bash
   npm start
   ```
10. Access the application at `http://localhost:3000`.

---


## Future Improvements
- Implement a search and filter system for books.
- Enhance admin panel functionality with advanced analytics.
- Introduce user reviews and ratings for books.

---

