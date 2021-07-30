import Link from "next/link";
import { PER_PAGE } from "@/config/index";
const Pagination = ({ total, page }) => {
  const totalPages = Math.ceil(total / PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < totalPages && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
