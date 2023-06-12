import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@chat/lib/chakra";

import client from "@chat/apollo";

import "@chat/assets/styles/main.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
