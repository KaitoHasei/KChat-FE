import { useMemo, useState, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { useQuery, useSubscription } from "@apollo/client";
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

import useWindowSize from "@chat/hooks/useWindowSize";

import { DropDown, ConversationItem } from "@chat/components";
import { getScreenMode } from "@chat/components/helper";
import FindConversationModal from "../FindConversationModal";
import UserModal from "../UserModal";

import queries from "@chat/apollo/graphql";

import { ChatContext } from "@chat/contexts/ChatContext";

import {
  CREATE_CONVERSATION_FRAGMENT,
  GET_CONVERSATIONS_FRAGMENT,
} from "./fragments";

const { MenuDrop } = DropDown;

const getConversationQuery = queries.query.getConversations(
  GET_CONVERSATIONS_FRAGMENT
);
const conversationCreatedSubscription =
  queries.subscription.conversationCreated(CREATE_CONVERSATION_FRAGMENT);
const conversationHasMessageSubscription =
  queries.subscription.conversationHasMessage;

const Conversation = () => {
  const { ipadSmallMode } = getScreenMode(useWindowSize());
  const { conversationId, setConversationId } = useContext(ChatContext);

  const [openFindModal, setOpenFindModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [listConversation, setListConversation] = useState([]);

  const { data: session } = useSession();

  const { loading: getConversationsLoading } = useQuery(getConversationQuery, {
    onCompleted: (res) => {
      const _conversations = res.getConversations;

      setListConversation(_conversations);
    },
  });

  // excute subscription created conversation
  // useSubscription(conversationCreatedSubscription, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     const _newConversation = subscriptionData?.data?.conversationCreated;

  //     setListConversation((prev) => [_newConversation, ...prev]);
  //   },
  // });

  // excute subscription has new message
  useSubscription(conversationHasMessageSubscription, {
    onData: ({ data: res }) => {
      const _conversationHasMessage = res.data.conversationHasMessage;
      const _conversationUpdate = listConversation?.find(
        (conversation) => conversation?.id === _conversationHasMessage?.id
      );
      const _newListConversations = _.cloneDeep(listConversation);

      if (_conversationUpdate) {
        const conversationUpdateIndex = listConversation?.findIndex(
          (conversation) => conversation?.id === _conversationUpdate?.id
        );

        _newListConversations?.splice(conversationUpdateIndex, 1);
      }

      _newListConversations?.unshift(_conversationHasMessage);

      setListConversation(_newListConversations);
    },
  });

  const toggleFindModal = () => {
    if (openFindModal) return setOpenFindModal(false);

    return setOpenFindModal(true);
  };

  const toggleUserModal = () => {
    if (openUserModal) return setOpenUserModal(false);

    return setOpenUserModal(true);
  };

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
        action: () => toggleUserModal(),
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
    [signOut, toggleUserModal]
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
        onClick={toggleFindModal}
      >
        Find or start a conversation
      </Text>
    );
  }, []);

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
          : listConversation?.map((conversation, index) => (
              <ConversationItem
                key={index}
                isSelected={conversationId === conversation?.id}
                conversation={conversation}
                onClick={handleClickConversation}
              />
            ))}
      </Box>
    );
  }, [conversationId, getConversationsLoading, listConversation]);

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
          <Text
            py="3px"
            mr="3px"
            width="100%"
            bg="blackAlpha.500"
            borderRadius="5px"
            textAlign="center"
            cursor="pointer"
            onClick={toggleFindModal}
          >
            Find or start a conversation
          </Text>
          {/* <Flex
            padding="3px"
            width="30px"
            bg="blackAlpha.500"
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
          >
            <Icon icon="material-symbols:group" />
          </Flex> */}
        </Flex>
        {renderListConversation}
        {renderUserInfo}
      </Stack>
      {openFindModal && (
        <FindConversationModal
          isOpenModal={openFindModal}
          toggleModal={toggleFindModal}
        />
      )}
      {openUserModal && (
        <UserModal isOpenModal={openUserModal} toggleModal={toggleUserModal} />
      )}
    </>
  );
};

export default Conversation;
