# Employee Management System

A full-stack Employee Management System built with the MERN stack that provides role-based authentication and employee management features.

## Prerequisites

Make sure you have the following installed:

* Node.js
* Git
* MongoDB Atlas account (or a local MongoDB instance)

---

## Clone the Repository

```bash
git clone https://github.com/SujitaRijal/Employee-Management-System.git
cd Employee-Management-System
```

---

## Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

## Configure Environment Variables

### Server

Create a `.env` file inside the `server` folder.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_google_app_password
SENDER_EMAIL=your_email@gmail.com

```

### Client

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:4000
```

---

## Run the Backend

```bash
cd server
npm start
```

The backend runs at:

```
http://localhost:4000
```

---

## Run the Frontend

Open a new terminal.

```bash
cd client
npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

---

## Login

Create an admin account in MongoDB or use an existing account according to your application's setup.

---

## Notes

* The `.env` files are not included in this repository.
* Gmail SMTP requires a Google App Password.
* MongoDB Atlas (or a local MongoDB instance) is used as the database.
* Update `VITE_API_URL` in the client `.env` file if your backend runs on a different URL.

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer


---

