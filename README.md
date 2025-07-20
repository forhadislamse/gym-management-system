# Gym Class Scheduling and Membership Management System

## Project Overview

This application is a comprehensive Gym Class Scheduling and Membership Management System designed to efficiently manage gym operations with clearly defined roles and permissions.

### Key Features

- **Role-Based Access Control:** Supports three user roles — Admin, Trainer, and Trainee — each with distinct permissions.
- **Class Scheduling:** Admins can schedule up to 5 classes per day, each lasting 2 hours.
- **Booking Management:** Trainees can book classes with a maximum of 10 trainees per schedule, avoiding double bookings in overlapping time slots.
- **Profile Management:** Trainees manage their own profiles while trainers can view their assigned schedules.
- **Secure Authentication:** JWT-based authentication ensures secure access and role-based authorization.
- **Global Error Handling:** Includes validation, unauthorized access prevention, booking capacity checks, and schedule limits enforcement.

### Business Rules

- Maximum 5 classes can be scheduled per day.
- Each class session lasts 2 hours.
- Each class can accommodate up to 10 trainees.
- Trainees cannot book overlapping classes.
- Booking and scheduling limits are strictly enforced with proper error messages.

---

This project provides a scalable and secure solution for gym management, improving operational workflow and user experience through precise role definitions and business rule enforcement.

## **Technology Stack**

- **Backend Framework**: Express.js (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Bcrypt, Dotenv, Zod

---

## **ER Diagram**

Below is the Entity Relationship (ER) Diagram for the system:

![ER Diagram](./er_diagram.png)

## **API Endpoints**

### **Authentication**

1. **Login**

   - **POST** `/auth/login`
   - **Body**:
     `json
     {
    "id": "Admin-0001",
    "password": "admin123"
}
     `
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User is logged in successfully!",
       "data": {
         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBZG1pbi0wMDAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyOTkwMDQ0LCJleHAiOjE3NTM4NTQwNDR9.7U500fUTLYmU8EX7_YI63f44AeSJoe1rc6RiXvOeBo8"
       }
     }
     ```

---

### **Admin Management**

1. **Create Admin**

   - **POST** `http://localhost:5000/api/v1/users/create-admin`

2. **Get All Admins**

   - **GET** `http://localhost:5000/api/v1/admins/`

3. **Get specific Admin**

   - **GET** `http://localhost:5000/api/v1/admins/687c811ca1340bb58ed1940a`

4. **Update specific Admin**

   - **patch** `http://localhost:5000/api/v1/admins/687c811ca1340bb58ed1940a`

5. **Delete specific Admin**

   - **patch** `http://localhost:5000/api/v1/admins/687c811ca1340bb58ed1940a`

---

### **Trainer Management**

1. **Create Trainer**

   - **POST** `http://localhost:5000/api/v1/users/create-trainer`

2. **Get All Trainers**

   - **GET** `http://localhost:5000/api/v1/trainers/`

3. **Get specific Trainer**

   - **GET** `http://localhost:5000/api/v1/trainers/687c8782ba0a0c9b44b7ef76`

4. **Update specific Trainer**

   - **patch** `http://localhost:5000/api/v1/trainers/687c8782ba0a0c9b44b7ef76`

5. **Get Trainer's Class Schedules**

   - **GET** `http://localhost:5000/api/v1/trainers/my-class-schedule/`

6. **Delete Trainer by Trainer ID**

   - **DELETE** `http://localhost:5000/api/v1/trainers/687c8782ba0a0c9b44b7ef76`

---

### **Trainee Management**

1. **Create Trainee**

   - **POST** `http://localhost:5000/api/v1/users/create-trainee`

2. **Get All Trainees**

   - **GET** `http://localhost:5000/api/v1/trainees/`

3. **Get specific Trainee**

   - **GET** `http://localhost:5000/api/v1/trainees/687c9082fa7b4fc18c750f59`

4. **Update specific Trainee**

   - **patch** `http://localhost:5000/api/v1/trainees/687c9082fa7b4fc18c750f59`

5. **Delete Trainee by Trainee ID**

   - **DELETE** `http://localhost:5000/api/v1/trainees/687c9082fa7b4fc18c750f59`

---

### **Class Schedule Management**

1. **Create New Class Schedule**

   - **POST** `http://localhost:5000/api/v1/schedules/create-schedule`
   - **Body**:
     `json
     {
    "trainer": "687c8782ba0a0c9b44b7ef76",
    "trainee": [
        "687c9064fa7b4fc18c750f4a","687c906dfa7b4fc18c750f4f","687c9082fa7b4fc18c750f59"
    ],
    "classScheduleDate": "2031-05-10T04:00:01Z",
    "maxTrainees": 5,
    "startTime": "12:30",
    "endTime": "14:30"
}
     `

2. **Get All Class Schedules**

   - **GET** `http://localhost:5000/api/v1/schedules/`

3. **Assign Trainer to Class Schedule**

   - **PATCH** `http://localhost:5000/api/v1/schedules/assign-trainer/687ca0d662e1d454d1569355`
   - **Body**:
     `json
     {
    "trainerId": "687c883fba0a0c9b44b7ef7c"
}
     `

4. **Delete Class Schedule by Schedule ID**

   - **DELETE** `http://localhost:5000/api/v1/schedules/687ca0d662e1d454d1569355`

---

### **Booking Management**

1. **Create Booking by Schedule ID**

   - **POST** `http://localhost:5000/api/v1/bookings/create/687b93d2f5df7bff0cb96a30`

2. **Get My Bookings**

   - **GET** `http://localhost:5000/api/v1/bookings/my-bookings`

3. **Cancel My Booking**

   - **DELETE** `http://localhost:5000/api/v1/schedules/687ca0d662e1d454d1569355`

---

**Zod Error**
Occurs when the request body fails Zod validation (e.g., missing fields or wrong types).

```json
{
  "success": false,
  "message": "Zod Validation Error",
  "errorSources": [
    {
      "path": "dateOfBirth",
      "message": "Expected string, received number"
    }
  ],
  "stack": null // only in development
}
```

**Mongoose Validation Error**
Occurs when Mongoose schema validation fails (e.g., required field missing in DB schema).

```json
{
  "success": false,
  "message": "Mongoose Validation Error",
  "errorSources": [
    {
      "path": "email",
      "message": "Path `email` is required."
    }
  ],
  "stack": null
}
```

**Cast Error**
Occurs when an invalid ObjectId is passed in a route param (e.g., /admins/123abc)

```json
{
  "success": false,
  "message": "Invalid Id",
  "errorSources": [
    {
      "path": "_id",
      "message": "Cast to ObjectId failed for value \"6854eac205b8398cf46e1e\" (type string) at path \"_id\" for model \"Admin\""
    }
  ],
  "stack": null
}
```

**Not Found Route**
if no matching routes then response will be

```json
{
  "success": false,
  "message": "API Not Found !!",
  "error": ""
}
```

## Installation

**1. Clone the repository:**

```
   git clone https://github.com/forhadislamse/university-management-server.git
   cd university-management-server

   // Using npm:
   npm install

   // Or, using yarn:
   yarn install
```

2. Create a `.env` file in the root of the project directory to store environment variables. Example .env file:

```
   PORT= port number
   DATABASE_URL= mongodb+srv://<your-db-uri>
   NODE_ENV= development
   BCRYPT_SALT_ROUNDS= salt_round
   DEFAULT_PASS= your password
 JWT_ACCESS_SECRET=your key
JWT_REFRESH_SECRET=your key
JWT_ACCESS_EXPIRES_IN= your days
JWT_REFRESH_EXPIRES_IN= your days
```

## Running the Application

We can run the application using the following npm scripts:

### **1. Build the application:**

This command compiles the TypeScript files into JavaScript files:

`npm run build`

### **2. Start the application:**

After building the application, we can start it with the following command:

`npm run start`

### **3. Start the application in development mode:**

For development, we use the start:dev script, which runs the application using ts-node-dev, so it will automatically reload on file changes:

`npm run start:dev`

### **4. Start the application in production mode with nodemon:**

This script uses nodemon to restart the application automatically when changes occur in the compiled JavaScript files:

`npm run start:prod`

### **5. Linting:**

To run ESLint and check for code issues, use the following command:

`npm run lint`

To automatically fix linting issues, use:

`npm run lint:fix`

### **6. Prettier:**

To format your code with Prettier (ignoring .gitignore files), use this command:

`npm run prettier`

To automatically fix prettier issues, use:

`npm run prettier:fix`

### **7. Access the API:** The API will be accessible at http://localhost:5000.

# Admin Credentials

- id: Admin-0001,
- password: admin123

# Live Hosting Link

- Live link: `https://gym-management-system-opal.vercel.app/`

![POSTMAN COLLECTION](./gym-management-system.postman_collection.json)

Description: This is a postman collection of all the API endpoints.Download this , and import it in your postman if you needed.

---
