"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_ADMIN_PRODUCTS } from "@/graphql/queries";

const PAGE_SIZE = 10;

const AdminProducts = () => {
  const { data, loading, error } = useQuery(
    GET_ADMIN_PRODUCTS,
    {
      variables: {
        offset: 0,
        length: PAGE_SIZE,
      },
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.products?.results?.filter(Boolean) || [];

  return (
    <div className="container padding-y-120">
      <h3>All Products</h3>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const lang =
              product.langs?.[0] || {};

            return (
              <tr key={product.id}>
                <td>{lang.name}</td>
                <td>{product.price}</td>
                <td className="text-uppercase">{product.currency}</td>
                <td>
                  {product.images?.[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={60}
                    />
                  )}
                </td>
                <td>
                  <Link
                    href={`/admin/update-product?product_id=${product.id}`}
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

      <p>Total Products: {data.products.total}</p>
    </div>
  );
};

export default AdminProducts;
