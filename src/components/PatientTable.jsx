import { useState } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function PatientTable({
  patients,
  requestSort,
  sortConfig,
  onViewPatient,
  onEditPatient,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const getSortIcon = (name) =>
    sortConfig.key === name ? (
      sortConfig.direction === "ascending" ? (
        <FaSortUp className="ml-1 text-[#8B4513]" />
      ) : (
        <FaSortDown className="ml-1 text-[#8B4513]" />
      )
    ) : (
      <FaSort className="ml-1 text-gray-400" />
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const toggleMobileRow = (id) =>
    setExpandedRow(expandedRow === id ? null : id);

  const headers = [
    { key: "name", label: "Patient Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "admissionDate", label: "Admission Date" },
  ];

  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white/70 transition-all duration-300">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#8B4513] text-white">
            <tr>
              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-[#7a3b10]"
                  onClick={() => requestSort(key)}
                >
                  <div className="flex items-center">
                    {label}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((p, i) => (
              <motion.tr
                key={p.id}
                className="hover:bg-[#f5f5dc]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <td className="px-6 py-4 text-sm font-medium">{p.name}</td>
                <td className="px-6 py-4 text-sm">{p.age}</td>
                <td className="px-6 py-4 text-sm">{p.gender}</td>
                <td className="px-6 py-4 text-sm">{p.diagnosis}</td>
                <td className="px-6 py-4 text-sm">
                  {formatDate(p.admissionDate)}
                </td>
                <td className="px-6 py-4 text-sm flex space-x-2">
                  <button
                    onClick={() => onViewPatient(p)}
                    className="flex items-center text-white bg-[#4b7e3d] px-3 py-2 rounded-md shadow"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                  <button
                    onClick={() => onEditPatient(p)}
                    className="flex items-center text-white bg-[#8B4513] px-3 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {patients.map((p, i) => (
          <motion.div
            key={p.id}
            className="bg-white rounded-lg shadow-md border border-[#d4c9a8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div
              className="px-4 py-3 bg-[#f5f5dc] flex justify-between items-center cursor-pointer"
              onClick={() => toggleMobileRow(p.id)}
            >
              <h3 className="font-medium text-[#8B4513]">{p.name}</h3>
              <motion.div animate={{ rotate: expandedRow === p.id ? 180 : 0 }}>
                {expandedRow === p.id ? (
                  <FaChevronUp className="text-[#8B4513]" />
                ) : (
                  <FaChevronDown className="text-[#8B4513]" />
                )}
              </motion.div>
            </div>
            <AnimatePresence>
              {expandedRow === p.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-3 space-y-2"
                >
                  {Object.entries({
                    Age: p.age,
                    Gender: p.gender,
                    Diagnosis: p.diagnosis,
                    Admission: formatDate(p.admissionDate),
                  }).map(([key, value]) => (
                    <p key={key}>
                      <span className="font-medium text-[#8B4513]">{key}:</span>{" "}
                      {value}
                    </p>
                  ))}
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewPatient(p);
                      }}
                      className="flex-1 flex items-center justify-center text-white bg-[#4b7e3d] px-3 py-2 rounded-md shadow"
                    >
                      <FaEye className="mr-2" />
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPatient(p);
                      }}
                      className="flex-1 flex items-center justify-center text-white bg-[#8B4513] px-3 py-2 rounded-md shadow"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PatientTable;
