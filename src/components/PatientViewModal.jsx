import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaStethoscope,
  FaNotesMedical,
  FaInfoCircle,
  FaBirthdayCake,
} from "react-icons/fa";

function PatientViewModal({ patient, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const infoItems = [
    { icon: FaBirthdayCake, label: "Age", value: `${patient.age} years` },
    { icon: FaVenusMars, label: "Gender", value: patient.gender },
    { icon: FaStethoscope, label: "Diagnosis", value: patient.diagnosis },
    {
      icon: FaCalendarAlt,
      label: "Admission Date",
      value: formatDate(patient.admissionDate),
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#4b7e3d] text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <FaInfoCircle className="mr-2" /> Patient Information
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto bg-[#f5f5dc] rounded-full flex items-center justify-center mb-3">
              <FaUser className="text-[#8B4513]" size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#4b7e3d]">{patient.name}</h3>
          </div>

          <div className="space-y-4">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center p-3 bg-[#f5f5dc] rounded-lg"
              >
                <Icon className="text-[#8B4513] mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            ))}
            {patient.notes && (
              <div className="p-3 bg-[#f5f5dc] rounded-lg">
                <div className="flex items-center mb-2">
                  <FaNotesMedical className="text-[#8B4513] mr-2" size={20} />
                  <p className="text-sm text-gray-500">Medical Notes</p>
                </div>
                <p className="text-sm">{patient.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4b7e3d] text-white rounded-lg hover:bg-[#3a6230] flex items-center"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PatientViewModal;
