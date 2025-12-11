#  **Organization Management Service – Backend (Node.js + Express + MongoDB)**

A multi-tenant backend service that dynamically creates a separate MongoDB collection for each organization.
Supports secure admin authentication using JWT, password hashing, and CRUD operations for organizations.

---

#  **How to Run This Project**

Follow these steps to run the backend on your local machine:

---

## **1️. Clone the Repository**

```bash
git clone https://github.com/YourUsername/Organization-Management-Service.git
cd Organization-Management-Service
```

---

## **2️. Install All Dependencies**

```bash
npm install
```

---

## **3️. Create a `.env` File**

Inside the project root, create a file named **.env**:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/master_database
JWT_SECRET=your_jwt_secret_here
```

---

## **4️. Start the Server**

For development mode (auto-restart using nodemon):

```bash
npm run dev
```

For normal start:

```bash
npm start
```

If everything is correct, you should see:

```
Master Database Connected
Server running on port 5000
```

---

#  **Project Structure**

```
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── Organization.js
│   └── Admin.js
├── routes/
│   ├── orgRoutes.js
│   └── authRoutes.js
├── controllers/
│   ├── orgController.js
│   └── authController.js
└── middleware/
    └── authMiddleware.js
```

---

#  **Authentication**

Admin login uses **JWT Token**.

* Header format:

```
Authorization: Bearer <your_token_here>
```

* Token expiry: **1 hour**
* Passwords stored using **bcrypt hashing**

---

#  **API Documentation (with Examples)**

Below are all APIs required for the assignment with inputs and sample responses.

---

# 1️. **Create Organization**

### **Endpoint**

```
POST /org/create
```

### **Request Body**

```json
{
  "organization_name": "testorg",
  "email": "admin@gmail.com",
  "password": "123456"
}
```

###  **Expected Behavior**

* Validates unique organization name
* Creates dynamic collection: `org_testorg`
* Creates admin user
* Stores metadata in **master database**

### **Sample Success Response**

```json
{
  "message": "Organization created",
  "org": {
    "_id": "67abc1d12f4b9c45678901ed",
    "organization_name": "testorg",
    "collection_name": "org_testorg",
    "admin_id": "674abbd91234aa6789bc0012"
  }
}
```

---

# 2️. **Get Organization by Name (Protected)**

### **Endpoint**

```
GET /org/get?organization_name=testorg
```

### **Headers**

```
Authorization: Bearer <jwt_token_here>
```

### **Sample Success Response**

```json
{
  "_id": "67abc1d12f4b9c45678901ed",
  "organization_name": "testorg",
  "collection_name": "org_testorg",
  "admin_id": "674abbd91234aa6789bc0012"
}
```

### **If not found**

```json
{
  "message": "Not found"
}
```

---

# 3️. **Update Organization**


### **Endpoint**

```
PUT /org/update/:organization_id
```

### **Request Body**

```json
{
  "organization_name": "testorg",
  "email": "newadmin@gmail.com",
  "password": "newpassword"
}
```

### **Expected Behavior**

* Validates organization existence
* Updates collection, admin, and metadata

---

# 4️. **Delete Organization (Protected)**

### **Endpoint**

```
DELETE /org/delete
```

### **Headers**

```
Authorization: Bearer <jwt_token_here>
```

### **Request Body**

```json
{
  "organization_name": "testorg"
}
```

###  **Expected Behavior**

* Only the authenticated admin can delete
* Removes admin + organization metadata
* Deletes dynamic organization collection

### **Sample Response**

```json
{
  "message": "Organization deleted successfully"
}
```

---

# 5️. **Admin Login**

### **Endpoint**

```
POST /admin/login
```

### **Request Body**

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### **Success Response**

```json
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Invalid Credentials**

```json
{
  "message": "Wrong password"
}
```

---

#  **Technologies Used**

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcrypt Password Hashing**
* **dotenv**
* **nodemon**

---


