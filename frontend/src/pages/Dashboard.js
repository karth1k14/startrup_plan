import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {

  const [stats,setStats] = useState(null);

  useEffect(()=>{

    axios.get("http://localhost:5000/api/dashboard/stats")
    .then(res=>{
      setStats(res.data)
    })

  },[])

  return(

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Hospital Dashboard
      </h1>

      {stats && (

        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 shadow">
            <h3 className="text-xl">Total Patients</h3>
            <p className="text-2xl">{stats.patients}</p>
          </div>

          <div className="bg-white p-4 shadow">
            <h3 className="text-xl">Medications</h3>
            <p className="text-2xl">{stats.medications}</p>
          </div>

          <div className="bg-white p-4 shadow">
            <h3 className="text-xl">Discharges</h3>
            <p className="text-2xl">{stats.discharges}</p>
          </div>

        </div>

      )}

      {stats && (

        <div>

          <h2 className="text-xl font-bold mb-2">
            Recent Patients
          </h2>

          {stats.recentPatients.map(p => (

            <div key={p.id} className="bg-white p-2 mb-2 shadow">

              {p.name} — {p.age}

            </div>

          ))}

        </div>

      )}

    </Layout>

  );

}

export default Dashboard;