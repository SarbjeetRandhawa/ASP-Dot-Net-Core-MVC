import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {

  const getPages = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 ">

      {/* Prev Button */}
      <button
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-lg border transition ${
              page === p
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() =>
          setPage(prev => Math.min(prev + 1, totalPages))
        }
        disabled={page === totalPages}
        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;