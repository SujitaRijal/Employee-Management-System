# Employee Management System

## Prerequisites

Make sure you have installed:

- Node.js
- MongoDB Atlas account
- Git

---

## Clone the Repository

```bash
git clone <repository-url>
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

Create a `.env` file inside the `server` folder.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_google_app_password
SENDER_EMAIL=your_email@gmail.com
```

---

## Run the Backend

```bash
cd server
npm start
```

Backend runs on:

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

Frontend runs on:

```
http://localhost:5173
```

---

## Login

Create an admin user directly in MongoDB or register a new account according to your application setup.

## Notes

- The `.env` file is not included in this repository.
- Gmail SMTP requires a Google App Password.
- MongoDB Atlas is used as the database.
