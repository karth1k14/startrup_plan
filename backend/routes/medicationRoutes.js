const express = require("express");
const router = express.Router();

const medicationController = require("../controllers/medicationController");

router.post("/add", medicationController.addMedication);

router.get("/:patient_id", medicationController.getMedications);

router.put("/:id", medicationController.updateMedication);

router.delete("/:id", medicationController.deleteMedication);

module.exports = router;