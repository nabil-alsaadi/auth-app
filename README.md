# User Authentication Module

This project is a user authentication module built with a modern tech stack including **React** for the frontend, **NestJS** for the backend, **MongoDB** for data storage, and **Redux** with **Redux Observable** for state management. The module provides a secure sign-up and sign-in mechanism, complete with JWT authentication and form validation.


## Overview

The User Authentication Module is designed to provide a seamless authentication experience for users. It allows users to sign up and sign in using secure practices and JWT for token-based authentication. The module uses Formik for form handling, Yup for validation, and Redux for managing application state.

## Features

- **User Registration**: Secure sign-up with validation and password hashing.
- **User Login**: Authenticate users with email and password.
- **JWT Authentication**: Protect routes using JWT tokens.
- **Form Validation**: Client-side validation using Yup and Formik.
- **Redux State Management**: Centralized state management with Redux and Redux Observable.
- **Error Handling**: Graceful error handling and feedback to users.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Observable**: Middleware for Redux to handle async actions.
- **Formik**: A library for building forms in React.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **Material-UI**: React components for faster and easier web development.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database for storing user data.
- **Mongoose**: An ODM for MongoDB to manage relationships between data.
- **JWT (JsonWebToken)**: For token-based authentication.
- **bcrypt**: A library to hash passwords securely.


## Project Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **npm or Yarn**: A package manager to install dependencies.

### Installation

1. **Clone the Repository**
  ```sh
  git clone https://github.com/nabil-alsaadi/auth-app.git
  ```
2. **go to auth-app-backend and install NPM packages
```sh
  cd auth-app/auth-app-backend
  npm install
  ``` 
4. **Run the Development Server
```sh
   npm run start
   ```
6. ** in other terminal go to auth-app-frontend and install NPM packages
```sh
  cd auth-app/auth-app-frontend
  npm install
  ```
7. **start the frontend
```sh
   npm run start
   ```
   
