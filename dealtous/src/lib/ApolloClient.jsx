import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({ uri: "https://dev.dealtous.com/backend/graphql/" }),
    cache: new InMemoryCache()
});

export default client;