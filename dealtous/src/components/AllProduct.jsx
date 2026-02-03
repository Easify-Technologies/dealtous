"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

const products = [
  {
    id: Math.floor(Math.random() * 100000).toString(),
    name: "Movies Hub",
    language: "English",
    subscribers: "5,00,000",
    averageViews: "1,00,000",
    engagementRate: "61",
    price: "12,000",
    image: "assets/images/consoler.png",
  },
  {
    id: Math.floor(Math.random() * 100000).toString(),
    name: "Benditas Altcoins Test 1",
    language: "English",
    subscribers: "8,654",
    averageViews: "30,000",
    engagementRate: "43",
    price: "60,000",
    image: "assets/images/cropped-BENDITAS-ALTCOINS.jpg",
  },
  {
    id: Math.floor(Math.random() * 100000).toString(),
    name: "Weex Partner Insights",
    language: "English",
    subscribers: "30,000",
    averageViews: "30,000",
    engagementRate: "40",
    price: "890",
    image: "assets/images/gaming.jpg",
  },
  {
    id: Math.floor(Math.random() * 100000).toString(),
    name: "Curso De Dibujo Manga",
    language: "English",
    subscribers: "3,00,000",
    averageViews: "30,000",
    engagementRate: "70",
    price: "150",
    image: "assets/images/hq720-1024x576.jpg",
  },
];

const AllProduct = () => {
  const [activeButton, setActiveButton] = useState("grid-view");
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState({
    name: "",
    price: "",
  });

  const { name, price } = filteredData;

  const deferredName = useDeferredValue(name);
  const deferredPrice = useDeferredValue(price);

  const normalizePrice = (value) => Number(value.replace(/,/g, ""));

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesName =
        deferredName === "" ||
        item.name.toLowerCase().includes(deferredName.toLowerCase());

      const matchesPrice =
        deferredPrice === "" ||
        normalizePrice(item.price) <= normalizePrice(deferredPrice);

      return matchesName && matchesPrice;
    });
  }, [products, deferredName, deferredPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilteredData({ ...filteredData, [name]: value });
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  return (
    <section
      className={`all-product padding-y-120 ${
        activeButton === "list-view" ? "list-view" : ""
      }`}
    >
      <div className="container container-two">
        <div className="row">
          <div className="col-lg-12">
            <div className="filter-tab gap-3 flx-between">
              <button
                type="button"
                className="filter-tab__button btn btn-outline-light pill d-flex align-items-center"
              >
                <span className="icon icon-left">
                  <img src="assets/images/icons/filter.svg" alt="" />
                </span>
                <span className="font-18 fw-500">Filters</span>
              </button>
              <ul
                className="nav common-tab nav-pills mb-0 gap-lg-2 gap-1 ms-lg-auto"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-product-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-product"
                    type="button"
                    role="tab"
                    aria-controls="pills-product"
                    aria-selected="true"
                  >
                    All Item
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-bestRating-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bestRating"
                    type="button"
                    role="tab"
                    aria-controls="pills-bestRating"
                    aria-selected="false"
                  >
                    Best Rating
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-bestOffers-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bestOffers"
                    type="button"
                    role="tab"
                    aria-controls="pills-bestOffers"
                    aria-selected="false"
                  >
                    Best Offers
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-bestSelling-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bestSelling"
                    type="button"
                    role="tab"
                    aria-controls="pills-bestSelling"
                    aria-selected="false"
                  >
                    Best Selling
                  </button>
                </li>
              </ul>
              <div className="list-grid d-flex align-items-center gap-2">
                <button
                  className={`list-grid__button list-button d-sm-flex d-none text-body ${
                    activeButton === "list-view" ? "active" : ""
                  }`}
                  onClick={() => handleClick("list-view")}
                >
                  <i className="las la-list" />
                </button>
                <button
                  className={`list-grid__button grid-button d-sm-flex d-none  text-body ${
                    activeButton === "grid-view" ? "active" : ""
                  }`}
                  onClick={() => handleClick("grid-view")}
                >
                  <i className="las la-border-all" />
                </button>
                <button
                  className="list-grid__button sidebar-btn text-body d-lg-none d-flex"
                  onClick={handleFilter}
                >
                  <i className="las la-bars" />
                </button>
              </div>
            </div>
            <form action="#" className="filter-form pb-4 d-block">
              <div className="row gy-3">
                <div className="col-sm-4 col-xs-6">
                  <div className="flx-between gap-1">
                    <label htmlFor="name" className="form-label font-16">
                      Name
                    </label>
                  </div>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="common-input border-gray-five common-input--withLeftIcon"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Search By Name..."
                    />
                    <span className="input-icon input-icon--left">
                      <img src="assets/images/icons/search-two.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-sm-4 col-xs-6">
                  <div className="flx-between gap-1">
                    <label htmlFor="Price" className="form-label font-16">
                      Price
                    </label>
                  </div>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="common-input border-gray-five"
                      id="price"
                      name="price"
                      value={price}
                      onChange={handleInputChange}
                      placeholder="$7 - $29"
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="flx-between gap-1">
                    <label htmlFor="time" className="form-label font-16">
                      Time Frame
                    </label>
                  </div>
                  <div className="position-relative select-has-icon">
                    <select
                      id="time"
                      className="common-input border-gray-five"
                      defaultValue={1}
                    >
                      <option value={1}>Now</option>
                      <option value={2}>Yesterday</option>
                      <option value={2}>1 Month Ago</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xl-3 col-lg-4">
            {/* ===================== Filter Sidebar Start ============================= */}
            <div className={`filter-sidebar ${filter && "show"}`}>
              <button
                type="button"
                className="filter-sidebar__close p-2 position-absolute end-0 top-0 z-index-1 text-body hover-text-main font-20 d-lg-none d-block"
                onClick={handleFilter}
              >
                <i className="las la-times" />
              </button>
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  Category
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        All Categories
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Amazon Seller
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Ebay
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Etsy
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Featured
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Shopify
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Website
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        WooCommerce
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Telegram
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Walmart Seller
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        YouTube
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Spotify
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        Technology
                      </Link>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <Link
                        scroll={false}
                        href="#"
                        className="filter-sidebar-list__text"
                      >
                        TikTok
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  Rating
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="veiwAll"
                          />
                          <label className="form-check-label" htmlFor="veiwAll">
                            View All
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="oneStar"
                          />
                          <label className="form-check-label" htmlFor="oneStar">
                            1 Star and above
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="twoStar"
                          />
                          <label className="form-check-label" htmlFor="twoStar">
                            2 Star and above
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="threeStar"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="threeStar"
                          >
                            3 Star and above
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="fourStar"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="fourStar"
                          >
                            4 Star and above
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="fiveStar"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="fiveStar"
                          >
                            5 Star Rating
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  Languages
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="anyDate"
                          />
                          <label className="form-check-label" htmlFor="anyDate">
                            English (11)
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="lastYear"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="lastYear"
                          >
                            Hindi (10)
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="lastMonth"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="lastMonth"
                          >
                            Russian (10)
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="LastWeek"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="LastWeek"
                          >
                            Spanish (16)
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="lastDay"
                          />
                          <label className="form-check-label" htmlFor="lastDay">
                            Turkish (10)
                          </label>
                        </div>
                      </div>
                    </li>
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check common-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radio"
                            id="other"
                          />
                          <label className="form-check-label" htmlFor="other">
                            Other (1)
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* ===================== Filter Sidebar End ============================= */}
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-product"
                role="tabpanel"
                aria-labelledby="pills-product-tab"
                tabIndex={0}
              >
                <div className="row gy-4 list-grid-wrapper">
                  {filteredProducts.map((item) => (
                    <div key={item.id} className="col-xl-4 col-sm-6">
                      <div className="product-item section-bg">
                        <div className="product-item__thumb d-flex">
                          <Link
                            scroll={false}
                            href="/product-details"
                            className="link w-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cover-img"
                            />
                          </Link>
                          <button
                            type="button"
                            className="product-item__wishlist"
                          >
                            <i className="fas fa-heart" />
                          </button>
                        </div>
                        <div className="product-item__content">
                          <h6 className="product-item__title">
                            <Link
                              scroll={false}
                              href="/product-details"
                              className="link"
                            >
                              {item.name}
                            </Link>
                          </h6>
                          <div className="product-item__info flx-between gap-2">
                            <span className="product-item__author">
                              Language: {item.language}
                            </span>
                            <span className="product-item__author">
                              Subscribers: {item.subscribers}
                            </span>
                            <span className="product-item__author">
                              Average Views: {item.averageViews}
                            </span>
                            <span className="product-item__author">
                              Engagement Rate : {item.engagementRate}%
                            </span>
                            <div className="flx-align gap-2">
                              <h6 className="product-item__price mb-0">
                                ${item.price}
                              </h6>
                            </div>
                          </div>
                          <div className="product-item__bottom flx-between gap-2">
                            <Link
                              scroll={false}
                              href="/product-details"
                              className="btn btn-outline-light btn-sm pill"
                            >
                              Quick View
                            </Link>
                            <Link
                              scroll={false}
                              href="/product-details"
                              className="btn btn-outline-light btn-sm pill"
                            >
                              Start Purchase
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Start */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination common-pagination">
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        4
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        5
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        scroll={false}
                        className="page-link flx-align gap-2 flex-nowrap"
                        href="#"
                      >
                        Next
                        <span className="icon line-height-1 font-20">
                          <i className="las la-arrow-right" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                {/* Pagination End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
