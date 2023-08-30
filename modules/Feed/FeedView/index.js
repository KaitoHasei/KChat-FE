import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  SkeletonCircle,
  SkeletonText,
  Spinner,
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
  const messagesRef = useRef(null);
  const inputMessageRef = useRef(null);

  const [messagePage, setMessagePage] = useState({
    offset: 0,
    limit: 10,
  });

  const { data: retrieveConversationRes, loading: retrieveLoading } = useQuery(
    retrieveConversationQuery,
    {
      variables: {
        conversationId,
      },
    }
  );

  const retrieveConversation =
    retrieveConversationRes?.retrieveConversation || null;

  const {
    data: getConversationMessagesRes,
    loading: getConversationMessagesLoading,
    fetchMore: fetchMoreMessages,
    subscribeToMore: subscribeToMoreMessage,
  } = useQuery(getConversationMessagesQuery, {
    variables: {
      inputs: {
        conversationId,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const messages = getConversationMessagesRes?.getConversationMessages || [];

  const [sendMessage] = useMutation(sendMessageMutation, {
    onCompleted: (res) => console.log(res?.sendMessage),
  });

  useEffect(() => {
    subscribeToMoreMessage({
      document: sentMessageSubscription,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.sentMessage;

        return Object.assign({}, prev, {
          getConversationMessages: [
            ...prev.getConversationMessages,
            newMessage.message,
          ],
        });
      },
    });
  }, []);

  const handleScrollFetchmore = () => {
    if (messagesRef.current.scrollTop !== 0) return;

    fetchMoreMessages({
      variables: {
        inputs: {
          conversationId,
          offset: messagePage.offset + messagePage.limit,
          limit: messagePage.limit,
        },
      },
    });

    return setMessagePage({
      offset: messagePage.offset + messagePage.limit,
      limit: messagePage.limit,
    });
  };

  // scroll to bottom every time messages change and fetch more message when scroll to top
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    messagesRef.current.addEventListener("scroll", handleScrollFetchmore);

    return () =>
      messagesRef.current.removeEventListener("scroll", handleScrollFetchmore);
  }, [messages]);

  const handleSendMessage = () => {
    const message = inputMessageRef.current.value.trim();

    if (!message) return;

    inputMessageRef.current.value = "";

    return sendMessage({
      variables: {
        inputs: {
          conversationId: retrieveConversation?.id,
          content: message,
        },
      },
    });
  };

  const renderListMessage = useMemo(() => {
    const _getSender = (userId) => {
      return _.find(retrieveConversation?.participants, (participant) => {
        return participant?.id === userId;
      });
    };

    return (
      <Stack ref={messagesRef} flex="1" px="10px" overflowY="scroll">
        {getConversationMessagesLoading ? (
          <Box textAlign="center">
            <Spinner size="md" color="teal" />
          </Box>
        ) : (
          messages &&
          messages?.map((message, index, arr) => {
            const previousSameUser =
              index !== 0 ? arr[index - 1].userId === arr[index].userId : false;
            const nextSameUser =
              index !== arr.length - 1
                ? arr[index + 1].userId === arr[index].userId
                : false;

            return (
              <Message
                key={index}
                isOwner={message?.userId === user.id}
                previousSameUser={previousSameUser}
                nextSameUser={nextSameUser}
                message={message}
                sender={_getSender(message?.userId)}
              />
            );
          })
        )}
        <div ref={bottomRef} />
      </Stack>
    );
  }, [retrieveConversation, messages]);

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
              src={getConversationImage(retrieveConversation, user?.id)}
              _hover={{ cursor: "default" }}
            />
            <Text maxWidth="500px" fontWeight="700" noOfLines={1}>
              {formatConversationName(retrieveConversation, user?.id)}
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
