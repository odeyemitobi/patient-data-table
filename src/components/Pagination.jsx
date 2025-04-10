function Pagination({ patientsPerPage, totalPatients, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) return null;

  return (
    <div className="flex justify-center py-6">
      <ul className="flex flex-wrap space-x-1">
        <li
          className={`mx-1 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded bg-white hover:bg-[#f5f5dc] text-[#8B4513] transition"
          >
            Prev
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 border rounded transition ${
                currentPage === number
                  ? "bg-[#8B4513] text-white"
                  : "bg-white text-[#8B4513] hover:bg-[#f5f5dc]"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        <li
          className={`mx-1 ${
            currentPage === pageNumbers.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <button
            onClick={() =>
              currentPage < pageNumbers.length && paginate(currentPage + 1)
            }
            disabled={currentPage === pageNumbers.length}
            className="px-3 py-2 border rounded bg-white hover:bg-[#f5f5dc] text-[#8B4513] transition"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
