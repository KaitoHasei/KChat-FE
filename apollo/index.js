import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import _ from "lodash";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI,
  credentials: "include",
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_WS_URI,
          connectionParams: async () => {
            const session = await getSession();

            return {
              session,
            };
          },
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getConversationMessages: {
            keyArgs: false,
            merge(existing = [], incoming = [], options) {
              console.log({ incoming, options });
              const { args } = options;
              const firstExisting = existing?.[0]?.createdAt || null;
              const firstIncoming = incoming?.[0]?.createdAt || null;
              const isFetchMore = firstExisting !== firstIncoming;

              if (!isFetchMore) return incoming;
              return [...incoming, ...existing];
            },
          },
        },
      },
    },
  }),
});

export default client;
