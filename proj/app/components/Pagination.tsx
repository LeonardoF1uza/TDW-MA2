// src/components/Pagination.tsx
import type { Dispatch, SetStateAction } from "react";

export default function Pagination({
  page,
  setPage,
  total,
  perPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
  perPage: number;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded">Prev</button>
      <div> {page} / {totalPages} </div>
      <button onClick={() => setPage(Math.min(totalPages, page + 1))} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
