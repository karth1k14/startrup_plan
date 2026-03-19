import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

function PatientDetails() {

  const { id } = useParams();

  const [patient,setPatient] = useState(null);
  const [medications,setMedications] = useState([]);

  const [medName,setMedName] = useState("");
  const [dosage,setDosage] = useState("");
  const [stage,setStage] = useState("admission");

  const [diagnosis,setDiagnosis] = useState("");
  const [treatment,setTreatment] = useState("");
  const [notes,setNotes] = useState("");

  useEffect(()=>{

    axios.get(`http://localhost:5000/api/patients/${id}`)
    .then(res=>{
      setPatient(res.data)
    })

    axios.get(`http://localhost:5000/api/medications/${id}`)
    .then(res=>{
      setMedications(res.data)
    })

  },[id])


  const addMedication = async () => {

    await axios.post(
      "http://localhost:5000/api/medications/add",
      {
        patient_id:id,
        medication_name:medName,
        dosage:dosage,
        frequency:"daily",
        stage:stage
      }
    );

    alert("Medication Added");

    window.location.reload();

  }


  const generateDischarge = async () => {

    await axios.post(
      "http://localhost:5000/api/discharge/create",
      {
        patient_id:id,
        diagnosis,
        treatment,
        doctor_notes:notes
      }
    );

    alert("Discharge Generated");

    window.open(
      `http://localhost:5000/reports/discharge_${id}.pdf`
    );

  }


  return(

    <Layout>

      {patient && (

        <div>

          <h2 className="text-2xl font-bold mb-2">
            {patient.name}
          </h2>

          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>Phone: {patient.phone}</p>

        </div>

      )}

      <h3 className="text-xl mt-6 mb-2">
        Medications
      </h3>

      {medications.map(m => (

        <div key={m.id} className="border p-2 mb-2 bg-white">

          {m.medication_name} - {m.dosage}

          <br/>

          Stage: {m.stage}

        </div>

      ))}


      <h3 className="text-xl mt-6 mb-2">
        Add Medication
      </h3>

      <input
      placeholder="Medicine Name"
      className="border p-2 mr-2"
      onChange={(e)=>setMedName(e.target.value)}
      />

      <input
      placeholder="Dosage"
      className="border p-2 mr-2"
      onChange={(e)=>setDosage(e.target.value)}
      />

      <select
      className="border p-2 mr-2"
      onChange={(e)=>setStage(e.target.value)}
      >

        <option value="admission">
          Admission
        </option>

        <option value="inpatient">
          Inpatient
        </option>

        <option value="discharge">
          Discharge
        </option>

      </select>

      <button
      className="bg-green-600 text-white px-4 py-2"
      onClick={addMedication}
      >

        Add

      </button>


      <h3 className="text-xl mt-8 mb-2">
        Generate Discharge Summary
      </h3>

      <input
      placeholder="Diagnosis"
      className="border p-2 mr-2"
      onChange={(e)=>setDiagnosis(e.target.value)}
      />

      <input
      placeholder="Treatment"
      className="border p-2 mr-2"
      onChange={(e)=>setTreatment(e.target.value)}
      />

      <input
      placeholder="Doctor Notes"
      className="border p-2 mr-2"
      onChange={(e)=>setNotes(e.target.value)}
      />

      <button
      className="bg-red-600 text-white px-4 py-2"
      onClick={generateDischarge}
      >

        Generate Discharge

      </button>


    </Layout>

  )

}

export default PatientDetails