import { useState } from "react";
import PatientTableDesktop from "./desktop";
import PatientTableMobile from "./mobile";

function PatientTable({
  patients,
  requestSort,
  sortConfig,
  onViewPatient,
  onEditPatient,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const toggleMobileRow = (id) =>
    setExpandedRow(expandedRow === id ? null : id);

  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white/70 transition-all duration-300">
      <PatientTableDesktop
        patients={patients}
        requestSort={requestSort}
        sortConfig={sortConfig}
        onViewPatient={onViewPatient}
        onEditPatient={onEditPatient}
        formatDate={formatDate}
      />

      <PatientTableMobile
        patients={patients}
        expandedRow={expandedRow}
        toggleMobileRow={toggleMobileRow}
        onViewPatient={onViewPatient}
        onEditPatient={onEditPatient}
        formatDate={formatDate}
      />
    </div>
  );
}

export default PatientTable;
