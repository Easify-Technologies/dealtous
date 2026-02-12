"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

import { gql } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      price
      currency
      images
      langs {
        code
        name
        summary
        isPrimary
      }
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      price
      currency
      images
      langs(codes: ["en"]) {
        name
        summary
        isPrimary
      }
      categories {
        id
      }
    }
  }
`;

const UpdateProduct = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("product_id");
  const router = useRouter();

  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
    skip: !id
  });

  const { data: categoryData } = useQuery(GET_CATEGORIES);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    price: "",
    currency: "USD",
    images: [],
    categoryIds: [],
  });

  useEffect(() => {
    if (!data?.product) return;

    const lang =
      data.product.langs.find((l) => l.isPrimary) || data.product.langs[0];

    setFormData({
      name: lang?.name || "",
      summary: lang?.summary || "",
      price: data.product.price || "",
      currency: data.product.currency || "USD",
      images: data.product.images || [],
      categoryIds: data.product.categories.map((c) => c.id),
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const handleUpdate = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    await updateProduct({
      variables: {
        id,
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
    alert("Product updated");
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProduct({ variables: { id } });

    router.push("/admin/add-product");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="account d-flex">
      <div className="account__left d-md-flex d-none flx-align section-bg position-relative">
        <img
          src="../../assets/images/shapes/pattern-curve-seven.png"
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
              src="../../assets/images/logo/logo.png"
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

          <h4 className="account-content__title">Update the Product</h4>

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
            <div className="mt-3 ps-0">
              <h6>Categories</h6>
              {categoryData?.categories?.results.map((cat) => (
                <label key={cat.id} className="d-block">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />{" "}
                  {cat.langs[0]?.name}
                </label>
              ))}
            </div>

            {/* ERRORS / SUCCESS */}
            {errorMessage && (
              <p className="text-danger font-14">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-success font-14">{successMessage}</p>
            )}

            {/* UPDATE */}
            <button
              className="btn btn-main w-100"
              disabled={loading}
              onClick={handleUpdate}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

            {/* DELETE */}
            <button className="btn btn-danger mt-3" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
