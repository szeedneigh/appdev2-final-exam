# Event Management REST API

📌 A simple REST API for managing events where users can log in and create events. The system also sends email notifications when events are created.

## Features

- User authentication using JWT
- Create and retrieve events
- Email notifications using Pug templates
- Seeding functionality to populate the database with fake data

## 🔗 Deployment

The API is deployed on Render at:
[https://appdev2-final-exam-qo2l.onrender.com](https://appdev2-final-exam-qo2l.onrender.com)

## ⚙️ Running the Project Locally

1. Clone the repository
   ```
   git clone https://github.com/yourusername/appdev2-final-exam.git
   cd appdev2-final-exam
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a .env file in the root directory with the following environment variables:
   ```
   MONGODB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   EMAIL_USER=your_email_here
   EMAIL_PASS=your_email_password_here
   PORT=5000
   ```

4. Start the server
   ```
   npm start
   ```
   
   For development with automatic restart:
   ```
   npm run dev
   ```

## 🧪 Running the Seeder

To populate the database with fake users and events:

```
npm run seed
```

This will:
- Clear all existing users and events
- Create 5 fake users (password: secret123)
- Create 10 fake events linked to random users

## API Endpoints

### Authentication
- **POST /api/auth/signin** - Login and get JWT token
  
  Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "secret123"
  }
  ```
  
  Response:
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

### Events
- **GET /api/events** - Get all events (public)
  
  Response:
  ```json
  {
    "success": true,
    "count": 10,
    "data": [
      {
        "_id": "event_id",
        "title": "Event Title",
        "location": "Event Location",
        "date": "2023-12-31T00:00:00.000Z",
        "description": "Event Description",
        "userId": {
          "name": "User Name",
          "email": "user@example.com"
        },
        "createdAt": "2023-06-01T00:00:00.000Z",
        "updatedAt": "2023-06-01T00:00:00.000Z"
      },
      // More events...
    ]
  }
  ```

- **POST /api/events** - Create a new event (requires authentication)
  
  Headers:
  ```
  Authorization: Bearer jwt_token_here
  ```
  
  Request body:
  ```json
  {
    "title": "Event Title",
    "location": "Event Location",
    "date": "2023-12-31",
    "description": "Event Description"
  }
  ```
  
  Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "event_id",
      "title": "Event Title",
      "location": "Event Location",
      "date": "2023-12-31T00:00:00.000Z",
      "description": "Event Description",
      "userId": "user_id",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    }
  }
  ```

- **GET /api/my-events** - Get events created by the logged-in user (requires authentication)
  
  Headers:
  ```
  Authorization: Bearer jwt_token_here
  ```
  
  Response:
  ```json
  {
    "success": true,
    "count": 3,
    "data": [
      {
        "_id": "event_id",
        "title": "Event Title",
        "location": "Event Location",
        "date": "2023-12-31T00:00:00.000Z",
        "description": "Event Description",
        "userId": "user_id",
        "createdAt": "2023-06-01T00:00:00.000Z",
        "updatedAt": "2023-06-01T00:00:00.000Z"
      },
      // More events...
    ]
  }
  ```

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the required environment variables:
   - MONGODB_URI (from MongoDB Atlas)
   - JWT_SECRET
   - EMAIL_USER
   - EMAIL_PASS
   - PORT (Render will provide the PORT automatically)
5. Deploy the application

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Allow access from anywhere (0.0.0.0/0)
5. Get your connection string and add it to your environment variables
