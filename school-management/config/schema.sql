-- Run this in your PostgreSQL client (psql or pgAdmin)

-- Create database (run this separately if needed)
-- CREATE DATABASE school_management;

-- Connect to the database then run below
CREATE TABLE IF NOT EXISTS schools (
  id         SERIAL        PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  address    VARCHAR(500)  NOT NULL,
  latitude   FLOAT         NOT NULL,
  longitude  FLOAT         NOT NULL,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional, for testing)
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',   'Sector 45, Gurugram, Haryana',          28.4595, 77.0266),
  ('Kendriya Vidyalaya',    'Anna Nagar, Chennai, Tamil Nadu',        13.0878, 80.2100),
  ('DAV Public School',     'Banjara Hills, Hyderabad, Telangana',    17.4126, 78.4480),
  ('St. Xavier''s School',  'Park Street, Kolkata, West Bengal',      22.5524, 88.3514),
  ('Ryan International',    'Whitefield, Bangalore, Karnataka',       12.9698, 77.7499);
