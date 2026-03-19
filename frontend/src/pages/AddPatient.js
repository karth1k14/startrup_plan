import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/patients/add",
        {
          ...form,
          hospital_id: 1, // temporary (will replace with JWT later)
        }
      );

      alert("Patient Added Successfully");

      window.location = "/patients";

    } catch (err) {
      console.error(err);
      alert("Error adding patient");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Add Patient</h2>

      <div className="bg-white p-6 shadow rounded w-96">

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 w-full rounded"
          onClick={addPatient}
        >
          Add Patient
        </button>
      </div>
    </Layout>
  );
}

export default AddPatient;