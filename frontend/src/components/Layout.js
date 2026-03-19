function Layout({ children }) {

  return (

    <div className="flex">

      <div className="w-64 h-screen bg-blue-900 text-white p-5">

        <h2 className="text-xl font-bold mb-6">
          Hospital System
        </h2>

        <a href="/dashboard" className="block mb-3">
          Dashboard
        </a>

        <a href="/patients" className="block mb-3">
          Patients
        </a>

      </div>

      <div className="flex-1 p-6 bg-gray-100">

        {children}

      </div>

    </div>

  );

}

export default Layout;