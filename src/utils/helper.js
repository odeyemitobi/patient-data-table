export const formatDateShort = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDateLong = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const sortData = (data, key, direction) => {
  return [...data].sort((a, b) => {
    const order = direction === "ascending" ? 1 : -1;
    return a[key] < b[key] ? -order : a[key] > b[key] ? order : 0;
  });
};

export const filterPatients = (patients, searchTerm) => {
  return patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const PATIENTS_PER_PAGE = 5;

export const TABLE_HEADERS = [
  { key: "name", label: "Patient Name" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "admissionDate", label: "Admission Date" },
];

export const PATIENT_FORM_FIELDS = [
  {
    name: "name",
    icon: "FaUser",
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
    icon: "FaVenusMars",
    type: "select",
    options: ["", "Male", "Female", "Other"],
  },
  {
    name: "diagnosis",
    icon: "FaStethoscope",
    placeholder: "Diagnosis",
    type: "text",
  },
  {
    name: "admissionDate",
    icon: "FaCalendarAlt",
    type: "date",
  },
  {
    name: "notes",
    icon: "FaNotesMedical",
    placeholder: "Medical Notes",
    type: "textarea",
    rows: 3,
  },
];

export const BUTTON_STYLES = {
  primary:
    "text-white bg-[#8B4513] px-3 py-2 rounded-md shadow hover:bg-[#654321]",
  secondary:
    "text-white bg-[#4b7e3d] px-3 py-2 rounded-md shadow hover:bg-[#3a6230]",
  cancel:
    "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100",
};

export const INPUT_STYLE =
  "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]";
