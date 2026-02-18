"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

const PAGE_SIZE = 9;

const AllProduct = () => {
  const [activeButton, setActiveButton] = useState("grid-view");
  const [filterSidebar, setFilterSidebar] = useState(false);
  const [page, setPage] = useState(0);

  return (
    <section
      className={`all-product padding-y-120 ${
        activeButton === "list-view" ? "list-view" : ""
      }`}
    >
      <div className="container container-two">
        <div className="row">
          {/* ================= TOP FILTER BAR ================= */}
          <div className="col-lg-12">
            <div className="filter-tab gap-3 flx-between">
              <button
                type="button"
                className="filter-tab__button btn btn-outline-light pill d-flex align-items-center"
                onClick={() => setFilterSidebar(true)}
              >
                <span className="icon icon-left">
                  <img src="assets/images/icons/filter.svg" alt="" />
                </span>
                <span className="font-18 fw-500">Filters</span>
              </button>

              <ul className="nav common-tab nav-pills mb-0 gap-lg-2 gap-1 ms-lg-auto">
                <li className="nav-item">
                  <button className="nav-link active">All Item</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Best Rating</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Best Offers</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Best Selling</button>
                </li>
              </ul>

              <div className="list-grid d-flex align-items-center gap-2">
                <button
                  className={`list-grid__button list-button d-sm-flex d-none ${
                    activeButton === "list-view" ? "active" : ""
                  }`}
                  onClick={() => setActiveButton("list-view")}
                >
                  <i className="las la-list" />
                </button>
                <button
                  className={`list-grid__button grid-button d-sm-flex d-none ${
                    activeButton === "grid-view" ? "active" : ""
                  }`}
                  onClick={() => setActiveButton("grid-view")}
                >
                  <i className="las la-border-all" />
                </button>
              </div>
            </div>

            {/* ================= FILTER FORM ================= */}
            <form className="filter-form pb-4 d-block">
              <div className="row gy-3">
                <div className="col-sm-4">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="common-input"
                    placeholder="Search by name"
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label">Max Price</label>
                  <input
                    type="text"
                    name="price"
                    className="common-input"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="col-xl-3 col-lg-4">
            <div className={`filter-sidebar ${filterSidebar ? "show" : ""}`}>
              <button
                className="filter-sidebar__close d-lg-none"
                onClick={() => setFilterSidebar(false)}
              >
                ✕
              </button>

              <div className="filter-sidebar__item">
                <h6>Categories</h6>
                <ul className="filter-sidebar-list">
                  <li>
                    <button
                      className="text-black-three"
                    >
                      All Categories
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          <div className="col-xl-9 col-lg-8">
            <div className="row gy-4 list-grid-wrapper">
            </div>

            {/* ================= PAGINATION ================= */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
