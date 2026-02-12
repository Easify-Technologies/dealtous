"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/queries";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      price
      currency
      langs {
        code
        name
        summary
        isPrimary
      }
    }
  }
`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    price: "",
    currency: "USD",
    categoryIds: [],
    images: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: categoryData } = useQuery(GET_CATEGORIES);

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted: () => {
      setSuccessMessage("Product created successfully");
      setFormData({
        name: "",
        summary: "",
        price: "",
        currency: "USD",
        categoryIds: [],
        images: [],
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

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...data.urls], // URLs only
    }));
  };

  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");

    createProduct({
      variables: {
        input: {
          price: Number(formData.price),
          currency: formData.currency,
          images: formData.images,
          categoryIds: formData.categoryIds,
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

          <h4 className="account-content__title mb-48">Add a Product</h4>

          <div className="row gy-4">
            {/* NAME */}
            <input
              className="common-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            {/* SUMMARY */}
            <input
              className="common-input"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Short Summary"
            />

            {/* PRICE */}
            <input
              type="number"
              className="common-input"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (in cents)"
            />

            {/* CURRENCY */}
            <input
              className="common-input"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="Currency (USD)"
            />

            {/* CATEGORY SELECTION */}
            <div>
              <p className="font-16 fw-500 mb-2">Categories</p>
              {categoryData?.categories?.results.map((cat) => (
                <label key={cat.id} className="d-block">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                  />{" "}
                  {cat.langs[0]?.name}
                </label>
              ))}
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <p className="font-16 fw-500 mb-2">Upload Images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                  />
                ))}
              </div>
            </div>

            {/* ERRORS / SUCCESS */}
            {errorMessage && (
              <p className="text-danger font-14">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-success font-14">{successMessage}</p>
            )}

            {/* SUBMIT */}
            <button
              className="btn btn-main w-100"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
