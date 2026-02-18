"use client";

import Link from "next/link";
import Preloader from "../helper/Preloader";

const PAGE_SIZE = 10;

const AdminProducts = () => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="mb-0">All Products</h5>
        <Link
          href="/admin/add-product"
          className="btn btn-sm btn-main"
        >
          Add Product
        </Link>
      </div>
      <span className="text-muted small">
        Total Products
      </span>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Image</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
