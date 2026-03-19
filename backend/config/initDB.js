const db = require("./db");

/* =========================
   HOSPITALS TABLE
========================= */

db.prepare(`
CREATE TABLE IF NOT EXISTS hospitals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT
)
`).run();


/* =========================
   USERS TABLE
========================= */

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hospital_id INTEGER,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
)
`).run();


/* =========================
   PATIENTS TABLE
========================= */

db.prepare(`
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hospital_id INTEGER,
  name TEXT,
  age INTEGER,
  gender TEXT,
  phone TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();


/* =========================
   MEDICATIONS TABLE
========================= */

db.prepare(`
CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  medication_name TEXT,
  dosage TEXT,
  frequency TEXT,
  stage TEXT
)
`).run();


/* =========================
   DISCHARGE TABLE
========================= */

db.prepare(`
CREATE TABLE IF NOT EXISTS discharge (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  diagnosis TEXT,
  treatment TEXT,
  doctor_notes TEXT,
  discharge_date DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();


console.log("Database initialized successfully");