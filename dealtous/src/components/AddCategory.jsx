"use client";

import React, { useState } from "react";
import Link from "next/link";

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/queries";

import ThemeToggle from "@/components/ThemeToggle";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      icon
      parent {
        id
      }
      langs {
        code
        name
        summary
        isPrimary
      }
    }
  }
`;

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    icon: "",
    parentId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: categoryData } = useQuery(GET_CATEGORIES);

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
    onCompleted: () => {
      setSuccessMessage("Category created successfully");
      setFormData({
        name: "",
        summary: "",
        icon: "",
        parentId: "",
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");

    createCategory({
      variables: {
        input: {
          icon: formData.icon || null,
          parentId: formData.parentId || null,
          langs: [
            {
              code: "en",
              name: formData.name,
              summary: formData.summary,
              isPrimary: true,
            },
          ],
        },
      },
    });
  };

  return (
    <section className="account d-flex">
      <div className="account__left d-md-flex d-none flx-align section-bg position-relative">
        <img
          src="../assets/images/shapes/pattern-curve-seven.png"
          alt=""
          className="position-absolute end-0 top-0 h-100"
        />
      </div>

      <div className="account__right padding-t-120 flx-align">
        <div className="dark-light-mode">
          <ThemeToggle />
        </div>

        <div className="account-content">
          <Link href="/" className="logo mb-64">
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

          <h4 className="account-content__title mb-48">Add Category</h4>

          <div className="row gy-4">
            {/* NAME */}
            <input
              className="common-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category Name"
            />

            {/* SUMMARY */}
            <input
              className="common-input"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Short Summary"
            />

            {/* ICON (URL or class name) */}
            <input
              className="common-input"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Icon URL or icon class"
            />

            {/* PARENT CATEGORY */}
            <select
              className="common-input"
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
            >
              <option value="">No Parent (Root Category)</option>
              {categoryData?.categories?.results.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.langs[0]?.name}
                </option>
              ))}
            </select>

            {/* ERROR */}
            {errorMessage && (
              <p className="text-danger font-14">{errorMessage}</p>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <p className="text-success font-14">{successMessage}</p>
            )}

            {/* SUBMIT */}
            <button
              className="btn btn-main w-100"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
