import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

import DropDown from "../DropDown";

import {
  formatConversationName,
  getConversationImage,
} from "@chat/utils/helpers";

const { MenuDrop } = DropDown;

const ConversationItem = ({ isSelected, conversation, onClick }) => {
  const { data: session } = useSession();

  const handleClickConversation = () => onClick(conversation);

  const renderConversationInfo = useMemo(() => {
    const _conversationImage = getConversationImage(
      conversation,
      session?.user?.id
    );
    const _conversationName = formatConversationName(
      conversation,
      session?.user?.id
    );

    const _haveSeenLastestMessage = conversation?.userHaveSeen?.includes(
      session?.user?.id
    );

    return (
      <>
        <Flex flex="1" alignItems="center" onClick={handleClickConversation}>
          <Avatar mr="10px" name={_conversationName} src={_conversationImage} />
          <Box flex="1">
            <Text fontSize="lg" fontWeight="700" noOfLines={1}>
              {_conversationName}
            </Text>
            <Text
              noOfLines={1}
              fontWeight={_haveSeenLastestMessage ? "400" : "600"}
            >
              {conversation?.lastMessage?.content}
            </Text>
          </Box>
        </Flex>
      </>
    );
  }, [conversation]);

  return (
    <Flex
      padding="10px"
      alignItems="center"
      bg={isSelected && "blackAlpha.300"}
      _hover={{
        cursor: "pointer",
        bg: "blackAlpha.300",

        // "&>.conversation-options": {
        //   display: "block",
        // },
      }}
    >
      {conversation && renderConversationInfo}
      {/* <Box className="conversation-options" display="none">
        <MenuDrop
          buttonProps={{
            padding: "5px",
            borderRadius: "50%",
          }}
        >
          <Icon icon="bi:three-dots" />
        </MenuDrop>
      </Box> */}
    </Flex>
  );
};

export default ConversationItem;

ConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
};

ConversationItem.defaultProps = {
  isSelected: false,
  conversation: {},
  onClick: () => {},
};
