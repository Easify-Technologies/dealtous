import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const AdminLogin = () => {
  return (
    <>
      <section className="account d-flex">
        <div className="account__left d-md-flex d-none flx-align section-bg position-relative z-index-1 overflow-hidden">
          <img
            src="../assets/images/shapes/pattern-curve-seven.png"
            alt=""
            className="position-absolute end-0 top-0 z-index--1 h-100"
          />
        </div>

        <div className="account__right padding-y-120 flx-align">
          <div className="dark-light-mode">
            <ThemeToggle />
          </div>

          <div className="account-content">
            <Link scroll={false} href="/" className="logo mb-64">
              <img
                src="../assets/images/logo/logo.png"
                alt=""
                className="white-version"
                style={{ filter: "invert(100%) hue-rotate(170deg)" }}
              />
              <img
                src="../assets/images/logo/logo.png"
                alt=""
                className="dark-version"
              />
            </Link>

            <h4 className="account-content__title mb-48 text-capitalize">
              Admin Login
            </h4>

            <form>
              <div className="row gy-4">
                {/* ================= EMAIL ================= */}
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    Email
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="common-input common-input--bg common-input--withIcon"
                      id="email"
                      name="email"
                      required
                      placeholder="infoname@mail.com"
                    />
                    <span className="input-icon">
                      <img src="../assets/images/icons/envelope-icon.svg" alt="" />
                    </span>
                  </div>
                </div>

                {/* ================= PASSWORD ================= */}
                <div className="col-12">
                  <label
                    htmlFor="password"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input common-input--bg common-input--withIcon"
                      id="password"
                      name="password"
                      required
                      placeholder="6+ characters, 1 Capital letter"
                    />
                    <span className="input-icon">
                      <img src="../assets/images/icons/lock-icon.svg" alt="" />
                    </span>
                  </div>
                </div>

                {/* ================= REMEMBER / FORGOT ================= */}
                <div className="col-12">
                  <div className="flx-between gap-1">
                    <div className="common-check my-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="keepMe"
                      />
                      <label
                        className="form-check-label mb-0 fw-400 font-14 text-body"
                        htmlFor="keepMe"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                {/* ================= SUBMIT ================= */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
