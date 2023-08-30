import { Avatar, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Message = ({
  message,
  sender,
  isOwner,
  previousSameUser,
  nextSameUser,
}) => {
  return (
    <Flex
      justifyContent={isOwner ? "end" : "start"}
      alignItems="end"
      flexDirection={isOwner ? "row-reverse" : "row"}
    >
      <Avatar
        name={sender?.name}
        src={sender?.image}
        size="sm"
        margin="10px"
        visibility={nextSameUser ? "hidden" : "unset"}
      />
      <Text
        maxW="50%"
        padding="10px"
        borderRadius={
          previousSameUser === nextSameUser
            ? "8px"
            : !previousSameUser && nextSameUser
            ? "8px 8px 0 0"
            : "0 0 8px 8px"
        }
        bg={isOwner ? "teal" : "blackAlpha.400"}
        fontSize="lg"
      >
        {message?.content}
      </Text>
    </Flex>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.any),
  sender: PropTypes.objectOf(PropTypes.any),
  isOwner: PropTypes.bool,
  previousSameUser: PropTypes.bool,
  nextSameUser: PropTypes.bool,
};

Message.defaultProps = {
  message: {},
  sender: {},
  isOwner: false,
  previousSameUser: false,
  nextSameUser: false,
};
