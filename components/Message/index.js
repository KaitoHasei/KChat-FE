import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";

const Message = ({ message, sender }) => {
  const {
    data: { user },
  } = useSession();

  return (
    <Flex
      justifyContent={message?.userId === user?.id ? "end" : "start"}
      alignItems="end"
      flexDirection={message?.userId === user?.id ? "row-reverse" : "row"}
    >
      <Avatar name={sender?.name} src={sender?.image} size="sm" margin="10px" />
      <Text
        maxW="50%"
        padding="10px"
        borderRadius="8px"
        bg={message?.userId === user?.id ? "teal" : "blackAlpha.400"}
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
};

Message.defaultProps = {
  message: {},
  sender: {},
};
