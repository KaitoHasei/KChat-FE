import { useContext, useMemo, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import _ from "lodash";

import { ChatContext } from "@chat/contexts/ChatContext";

import { Modal } from "@chat/components";
import UserSearchList from "./UserSearchList";

import queries from "@chat/apollo/graphql";

const searchUsersQuery = queries.query.searchUsers;
const createConversationMutation = queries.mutation.createConversation;

const FindConversationModal = ({ isOpen, isMutiple, onClose }) => {
  const { setConversationId } = useContext(ChatContext);

  const [selectedUser, setSelectedUser] = useState([]);

  const [searchUsers, { data: searchUsersRes, loading: searchUsersLoading }] =
    useLazyQuery(searchUsersQuery, {
      fetchPolicy: "network-only",
    });

  const searchedUsers = searchUsersRes?.searchUsers;

  const [createConversation, { loading: createConversationLoading }] =
    useMutation(createConversationMutation, {
      onCompleted: (res) => {
        const _conversation = res?.createConversation;

        setConversationId(_conversation?.id);
      },
    });

  const handleOnChange = async (event) => {
    const { value } = event?.target;

    if (value.trim())
      searchUsers({
        variables: {
          searchTerms: value,
        },
      });
  };

  const handleCreateConversation = () => {
    if (_.isEmpty(selectedUser) || selectedUser.length < 2) return;

    createConversation({
      variables: {
        listUserId: selectedUser,
      },
    });

    return onClose();
  };

  const handleSelectUser = (user) => {
    if (!isMutiple) {
      createConversation({
        variables: {
          listUserId: [user?.id],
        },
      });

      return onClose();
    }

    if (selectedUser.includes(user)) return;

    setSelectedUser((prev) => [...prev, user]);
  };

  const handleRemoveUser = (user) => {
    const _removedUser = selectedUser?.filter(
      (_user) => !_user?.id === user?.id
    );

    setSelectedUser(_removedUser);
  };

  const debounceOnChange = _.debounce(handleOnChange, 300);

  const renderSelectedUser = useMemo(() => {
    return (
      <Flex py="10px" mt="20px" borderBottom="1px solid white">
        {selectedUser?.map((user, index) => (
          <Flex
            key={index}
            padding="5px"
            alignItems="center"
            border="1px solid white"
            borderRadius="16px"
          >
            <Text mr="5px">{user?.name}</Text>
            <Box
              fontSize="18px"
              _hover={{ cursor: "pointer" }}
              onClick={handleRemoveUser}
            >
              <Icon icon="solar:close-circle-bold" />
            </Box>
          </Flex>
        ))}
      </Flex>
    );
  }, [selectedUser, handleRemoveUser]);

  const footer = useMemo(() => {
    if (!isMutiple) return;

    return (
      <Box>
        <Button
          width="100%"
          isLoading={createConversationLoading}
          isDisabled={selectedUser.length < 2}
          onClick={handleCreateConversation}
        >
          Create Conversation
        </Button>
      </Box>
    );
  }, [
    isMutiple,
    createConversationLoading,
    selectedUser,
    handleCreateConversation,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      title="Find conversation"
      footer={footer}
      onClose={onClose}
    >
      <Box>
        <Input
          placeholder="Enter user name or email"
          onChange={debounceOnChange}
        />
      </Box>
      {!_.isEmpty(selectedUser) && renderSelectedUser}
      <UserSearchList
        loading={searchUsersLoading}
        listUser={searchedUsers}
        onSelect={handleSelectUser}
      />
    </Modal>
  );
};

export default FindConversationModal;

FindConversationModal.propTypes = {
  isOpen: PropTypes.bool,
  isMutiple: PropTypes.bool,
  onClose: PropTypes.func,
};

FindConversationModal.defaultProps = {
  isOpen: false,
  isMutiple: false,
  onClose: () => {},
};
