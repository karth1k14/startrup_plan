const express = require("express");
const cors = require("cors");

require("./config/initDB");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("Hospital API Running");
});

app.use("/reports", express.static("reports"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const medicationRoutes = require("./routes/medicationRoutes");

const dischargeRoutes = require("./routes/dischargeRoutes");

app.use("/api/discharge", dischargeRoutes);
app.use("/api/medications", medicationRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

