import { useState, useEffect } from 'react';
import PatientTable from './components/PatientTable';
import PatientModal from './components/PatientModal';
import { patientData } from './data/patients';
import Pagination from './components/Pagination';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    setPatients(patientData);
    setFilteredPatients(patientData);
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedPatients = [...patients];
    
    if (searchTerm) {
      sortedPatients = sortedPatients.filter(
        patient => 
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sortConfig.key) {
      sortedPatients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredPatients(sortedPatients);
    setCurrentPage(1);
  }, [patients, searchTerm, sortConfig]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewPatient = (patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(
      patients.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-6">Patient Management System</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or diagnosis..."
            className="w-full p-2 border border-[#8B4513] rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <PatientTable 
          patients={currentPatients}
          requestSort={requestSort}
          sortConfig={sortConfig}
          onViewPatient={handleViewPatient}
        />
        
        <Pagination 
          patientsPerPage={patientsPerPage}
          totalPatients={filteredPatients.length}
          currentPage={currentPage}
          paginate={paginate}
        />
        
        {isModalOpen && (
          <PatientModal
            patient={currentPatient}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdatePatient}
          />
        )}
      </div>
    </div>
  );
}

export default App;