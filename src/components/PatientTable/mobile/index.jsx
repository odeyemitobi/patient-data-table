import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaEye, FaEdit } from "react-icons/fa";

function PatientTableMobile({
  patients,
  expandedRow,
  toggleMobileRow,
  onViewPatient,
  onEditPatient,
  formatDate,
}) {
  return (
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
  );
}

export default PatientTableMobile;
