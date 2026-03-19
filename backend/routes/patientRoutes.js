const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.post("/add", patientController.addPatient);

router.get("/", patientController.getPatients);

router.get("/:id", patientController.getPatientById);

router.put("/:id", patientController.updatePatient);

router.delete("/:id", patientController.deletePatient);

module.exports = router;