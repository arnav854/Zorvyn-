# Zorvyn Project - Financial Management System 

Zorvyn Project is a **Financial Management System** built with the MERN stack (MongoDB, Express, Node.js). It empowers users to track their financial journey with precision, offering detailed analytics, role-based access control, and a robust API for personal or organizational finance tracking.

---

## 🌟 Key Features

- **🔐 Secure Authentication**: Multi-layered security using JWT (JSON Web Tokens) and HTTP-only cookies.
- **📊 Advanced Dashboard**: 
  - **Aggregated Financial Summary**: Instantly view total income, expenses, and net balance.
  - **Category Analytics**: Grouped financial data to understand spending habits.
  - **Trend Analysis**: Monthly and weekly trends to visualize financial health over time.
  - **Activity Tracking**: Real-time listing of the most recent financial transactions.
- **🛠️ Role-Based Access Control (RBAC)**: 
  - **Admin**: Full CRUD (Create, Read, Update, Delete) capabilities.
  - **Analyst & Viewer**: Specialized access levels for data consumption and reporting.
- **🛡️ Enterprise-Grade Security**: 
  - **Rate Limiting**: Protection against DDoS and brute-force attacks.
  - **Input Validation**: Strict schema enforcement using `express-validator`.
  - **Password Hashing**: Industry-standard encryption with `bcrypt`.

---

## 🚀 Tech Stack

### Backend Core
- **Node.js & Express.js**: High-performance server-side environment.
- **MongoDB & Mongoose**: Flexible NoSQL database with elegant object modeling.

### Security & Utilities
- **jsonwebtoken (JWT)**: Stateless authentication.
- **bcrypt**: Secure password hashing.
- **cookie-parser**: Simplified cookie handling for session management.
- **express-rate-limit**: API request throttling.
- **express-validator**: Robust server-side input validation.
- **cors**: Cross-Origin Resource Sharing configuration.

---

## 📁 Project Structure

```text
zorvyn/
├── backend/
│   ├── controllers/         # Business logic for routes
│   ├── db/                  # Database connection configuration
│   ├── middlewares/         # Auth, validation, and error middlewares
│   ├── models/              # Mongoose data schemas
│   ├── routers/             # API endpoint definitions
│   ├── utils/               # Helper functions (JWT, Rate limiters)
│   ├── .env                 # Environment variables
│   ├── index.js             # Entry point
│   └── package.json         # Dependencies and scripts/
└── readme.md                # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/zorvyn.git
   cd zorvyn
   ```

2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the application**:
   ```bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```

---

## 🔌 API Reference

### Authentication
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user & get token | Public |

### Financial Records
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/financialRecord/create` | POST | Add a new income/expense | Admin |
| `/api/financialRecord/get/allrecords/:userId` | GET | List all records for a user | Authenticated |
| `/api/financialRecord/edit/:id` | PATCH | Update an existing record | Admin |
| `/api/financialRecord/delete/:id` | DELETE | Remove a financial record | Admin |

### Dashboard & Analytics
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/dashboard/summary/:userId` | GET | Total Balance, Income, Expense | Analyst | Admin |
| `/api/dashboard/category-wise-summary/:userId` | GET | Spending by category | Analyst | Admin |
| `/api/dashboard/recent-activity/:userId` | GET | Last 10 transactions | Analyst | Admin |
| `/api/dashboard/monthly-trends/:userId` | GET | Financial trends by month | Analyst | Admin |
| `/api/dashboard/weekly-trends/:userId` | GET | Financial trends by week | Analyst | Admin |

---

## 🧠 Design Decisions & Assumptions

### Role-Based Permissions
The system assumes that while users can view their own data, certain modifications (CRUD) are restricted to the **Admin** role. This ensures data integrity in an organizational setting where analysts might only need to generate reports.

### Scalable Aggregations
Dashboard metrics are computed using **MongoDB Aggregation Framework** pipelines. This offloads complex calculations to the database layer, ensuring the application remains responsive even with large datasets.

### Security First
- **Stateless Auth**: JWTs are used to avoid server-side session overhead.
- **Throttling**: Specialized rate limiters for `auth` and `api` routes to mitigate different types of abuse.

---


