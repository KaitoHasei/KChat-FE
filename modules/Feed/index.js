import { useContext } from "react";
import { Box } from "@chakra-ui/react";

import FeedEmpty from "./FeedEmpty";
import FeedView from "./FeedView";

import { ChatContext } from "@chat/contexts/ChatContext";

const Feed = () => {
  const { conversationId } = useContext(ChatContext);

  return (
    <>
      <Box className="kchat__feed" height="100%" display="flex">
        {!conversationId ? <FeedEmpty /> : <FeedView />}
      </Box>
    </>
  );
};

export default Feed;
