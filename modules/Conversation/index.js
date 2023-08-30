import { useMemo, useState, useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import _ from "lodash";

import { DropDown, ConversationItem } from "@chat/components";
import FindConversationModal from "../FindConversationModal";
import UserModal from "../UserModal";

import queries from "@chat/apollo/graphql";

import { ChatContext } from "@chat/contexts/ChatContext";

const { MenuDrop } = DropDown;

const getConversationsQuery = queries.query.getConversations;
const hasUpdateConversationSubscription =
  queries.subscription.hasUpdateConversation;

const Conversation = () => {
  const { conversationId, setConversationId } = useContext(ChatContext);

  const [openFindModal, setOpenFindModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const { data: session } = useSession();
  const {
    data: getConversationsRes,
    loading: getConversationsLoading,
    subscribeToMore: subscribeUpdateConversation,
  } = useQuery(getConversationsQuery);

  const conversations = getConversationsRes?.getConversations || [];

  useEffect(() => {
    subscribeUpdateConversation({
      document: hasUpdateConversationSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const conversationUpdated = subscriptionData.data.hasUpdateConversation;
        const oldConversations = prev.getConversations;

        const removedExistConversation = oldConversations.filter(
          (conversation) => !conversation.id === conversationUpdated.id
        );

        return Object.assign({}, prev, {
          getConversations: [conversationUpdated, ...removedExistConversation],
        });
      },
    });
  }, []);

  const handleSelectUserOption = (item) => {
    if (!item?.action) return;

    return item?.action();
  };

  const handleClickConversation = (conversation) => {
    return setConversationId(conversation?.id);
  };

  const userOptions = useMemo(
    () => [
      {
        props: {
          icon: <Icon icon="mdi:user" />,
        },
        render: "User Information",
        action: () => setOpenUserModal(true),
      },
      {
        props: {
          icon: <Icon icon="ic:outline-log-out" />,
          color: "red.500",
        },
        render: "Log Out",
        action: () => signOut(),
      },
    ],
    [signOut, setOpenUserModal]
  );

  const renderFindConversation = useMemo(() => {
    return (
      <Text
        py="3px"
        mr="3px"
        width="100%"
        bg="blackAlpha.500"
        borderRadius="5px"
        textAlign="center"
        cursor="pointer"
        onClick={() => setOpenFindModal(true)}
      >
        Find or start a conversation
      </Text>
    );
  }, [setOpenFindModal]);

  const renderListConversation = useMemo(() => {
    const conversationItemLoading = (
      <>
        <Flex padding="10px" flex="1" alignItems="center">
          <SkeletonCircle mr="10px" size="10" />
          <Box flex="1">
            <SkeletonText noOfLines={1} spacing={4} skeletonHeight={4} />
            <SkeletonText mt="4" noOfLines={1} spacing={4} skeletonHeight={2} />
          </Box>
        </Flex>
        <Flex padding="10px" flex="1" alignItems="center">
          <SkeletonCircle mr="10px" size="10" />
          <Box flex="1">
            <SkeletonText noOfLines={1} spacing={4} skeletonHeight={4} />
            <SkeletonText mt="4" noOfLines={1} spacing={4} skeletonHeight={2} />
          </Box>
        </Flex>
        <Flex padding="10px" flex="1" alignItems="center">
          <SkeletonCircle mr="10px" size="10" />
          <Box flex="1">
            <SkeletonText noOfLines={1} spacing={4} skeletonHeight={4} />
            <SkeletonText mt="4" noOfLines={1} spacing={4} skeletonHeight={2} />
          </Box>
        </Flex>
        <Flex padding="10px" flex="1" alignItems="center">
          <SkeletonCircle mr="10px" size="10" />
          <Box flex="1">
            <SkeletonText noOfLines={1} spacing={4} skeletonHeight={4} />
            <SkeletonText mt="4" noOfLines={1} spacing={4} skeletonHeight={2} />
          </Box>
        </Flex>
      </>
    );

    return (
      <Box className="conversation__mid" pl="5px" flex="1" overflowY="scroll">
        {getConversationsLoading
          ? conversationItemLoading
          : conversations?.map((conversation, index) => (
              <ConversationItem
                key={index}
                isSelected={conversationId === conversation?.id}
                conversation={conversation}
                onClick={handleClickConversation}
              />
            ))}
      </Box>
    );
  }, [
    conversationId,
    getConversationsLoading,
    conversations,
    handleClickConversation,
  ]);

  const renderUserInfo = useMemo(() => {
    return (
      <Box className="conversation__bot" padding="10px" bg="blackAlpha.500">
        <Flex alignItems="center" justifyContent="space-between">
          {!session ? (
            <>
              <SkeletonCircle size="10" />
              <SkeletonText noOfLines={1} spacing={5} skeletonHeight={5} />
            </>
          ) : (
            <>
              <Avatar
                size="sm"
                name={session?.user?.name}
                src={session?.user?.image}
              />
              <Text padding="10px" flex="1">
                {session?.user?.name}
              </Text>
            </>
          )}
          <MenuDrop
            buttonProps={{
              padding: "5px",
              borderRadius: "50%",
            }}
            items={userOptions}
            onSelect={handleSelectUserOption}
          >
            <Icon icon="bi:three-dots" />
          </MenuDrop>
        </Flex>
      </Box>
    );
  }, [session, userOptions, handleSelectUserOption]);

  return (
    <>
      <Stack className="kchat__conversation" height="100%">
        <Flex
          className="conversation__top"
          padding="10px"
          boxShadow="0 1px 1px rgba(0, 0, 0, 0.3)"
        >
          {renderFindConversation}
        </Flex>
        {renderListConversation}
        {renderUserInfo}
      </Stack>
      {openFindModal && (
        <FindConversationModal
          isOpen={openFindModal}
          onClose={() => setOpenFindModal(false)}
        />
      )}
      {openUserModal && (
        <UserModal
          isOpenModal={openUserModal}
          user={session.user}
          onClose={() => setOpenUserModal(false)}
        />
      )}
    </>
  );
};

export default Conversation;
