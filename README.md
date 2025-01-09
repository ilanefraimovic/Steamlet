# Steamlet

A steampunk-themed study app built using React for the frontend, Express and Node.js for the backend, and MySQL for the database.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Starting the Application](#starting-the-application)

## Prerequisites
1. **Node.js** and **npm** installed.
2. **MySQL** installed with a user credential that has access to the database. 
    - Database name: `study`
    - User: `learn_connection`
    - Password: `12345`

## Installation

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend should now be running on [http://localhost:3000](http://localhost:3000) by default.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file for environment variables:
   - Add the following configuration to your `.env` file:
     ```plaintext
     # Database Configuration
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=learn_connection
     DB_PASSWORD=12345
     DB_NAME=study

     # Server Configuration
     PORT=3000
     NODE_ENV=development

     # API Keys (optional, if using external APIs)
     API_KEY=myApiKeyHere
     API_SECRET=myApiSecretHere
     ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server should now be running on the port specified in your `.env` file.

## Database Schema
The following tables are set up in the MySQL database named `study`:

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(1056) NOT NULL,
    create_date DATE
);

CREATE TABLE Sets (
    set_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    create_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    set_id INT,
    term VARCHAR(512) NOT NULL,
    definition VARCHAR(512) NOT NULL,
    create_date DATE,
    FOREIGN KEY (set_id) REFERENCES Sets(set_id) ON DELETE CASCADE
);

CREATE TABLE Friend_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id_from INT NOT NULL,
    user_id_to INT NOT NULL,
    request_date DATETIME DEFAULT NOW(),
    request_status ENUM('CONFIRMED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (user_id_from) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_to) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Friends (
    friendship_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    friend_user_id INT NOT NULL,
    friendship_date DATETIME DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_user_id) REFERENCES Users(id) ON DELETE CASCADE
);
```

## Starting the Application

1. Ensure that both the frontend and backend servers are running.
2. Access the application at [http://localhost:3000](http://localhost:3000) if both frontend and backend are running on the same port or adjust the ports accordingly if specified differently in `.env`.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
