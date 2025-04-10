import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { patientData } from "./data/patients";
import PatientTable from "./components/PatientTable";
import PatientViewModal from "./components/PatientViewModal";
import PatientEditModal from "./components/PatientEditModal";
import Pagination from "./components/Pagination";

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [modal, setModal] = useState({
    view: false,
    edit: false,
    patient: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const patientsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setPatients(patientData);
      setFilteredPatients(patientData);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = [...patients].filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        const order = sortConfig.direction === "ascending" ? 1 : -1;
        return a[sortConfig.key] < b[sortConfig.key]
          ? -order
          : a[sortConfig.key] > b[sortConfig.key]
          ? order
          : 0;
      });
    }

    setFilteredPatients(result);
    setCurrentPage(1);
  }, [patients, searchTerm, sortConfig]);

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const handleModal = (type, patient = null) =>
    setModal({ view: type === "view", edit: type === "edit", patient });

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    handleModal("");
  };

  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5dc] to-[#ebe6d0] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-2 text-center tracking-tight">
          Patient Management System
        </h1>

        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B4513]" />
          <input
            type="text"
            placeholder="Search by name or diagnosis..."
            className="w-full p-3 pl-10 border-2 border-[#8B4513] rounded-lg bg-white/80 shadow-md focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
          </div>
        ) : (
          <>
            <PatientTable
              patients={currentPatients}
              requestSort={requestSort}
              sortConfig={sortConfig}
              onViewPatient={(p) => handleModal("view", p)}
              onEditPatient={(p) => handleModal("edit", p)}
            />
            <Pagination
              patientsPerPage={patientsPerPage}
              totalPatients={filteredPatients.length}
              currentPage={currentPage}
              paginate={setCurrentPage}
            />
          </>
        )}

        {modal.view && (
          <PatientViewModal
            patient={modal.patient}
            onClose={() => handleModal("")}
          />
        )}
        {modal.edit && (
          <PatientEditModal
            patient={modal.patient}
            onClose={() => handleModal("")}
            onUpdate={handleUpdatePatient}
          />
        )}
      </div>
    </div>
  );
}

export default App;
