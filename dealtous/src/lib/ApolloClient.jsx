import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
 import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "/api/graphql",
});

const authLink = new SetContextLink((_, { headers }) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ["filter"],
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
