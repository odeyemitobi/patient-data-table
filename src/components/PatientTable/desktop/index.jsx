import { motion } from "framer-motion";
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit } from "react-icons/fa";

function PatientTableDesktop({
  patients,
  requestSort,
  sortConfig,
  onViewPatient,
  onEditPatient,
  formatDate,
}) {
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

  const headers = [
    { key: "name", label: "Patient Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "admissionDate", label: "Admission Date" },
  ];

  return (
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
  );
}

export default PatientTableDesktop;
