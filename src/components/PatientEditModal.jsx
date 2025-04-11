import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaSave, FaEdit } from "react-icons/fa";
import FormField from "./FormField";
import { PATIENT_FORM_FIELDS, BUTTON_STYLES } from "../utils/helper";

function PatientEditModal({ patient, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    diagnosis: patient.diagnosis,
    admissionDate: patient.admissionDate.split("T")[0],
    notes: patient.notes || "",
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#8B4513] text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <FaEdit className="mr-2" /> Edit Patient
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {PATIENT_FORM_FIELDS.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className={`${BUTTON_STYLES.cancel} flex items-center`}
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              className={`${BUTTON_STYLES.primary} flex items-center`}
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PatientEditModal;
