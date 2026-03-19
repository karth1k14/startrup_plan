import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPatient from "./pages/AddPatient";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>  

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;