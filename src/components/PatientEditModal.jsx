import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaSave,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaStethoscope,
  FaNotesMedical,
  FaEdit,
} from "react-icons/fa";

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

  const inputClass =
    "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]";

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
            {[
              {
                name: "name",
                Icon: FaUser,
                placeholder: "Full Name",
                type: "text",
              },
              {
                name: "age",
                placeholder: "Age",
                type: "number",
                props: { min: 0, max: 120 },
              },
              {
                name: "gender",
                Icon: FaVenusMars,
                type: "select",
                options: ["", "Male", "Female", "Other"],
              },
              {
                name: "diagnosis",
                Icon: FaStethoscope,
                placeholder: "Diagnosis",
                type: "text",
              },
              { name: "admissionDate", Icon: FaCalendarAlt, type: "date" },
              {
                name: "notes",
                Icon: FaNotesMedical,
                placeholder: "Medical Notes",
                type: "textarea",
                rows: 3,
              },
            ].map(({ name, Icon, placeholder, type, options, props, rows }) => (
              <div key={name} className="relative">
                {Icon && (
                  <Icon className="absolute top-3 left-3 text-[#8B4513]" />
                )}
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    rows={rows}
                    placeholder={placeholder}
                    className={inputClass}
                  />
                ) : type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt || "Gender"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    type={type}
                    placeholder={placeholder}
                    className={inputClass}
                    required
                    {...props}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#654321] flex items-center"
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
