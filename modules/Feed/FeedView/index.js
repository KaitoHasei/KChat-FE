import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  Avatar,
  Button,
  Flex,
  Input,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import _ from "lodash";

import { Message } from "@chat/components";

import queries from "@chat/apollo/graphql";

import { ChatContext } from "@chat/contexts/ChatContext";

import {
  formatConversationName,
  getConversationImage,
} from "@chat/utils/helpers";

const retrieveConversationQuery = queries.query.retrieveConversation;
const getConversationMessagesQuery = queries.query.getConversationMessages;
const sendMessageMutation = queries.mutation.sendMessage;
const sentMessageSubscription = queries.subscription.sentMessage;

const FeedView = () => {
  const { conversationId } = useContext(ChatContext);
  const {
    data: { user },
  } = useSession();

  const bottomRef = useRef(null);
  const listMessagesRef = useRef(null);
  const inputMessageRef = useRef(null);

  const [messPagination, setMessPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [retrieveData, setRetrieveData] = useState({});
  const [messages, setMessages] = useState([]);

  const { loading: retrieveLoading } = useQuery(retrieveConversationQuery, {
    variables: {
      conversationId,
    },
    onCompleted: (res) => {
      const _conversation = res?.retrieveConversation;

      setRetrieveData(_conversation);
    },
  });

  const { fetchMore: fetchMoreMessages } = useQuery(
    getConversationMessagesQuery,
    {
      variables: {
        inputs: {
          conversationId,
          offset: messPagination.offset,
          limit: messPagination.limit,
        },
      },
      fetchPolicy: "cache-and-network",
      onCompleted: (res) => {
        const _messages = res?.getConversationMessages;

        setMessages(_messages);
      },
    }
  );

  const [sendMessage] = useMutation(sendMessageMutation, {
    onCompleted: (res) => console.log(res?.sendMessage),
  });

  useSubscription(sentMessageSubscription, {
    variables: {
      conversationId: retrieveData?.id,
    },
    onData: ({ data: res }) => {
      const _newMessage = res?.data.sentMessage?.message;

      if (user?.id !== _newMessage?.userId)
        return setMessages((prev) => [...prev, _newMessage]);
    },
  });

  // scroll to bottom every time messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // scroll to top fetch more messages
  // const handleScrollFetchmore = () => {
  //   console.log(listMessagesRef.current.scrollTop);
  //   if (listMessagesRef.current.scrollTop !== 0) return;

  //   const _offset = messPagination.offset + messPagination.limit;

  //   setMessPagination((prev) => ({
  //     ...prev,
  //     offset: _offset,
  //   }));

  //   return fetchMoreMessages({
  //     variables: {
  //       inputs: {
  //         conversationId,
  //         offset: _offset,
  //         limit: messPagination.limit,
  //       },
  //     },
  //   });
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScrollFetchmore);
  //   return () => window.removeEventListener("scroll", handleScrollFetchmore);
  // }, [getConversationMessagesLoading]);

  const handleSendMessage = () => {
    const message = inputMessageRef.current.value.trim();

    if (!message) return;

    setMessages((prev) => [
      ...prev,
      {
        userId: user?.id,
        content: message,
      },
    ]);

    inputMessageRef.current.value = "";

    return sendMessage({
      variables: {
        inputs: {
          conversationId: retrieveData?.id,
          content: message,
        },
      },
    });
  };

  const renderListMessage = useMemo(() => {
    const _getSender = (userId) => {
      return _.find(retrieveData?.participants, (participant) => {
        return participant?.id === userId;
      });
    };

    return (
      <Stack
        justifyContent="end"
        ref={listMessagesRef}
        flex="1"
        px="10px"
        overflowY="scroll"
      >
        {messages &&
          messages?.map((message, index) => (
            <Message
              key={index}
              message={message}
              sender={_getSender(message?.userId)}
            />
          ))}
        <div ref={bottomRef} />
      </Stack>
    );
  }, [retrieveData, messages]);

  return (
    <Stack width="100%">
      <Flex
        padding="9px"
        alignItems="center"
        boxShadow="0 1px 1px rgba(0, 0, 0, 0.3)"
      >
        {retrieveLoading ? (
          <>
            <SkeletonCircle mr="10px" size="8" />
            <SkeletonText noOfLines={1} spacing={4} skeletonHeight={5} />
          </>
        ) : (
          <>
            <Avatar
              mr="10px"
              name="conversation-image"
              size="sm"
              src={getConversationImage(retrieveData, user?.id)}
              _hover={{ cursor: "default" }}
            />
            <Text maxWidth="500px" fontWeight="700" noOfLines={1}>
              {formatConversationName(retrieveData, user?.id)}
            </Text>
          </>
        )}
      </Flex>
      {renderListMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Flex padding="10px">
          <Input ref={inputMessageRef} placeholder="Aa" />
          <Button
            fontSize="25px"
            color="teal.500"
            variant="ghost"
            _hover={{
              bg: "none",
              color: "teal.300",
            }}
            onClick={handleSendMessage}
          >
            <Icon icon="mingcute:send-fill" />
          </Button>
        </Flex>
      </form>
    </Stack>
  );
};

export default FeedView;
