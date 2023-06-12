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

import { CREATE_CONVERSATION_FRAGMENT } from "./fragments";

const searchUsersQuery = queries.query.searchUsers;
const createConversationMutation = queries.mutation.createConversation(
  CREATE_CONVERSATION_FRAGMENT
);

const FindConversationModal = ({ isOpenModal, isMutiple, toggleModal }) => {
  const { setConversationId } = useContext(ChatContext);

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const [searchUsers, { loading: searchUsersLoading }] = useLazyQuery(
    searchUsersQuery,
    {
      onCompleted: (res) => {
        const _listUser = res?.searchUsers?.users;

        setListUser(_listUser);
      },
    }
  );

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

    return toggleModal();
  };

  const handleSelectUser = (user) => {
    if (!isMutiple) {
      createConversation({
        variables: {
          listUserId: [user?.id],
        },
      });

      return toggleModal();
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

  const footerContent = useMemo(() => {
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
  }, [isMutiple, selectedUser]);

  return (
    <Modal
      isOpen={isOpenModal}
      title="Find conversation"
      footerContent={footerContent}
      onClose={toggleModal}
    >
      <Box>
        <Input
          placeholder="Enter user name or email"
          onChange={debounceOnChange}
        />
      </Box>
      {!_.isEmpty(selectedUser) && (
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
      )}
      <UserSearchList
        loading={searchUsersLoading}
        listUser={listUser}
        onSelect={handleSelectUser}
      />
    </Modal>
  );
};

export default FindConversationModal;

FindConversationModal.propTypes = {
  isOpenModal: PropTypes.bool,
  isMutiple: PropTypes.bool,
  toggleModal: PropTypes.func,
};

FindConversationModal.defaultProps = {
  isOpenModal: false,
  isMutiple: false,
  toggleModal: () => {},
};
