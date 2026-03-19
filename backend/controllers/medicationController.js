const db = require("../config/db");

/* ADD MEDICATION */

exports.addMedication = (req, res) => {

  const { patient_id, medication_name, dosage, frequency, stage } = req.body;

  const stmt = db.prepare(`
    INSERT INTO medications
    (patient_id, medication_name, dosage, frequency, stage)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(patient_id, medication_name, dosage, frequency, stage);

  res.json({ message: "Medication added successfully" });

};

/* GET PATIENT MEDICATIONS */

exports.getMedications = (req, res) => {

  const patient_id = req.params.patient_id;

  const meds = db.prepare(`
    SELECT * FROM medications
    WHERE patient_id = ?
  `).all(patient_id);

  res.json(meds);

};

/* UPDATE MEDICATION */

exports.updateMedication = (req, res) => {

  const id = req.params.id;

  const { medication_name, dosage, frequency, stage } = req.body;

  db.prepare(`
    UPDATE medications
    SET medication_name=?, dosage=?, frequency=?, stage=?
    WHERE id=?
  `).run(medication_name, dosage, frequency, stage, id);

  res.json({ message: "Medication updated" });

};

/* DELETE MEDICATION */

exports.deleteMedication = (req, res) => {

  const id = req.params.id;

  db.prepare("DELETE FROM medications WHERE id=?").run(id);

  res.json({ message: "Medication removed" });

};