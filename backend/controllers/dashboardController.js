const db = require("../config/db");

exports.getStats = (req, res) => {

  const totalPatients = db
    .prepare("SELECT COUNT(*) as count FROM patients")
    .get();

  const totalMedications = db
    .prepare("SELECT COUNT(*) as count FROM medications")
    .get();

  const totalDischarges = db
    .prepare("SELECT COUNT(*) as count FROM discharge")
    .get();

  const recentPatients = db
    .prepare("SELECT * FROM patients ORDER BY id DESC LIMIT 5")
    .all();

  res.json({
    patients: totalPatients.count,
    medications: totalMedications.count,
    discharges: totalDischarges.count,
    recentPatients
  });

};