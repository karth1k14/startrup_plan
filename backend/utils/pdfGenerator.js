const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateDischargePDF(patient, discharge, medications, filePath) {

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Hospital Discharge Summary", { align: "center" });

  doc.moveDown();

  doc.fontSize(14).text(`Patient Name: ${patient.name}`);
  doc.text(`Age: ${patient.age}`);
  doc.text(`Gender: ${patient.gender}`);
  doc.text(`Phone: ${patient.phone}`);

  doc.moveDown();

  doc.text(`Diagnosis: ${discharge.diagnosis}`);
  doc.text(`Treatment: ${discharge.treatment}`);

  doc.moveDown();

  doc.text("Medications:");

  medications.forEach((med) => {
    doc.text(
      `${med.medication_name} - ${med.dosage} - ${med.frequency} (${med.stage})`
    );
  });

  doc.moveDown();

  doc.text(`Doctor Notes: ${discharge.doctor_notes}`);

  doc.moveDown();

  doc.text(`Discharge Date: ${discharge.discharge_date}`);

  doc.end();
}

module.exports = generateDischargePDF;