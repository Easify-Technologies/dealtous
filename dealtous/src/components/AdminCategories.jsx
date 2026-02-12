"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_ADMIN_CATEGORIES } from "@/graphql/queries";

const AdminCategories = () => {
  const { data, loading, error } = useQuery(
    GET_ADMIN_CATEGORIES,
    { fetchPolicy: "network-only" }
  );

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data?.categories?.results || [];

  return (
    <div className="container padding-y-120">
      <h3>All Categories</h3>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Icon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const lang =
              category.langs?.[0] || {};

            return (
              <tr key={category.id}>
                <td>{lang.name}</td>
                <td>{category.parent?.id || "Root"}</td>
                <td>
                  {category.icon && (
                    <img
                      src={category.icon}
                      alt={category.name || "category"}
                      width={40}
                    />
                  )}
                </td>
                <td>
                  <Link
                    href={`/admin/update-category/${category.id}`}
                    className="btn btn-sm btn-main"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p>Total Categories: {data.categories.total}</p>
    </div>
  );
};

export default AdminCategories;
