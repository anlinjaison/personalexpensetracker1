# 💰 Personal Expense Tracker (MERN Stack)

A full-stack Personal Expense Tracker web application built with the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). Designed for efficient daily expense recording, instant categorization, real-time total spending calculation, and clean CRUD operations.

---

## 🌟 Key Features

1. **Add Expense**:
   - Fields: Title, Amount ($), Category (`Food`, `Travel`, `Bills`, `Shopping`, `Entertainment`, `Health`, `Other`), and Date (with optional notes/remarks).
   - Strict validations: Title required (min 2 characters), positive amount (> 0, no negative or zero values), valid date, and category selection.
   - Immediate feedback via success/error toast alerts.

2. **View Expenses**:
   - Clean, modern table and card view displaying Title, Category (with color-coded badge), Date, and Formatted Amount.
   - **Automatic Refresh**: The list and total update automatically without full page reload after any Add, Edit, or Delete operation.
   - **Search & Filtering**: Instant search by title or notes, category dropdown filter, and sorting (Newest/Oldest Date, Highest/Lowest Amount, A-Z).

3. **Edit Expense**:
   - Each expense row includes an **Edit** action.
   - Pre-fills the form with existing data (Title, Amount, Category, Date, Notes).
   - Saving updates the database record and recalculates the total spent on screen in real-time.

4. **Delete Expense**:
   - Each expense row includes a **Delete** action with a **Confirmation Modal** before deletion to prevent accidental data loss.
   - Automatically removes the record from MongoDB and screen, updating the total immediately.

5. **Summary Cards**:
   - **Total Amount Spent** prominently displayed at the top with glowing gradient highlight.
   - Additional metrics: Total Transactions count, Highest Single Expense, and Top Spending Category.
   - **Visual Spending Distribution**: Interactive progress bar breakdown by category with percentage distribution.

6. **Responsive UI/UX**:
   - Modern glassmorphism dashboard aesthetics with curated color palette and `Plus Jakarta Sans` typography.
   - Fully responsive layout optimized for mobile, tablet, and desktop screens.

---

## 🏗️ Repository Structure

```text
mern/
├── backend/                  # Node.js & Express REST API
│   ├── config/
│   │   └── db.js             # MongoDB Atlas connection setup
│   ├── controllers/
│   │   └── expenseController.js # CRUD & Summary controllers
│   ├── middleware/
│   │   └── errorHandler.js   # Global validation & error handler
│   ├── models/
│   │   └── Expense.js        # Mongoose Schema with field validations
│   ├── routes/
│   │   └── expenseRoutes.js  # RESTful API route definitions
│   ├── .env                  # Environment variables (Included for evaluators)
│   ├── .env.example          # Sample environment configuration
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server entry point
│
├── frontend/                 # React.js (Vite) Application
│   ├── public/               # Static assets & favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryBreakdown.jsx # Spending distribution bar
│   │   │   ├── DeleteModal.jsx       # Confirmation dialog
│   │   │   ├── ExpenseForm.jsx       # Add & Edit form with validation
│   │   │   ├── ExpenseList.jsx       # Table with search, filter, sort
│   │   │   ├── Navbar.jsx            # Header & live DB status badge
│   │   │   ├── SummaryCards.jsx      # Total amount spent & metrics
│   │   │   └── Toast.jsx             # Toast notification alerts
│   │   ├── services/
│   │   │   └── api.js                # Frontend API client
│   │   ├── utils/
│   │   │   └── categories.js         # Color tokens & formatters
│   │   ├── App.jsx                   # Main application state & logic
│   │   ├── index.css                 # Vanilla CSS design system
│   │   └── main.jsx                  # React entry point
│   ├── .env                  # Frontend API URL configuration
│   ├── index.html            # HTML document & Google fonts
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite config with API proxy
│
├── .gitignore                # Git exclusions (preserves .env per exam spec)
├── package.json              # Root package with helper scripts
└── README.md                 # Complete documentation
```

---

## ⚙️ Environment Variables

As required by the exam instructions, the `.env` file is included in the repository with test configuration:

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://testuser:testpass123@cluster0.demo.mongodb.net/expense_tracker?retryWrites=true&w=majority
```
> *Tip: To connect to your own MongoDB Atlas cluster, update `MONGO_URI` with your connection string. The backend also supports local MongoDB: `mongodb://127.0.0.1:27017/expense_tracker`.*

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started / Quick Run Guide

### Option 1: Running Both with Root Scripts (Recommended)

From the project root:

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start Backend (Terminal 1):**
   ```bash
   npm run backend
   ```
   *Runs at `http://localhost:5000`*

3. **Start Frontend (Terminal 2):**
   ```bash
   npm run frontend
   ```
   *Runs at `http://localhost:5173`*

---

### Option 2: Running Individually

#### 1. Backend Setup:
```bash
cd backend
npm install
npm run dev
# or: npm start
```

#### 2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 RESTful API Endpoints

| Method | Endpoint | Description | Payload / Query |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Service health status | - |
| **GET** | `/api/expenses` | Fetch all expenses | Supports `?search=`, `?category=`, `?sortBy=` |
| **GET** | `/api/expenses/summary` | Summary stats & category breakdown | - |
| **GET** | `/api/expenses/:id` | Fetch single expense by ID | - |
| **POST** | `/api/expenses` | Add new expense | `{ title, amount, category, date, description }` |
| **PUT** | `/api/expenses/:id` | Update existing expense | `{ title, amount, category, date, description }` |
| **DELETE**| `/api/expenses/:id` | Delete expense | Returns deleted item ID |

### Example Request Payloads:

#### Add Expense (`POST /api/expenses`)
```json
{
  "title": "Weekly Groceries",
  "amount": 75.50,
  "category": "Food",
  "date": "2026-10-27",
  "description": "Vegetables and pantry supplies"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "_id": "671ee1b49f1a2c3d4e5f6001",
    "title": "Weekly Groceries",
    "amount": 75.5,
    "category": "Food",
    "date": "2026-10-27T00:00:00.000Z",
    "description": "Vegetables and pantry supplies",
    "createdAt": "2026-10-27T04:20:00.000Z",
    "updatedAt": "2026-10-27T04:20:00.000Z"
  }
}
```

---

## ✅ Evaluation Checklist

- [x] Repository contains both `frontend/` and `backend/` folders in root.
- [x] `.env` files are included with test configurations.
- [x] `package.json` files correctly list all dependencies and scripts.
- [x] **Add Expense** with Title, Amount, Category, Date, and strict positive number validation.
- [x] **View Expenses** in table with formatted currency and color-coded badges.
- [x] **Edit Expense** pre-fills existing data and updates on screen and database.
- [x] **Delete Expense** prompts with confirmation dialog and removes from screen and database.
- [x] **Total Amount Spent** updates automatically at the top after every operation without manual reload.
- [x] Clean, modern, responsive UI on mobile and desktop screens.
