const db = require("../config/db");

/* =========================
   ADD PATIENT
========================= */

exports.addPatient = (req, res) => {
  try {
    const { name, age, gender, phone, address, hospital_id } = req.body;

    if (!name || !age || !hospital_id) {
      return res.status(400).json({
        error: "Name, age and hospital_id are required",
      });
    }

    const stmt = db.prepare(`
      INSERT INTO patients
      (hospital_id, name, age, gender, phone, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      hospital_id,
      name,
      age,
      gender,
      phone,
      address
    );

    res.json({
      message: "Patient added successfully",
      patient_id: result.lastInsertRowid,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add patient" });
  }
};


/* =========================
   GET ALL PATIENTS (BY HOSPITAL)
========================= */

exports.getPatients = (req, res) => {
  try {
    const hospitalId = req.query.hospital_id;

    if (!hospitalId) {
      return res.status(400).json({
        error: "hospital_id is required",
      });
    }

    const patients = db
      .prepare("SELECT * FROM patients WHERE hospital_id = ?")
      .all(hospitalId);

    res.json(patients);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};


/* =========================
   GET SINGLE PATIENT
========================= */

exports.getPatientById = (req, res) => {
  try {
    const id = req.params.id;

    const patient = db
      .prepare("SELECT * FROM patients WHERE id = ?")
      .get(id);

    if (!patient) {
      return res.status(404).json({
        error: "Patient not found",
      });
    }

    res.json(patient);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch patient" });
  }
};


/* =========================
   UPDATE PATIENT
========================= */

exports.updatePatient = (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, gender, phone, address } = req.body;

    const stmt = db.prepare(`
      UPDATE patients
      SET name=?, age=?, gender=?, phone=?, address=?
      WHERE id=?
    `);

    stmt.run(name, age, gender, phone, address, id);

    res.json({ message: "Patient updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update patient" });
  }
};


/* =========================
   DELETE PATIENT
========================= */

exports.deletePatient = (req, res) => {
  try {
    const id = req.params.id;

    db.prepare("DELETE FROM patients WHERE id=?").run(id);

    res.json({ message: "Patient deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete patient" });
  }
};