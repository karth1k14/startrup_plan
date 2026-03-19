const db = require("../config/db");
const generatePDF = require("../utils/pdfGenerator");
const path = require("path");
/* CREATE DISCHARGE SUMMARY */

exports.createDischarge = (req, res) => {

  const { patient_id, diagnosis, treatment, doctor_notes } = req.body;

  const stmt = db.prepare(`
    INSERT INTO discharge
    (patient_id, diagnosis, treatment, doctor_notes)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(patient_id, diagnosis, treatment, doctor_notes);

  const discharge = db.prepare(`
    SELECT * FROM discharge WHERE id=?
  `).get(result.lastInsertRowid);

  const patient = db.prepare(`
    SELECT * FROM patients WHERE id=?
  `).get(patient_id);

  if (!patient) {
    return res.status(404).json({
      error: "Patient not found. Please create patient first."
    });
  }

  const medications = db.prepare(`
    SELECT * FROM medications WHERE patient_id=?
  `).all(patient_id);

  const filePath = `reports/discharge_${patient_id}.pdf`;

  generatePDF(patient, discharge, medications, filePath);

  res.json({
    message: "Discharge created and PDF generated"
  });

};


/* GET DISCHARGE DETAILS */

exports.getDischarge = (req, res) => {

  const patient_id = req.params.patient_id;

  const discharge = db.prepare(`
    SELECT * FROM discharge
    WHERE patient_id = ?
  `).get(patient_id);

  res.json(discharge);

};