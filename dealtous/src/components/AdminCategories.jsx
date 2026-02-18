"use client";

import Link from "next/link";
import Preloader from  "../helper/Preloader";

const AdminCategories = () => {
  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 className="mb-0">All Categories</h5>
          <Link href="/admin/add-category" className="btn btn-sm btn-main">
            Add Category
          </Link>
        </div>
        <span className="text-muted small">
          Total Categories
        </span>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Parent</th>
                <th>Icon</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
