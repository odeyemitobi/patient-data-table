import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Pagination({ patientsPerPage, totalPatients, currentPage, paginate }) {
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  if (totalPages <= 1) return null;

  const getPagesToShow = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pagesToShow = getPagesToShow();
  const btnClass =
    "mx-1 w-10 h-10 rounded-full flex items-center justify-center transition-all";
  const activeClass = "bg-[#8B4513] text-white shadow-md";
  const inactiveClass =
    "bg-white text-[#8B4513] hover:bg-[#f5f5dc] shadow-sm hover:shadow";
  const disabledClass = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <motion.div
      className="flex justify-center py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center bg-white/80 py-2 px-4 rounded-full shadow-md">
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnClass} ${
            currentPage === 1 ? disabledClass : inactiveClass
          }`}
        >
          <FaChevronLeft />
        </button>

        {pagesToShow.map((num, i) => (
          <button
            key={i}
            onClick={() => typeof num === "number" && paginate(num)}
            disabled={typeof num !== "number"}
            className={`${btnClass} ${
              num === "..."
                ? "cursor-default"
                : num === currentPage
                ? activeClass
                : inactiveClass
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnClass} ${
            currentPage === totalPages ? disabledClass : inactiveClass
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  );
}

export default Pagination;
