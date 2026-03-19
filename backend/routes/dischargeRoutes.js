const express = require("express");
const router = express.Router();

const dischargeController = require("../controllers/dischargeController");

router.post("/create", dischargeController.createDischarge);

router.get("/:patient_id", dischargeController.getDischarge);

module.exports = router;