import { Box, Flex } from "@chakra-ui/react";

import { ChatProvider } from "@chat/contexts/ChatContext";

import Conversation from "@chat/modules/Conversation";
import Feed from "@chat/modules/Feed";

export default function Chat() {
  return (
    <>
      <ChatProvider>
        <Box id="kchat__chat" height="100vh">
          <Flex className="chat__wrapper" height="100%">
            <Box
              className="chat__conversation"
              width={{ base: "100%", sm: "80px", md: "360px" }}
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
