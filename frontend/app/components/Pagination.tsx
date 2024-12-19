"use client";

import { useRouter } from "next/navigation";
import { ITEMS_PER_PAGE } from "../lib/settings";

export default function Pagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={page === 1 || count === 0}
        onClick={() => changePage(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                onClick={() => changePage(pageIndex)}
                className={`px-2 rounded-md ${
                  pageIndex === page ? "bg-schoolSky" : ""
                }`}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        disabled={count === 0 || page === Math.ceil(count / ITEMS_PER_PAGE)}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
