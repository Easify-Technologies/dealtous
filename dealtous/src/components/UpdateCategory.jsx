"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

import { GET_CATEGORY_BY_ID, GET_CATEGORIES } from "@/graphql/queries";

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
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

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

const UpdateCategory = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, loading } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { id },
  });

  const { data: allCategories } = useQuery(GET_CATEGORIES);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    icon: "",
    parentId: "",
  });

  useEffect(() => {
    if (!data?.category) return;

    const lang =
      data.category.langs.find((l) => l.isPrimary) || data.category.langs[0];

    setFormData({
      name: lang?.name || "",
      summary: lang?.summary || "",
      icon: data.category.icon || "",
      parentId: data.category.parent?.id || "",
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    await updateCategory({
      variables: {
        id,
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

    alert("Category updated");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    await deleteCategory({ variables: { id } });

    router.push("/add-category");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
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
                placeholder="Summary"
              />

              {/* ICON */}
              <input
                className="common-input"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Icon URL"
              />

              {/* PARENT */}
              <select
                className="common-input"
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
              >
                <option value="">No Parent (Root)</option>

                {allCategories?.categories?.results
                  .filter((cat) => cat.id !== id) // prevent self-parenting
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.langs[0]?.name}
                    </option>
                  ))}
              </select>

              <div className="mt-4 d-flex gap-3 ps-0">
                {/* ERRORS / SUCCESS */}
                {errorMessage && (
                  <p className="text-danger font-14">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-success font-14">{successMessage}</p>
                )}

                <button className="btn btn-main" onClick={handleUpdate}>
                  Update Category
                </button>

                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateCategory;
