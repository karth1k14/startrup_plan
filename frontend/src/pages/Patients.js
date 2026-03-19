import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients?hospital_id=1")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Patients</h2>

      <a href="/add-patient">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          Add Patient
        </button>
      </a>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Phone</th>
          </tr>
        </thead>

        <tbody>
          {patients.length > 0 ? (
            patients.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">
                  <a
                    href={`/patient/${p.id}`}
                    className="text-blue-600 font-medium"
                  >
                    {p.name}
                  </a>
                </td>
                <td className="p-2">{p.age}</td>
                <td className="p-2">{p.gender}</td>
                <td className="p-2">{p.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center" colSpan="4">
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default Patients;