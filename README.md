# School Management API

A REST API built with **Node.js**, **Express.js**, and **MySQL** to manage school records and retrieve them sorted by proximity to the user's location.

---

## Project Structure

```
school-management/
├── config/
│   ├── db.js           # MySQL connection pool
│   └── schema.sql      # DB setup & sample data
├── controllers/
│   └── schoolController.js   # Business logic
├── middleware/
│   └── validators.js   # Input validation
├── models/
│   └── schoolModel.js  # DB query functions
├── routes/
│   └── schoolRoutes.js # Route definitions
├── utils/
│   └── distance.js     # Haversine formula
├── .env.example        # Environment variable template
├── package.json
└── server.js           # Entry point
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your MySQL credentials in .env
```

### 3. Set up MySQL database
```bash
mysql -u root -p < config/schema.sql
```

### 4. Start the server
```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

Server runs at: `http://localhost:3000`

---

## API Reference

### POST `/api/addSchool`
Add a new school to the database.

**Request Body (JSON)**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram, Haryana",
  "latitude": 28.4595,
  "longitude": 77.0266
}
```

**Success Response (201)**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Gurugram, Haryana",
    "latitude": 28.4595,
    "longitude": 77.0266
  }
}
```

**Validation Error (400)**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name is required and must be a non-empty string"]
}
```

---

### GET `/api/listSchools`
Get all schools sorted by distance from the user's location.

**Query Parameters**

| Parameter  | Type   | Required | Description              |
|------------|--------|----------|--------------------------|
| latitude   | Float  | Yes      | User's latitude (-90 to 90) |
| longitude  | Float  | Yes      | User's longitude (-180 to 180) |

**Example Request**
```
GET /api/listSchools?latitude=17.3850&longitude=78.4867
```

**Success Response (200)**
```json
{
  "success": true,
  "message": "Found 3 school(s)",
  "user_location": {
    "latitude": 17.3850,
    "longitude": 78.4867
  },
  "data": [
    {
      "id": 3,
      "name": "DAV Public School",
      "address": "Banjara Hills, Hyderabad, Telangana",
      "latitude": 17.4126,
      "longitude": 78.4480,
      "distance_km": 3.21
    },
    {
      "id": 2,
      "name": "Kendriya Vidyalaya",
      "address": "Anna Nagar, Chennai, Tamil Nadu",
      "latitude": 13.0878,
      "longitude": 80.2100,
      "distance_km": 491.83
    }
  ]
}
```

---

## Validation Rules

| Field     | Rules                                              |
|-----------|----------------------------------------------------|
| name      | Required, non-empty string, max 255 chars          |
| address   | Required, non-empty string, max 500 chars          |
| latitude  | Required, number, range: -90 to 90                 |
| longitude | Required, number, range: -180 to 180               |

---

## Distance Calculation

Uses the **Haversine formula** which accounts for Earth's curvature:

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlng/2)
c = 2 × atan2(√a, √(1−a))
d = R × c        (R = 6371 km)
```

Results are in **kilometres**, rounded to 2 decimal places.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via `mysql2` with connection pooling)
- **Distance**: Haversine formula (pure JS, no external lib)
