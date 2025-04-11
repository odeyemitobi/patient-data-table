import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PatientTable from "./components/PatientTable";
import PatientViewModal from "./components/PatientViewModal";
import PatientEditModal from "./components/PatientEditModal";
import Pagination from "./components/Pagination";
import usePatientStore from "./store/patientStore";
import { PATIENTS_PER_PAGE } from "./utils/helper";

function App() {
  const {
    filteredPatients,
    currentPage,
    searchTerm,
    sortConfig,
    modal,
    isLoading,
    initialize,
    setSearchTerm,
    requestSort,
    openModal,
    closeModal,
    updatePatient,
    setPage,
  } = usePatientStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const indexOfLastPatient = currentPage * PATIENTS_PER_PAGE;
  const indexOfFirstPatient = indexOfLastPatient - PATIENTS_PER_PAGE;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
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
              onViewPatient={(p) => openModal("view", p)}
              onEditPatient={(p) => openModal("edit", p)}
            />
            <Pagination
              patientsPerPage={PATIENTS_PER_PAGE}
              totalPatients={filteredPatients.length}
              currentPage={currentPage}
              paginate={setPage}
            />
          </>
        )}

        {modal.view && (
          <PatientViewModal patient={modal.patient} onClose={closeModal} />
        )}
        {modal.edit && (
          <PatientEditModal
            patient={modal.patient}
            onClose={closeModal}
            onUpdate={updatePatient}
          />
        )}
      </div>
    </div>
  );
}

export default App;
