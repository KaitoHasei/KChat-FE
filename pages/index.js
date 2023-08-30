import { Box, Flex } from "@chakra-ui/react";

import Head from "next/head";

import { ChatProvider } from "@chat/contexts/ChatContext";

import Conversation from "@chat/modules/Conversation";
import Feed from "@chat/modules/Feed";

export default function Chat() {
  return (
    <>
      <Head>
        <title>KChat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ChatProvider>
        <Box id="kchat__chat" height="100vh">
          <Flex className="chat__wrapper" height="100%">
            <Box
              className="chat__conversation"
              width={{ base: "100%", sm: "80px", lg: "360px" }}
              bg="whiteAlpha.200"
            >
              <Conversation />
            </Box>
            <Box className="chat__feed" flex="1">
              <Feed />
            </Box>
          </Flex>
        </Box>
      </ChatProvider>
    </>
  );
}
