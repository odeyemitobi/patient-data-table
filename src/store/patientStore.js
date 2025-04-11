import { create } from "zustand";
import { patientData } from "../data/patients";
import { sortData, filterPatients } from "../utils/helper";

const usePatientStore = create((set, get) => ({
  patients: [],
  filteredPatients: [],
  currentPage: 1,
  searchTerm: "",
  sortConfig: {
    key: null,
    direction: "ascending",
  },
  modal: {
    view: false,
    edit: false,
    patient: null,
  },
  isLoading: true,
  expandedRow: null,

  initialize: () => {
    setTimeout(() => {
      set({
        patients: patientData,
        filteredPatients: patientData,
        isLoading: false,
      });
    }, 800);
  },

  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),

  requestSort: (key) => {
    const { sortConfig } = get();
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    set({ sortConfig: { key, direction }, currentPage: 1 });
    get().applyFiltersAndSort();
  },

  toggleMobileRow: (id) => {
    const { expandedRow } = get();
    set({ expandedRow: expandedRow === id ? null : id });
  },

  setPage: (page) => set({ currentPage: page }),

  openModal: (type, patient = null) => {
    set({
      modal: {
        view: type === "view",
        edit: type === "edit",
        patient,
      },
    });
  },

  closeModal: () => set({ modal: { view: false, edit: false, patient: null } }),

  updatePatient: (updatedPatient) => {
    const { patients } = get();
    set({
      patients: patients.map((p) =>
        p.id === updatedPatient.id ? updatedPatient : p
      ),
    });
    get().applyFiltersAndSort();
    get().closeModal();
  },

  applyFiltersAndSort: () => {
    const { patients, searchTerm, sortConfig } = get();
    let result = filterPatients(patients, searchTerm);

    if (sortConfig.key) {
      result = sortData(result, sortConfig.key, sortConfig.direction);
    }

    set({ filteredPatients: result });
  },
}));

export default usePatientStore;
