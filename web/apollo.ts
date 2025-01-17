import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_ADMIN_BASE_URI}/api/graphql`,
  fetchOptions: {
    cache: "no-cache",
  },
});

const authLink = setContext(
  ({ headers }: { headers: { [key: string]: string } }) => ({
    headers: {
      ...headers,
      Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
    },
  }),
);

export const { getClient } = registerApolloClient(
  () =>
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    }),
);
