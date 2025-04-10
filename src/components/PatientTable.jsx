import { useState } from "react";

function PatientTable({ patients, requestSort, sortConfig, onViewPatient }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleMobileRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#8B4513] text-white">
              <th
                className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Patient Name{" "}
                {getClassNamesFor("name") === "ascending"
                  ? "↑"
                  : getClassNamesFor("name") === "descending"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                onClick={() => requestSort("age")}
              >
                Age{" "}
                {getClassNamesFor("age") === "ascending"
                  ? "↑"
                  : getClassNamesFor("age") === "descending"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                onClick={() => requestSort("gender")}
              >
                Gender{" "}
                {getClassNamesFor("gender") === "ascending"
                  ? "↑"
                  : getClassNamesFor("gender") === "descending"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                onClick={() => requestSort("diagnosis")}
              >
                Diagnosis{" "}
                {getClassNamesFor("diagnosis") === "ascending"
                  ? "↑"
                  : getClassNamesFor("diagnosis") === "descending"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                onClick={() => requestSort("admissionDate")}
              >
                Admission Date{" "}
                {getClassNamesFor("admissionDate") === "ascending"
                  ? "↑"
                  : getClassNamesFor("admissionDate") === "descending"
                  ? "↓"
                  : ""}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-[#f5f5dc]">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.diagnosis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(patient.admissionDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onViewPatient(patient)}
                    className="text-white bg-[#8B4513] hover:bg-[#654321] px-3 py-1 rounded transition"
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white mb-4 rounded-lg shadow overflow-hidden"
          >
            <div
              className="px-4 py-3 bg-[#f5f5dc] flex justify-between items-center cursor-pointer"
              onClick={() => toggleMobileRow(patient.id)}
            >
              <h3 className="font-medium text-[#8B4513]">{patient.name}</h3>
              <span className="text-[#8B4513]">
                {expandedRow === patient.id ? "▲" : "▼"}
              </span>
            </div>

            <div
              className={`px-4 py-2 ${
                expandedRow === patient.id ? "block" : "hidden"
              }`}
            >
              <p className="py-1">
                <span className="font-medium">Age:</span> {patient.age}
              </p>
              <p className="py-1">
                <span className="font-medium">Gender:</span> {patient.gender}
              </p>
              <p className="py-1">
                <span className="font-medium">Diagnosis:</span>{" "}
                {patient.diagnosis}
              </p>
              <p className="py-1">
                <span className="font-medium">Admission:</span>{" "}
                {formatDate(patient.admissionDate)}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPatient(patient);
                }}
                className="mt-2 text-white bg-[#8B4513] hover:bg-[#654321] px-3 py-1 rounded transition w-full"
              >
                View/Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientTable;
