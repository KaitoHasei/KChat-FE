import { useSession } from "next-auth/react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Modal } from "@chat/components";

// import queries from "@chat/apollo/graphql";

// const changeUserNameMutation = queries.mutation.changeUserName;

const UserModal = ({ isOpenModal, toggleModal }) => {
  const { data: session } = useSession();
  const user = session?.user;

  // const [isEdit, setEdit] = useState(false);
  // const [userName, setUserName] = useState(user.name);

  // const [changeUserName, { loading: changeUserNameLoading }] = useMutation(
  //   changeUserNameMutation,
  //   {
  //     onCompleted: (res) => {
  //       setEdit(false);
  //     },
  //   }
  // );

  // const handleChangeName = (event) => {
  //   const { value } = event?.target;

  //   return setUserName(value);
  // };

  // const handleSaveName = async () => {
  //   if (userName.trim())
  //     changeUserName({
  //       variables: {
  //         newName: userName,
  //       },
  //     });
  // };

  return (
    <Modal
      isOpen={isOpenModal}
      isCentered
      title="User Information"
      onClose={toggleModal}
    >
      <Box textAlign="center">
        <Avatar name={user?.name} src={user?.image} size="lg" />
        <Box padding="10px" marginTop="10px">
          <Flex alignItems="center" marginBottom="10px">
            <Text
              width="20%"
              textAlign="start"
              fontWeight="bold"
              overflowWrap="break-word"
            >
              Name:
            </Text>
            {/* {isEdit ? (
              <InputGroup flex="1">
                <Input
                  variant="flushed"
                  value={userName}
                  onChange={handleChangeName}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    isLoading={changeUserNameLoading}
                    onClick={handleSaveName}
                  >
                    Save
                  </Button>
                </InputRightElement>
              </InputGroup>
            ) : ( */}
            <>
              <Text flex="1" textAlign="start" borderBottom="1px solid white">
                {user?.name}
              </Text>
              {/* <Box
                  margin="5px"
                  color="teal.400"
                  _hover={{ cursor: "pointer", color: "teal.200" }}
                  onClick={() => setEdit(true)}
                >
                  <Icon icon="material-symbols:edit-square-outline" />
                </Box> */}
            </>
            {/* )} */}
          </Flex>
          <Flex alignItems="center" marginBottom="10px">
            <Text
              width="20%"
              textAlign="start"
              fontWeight="bold"
              overflowWrap="break-word"
            >
              Email:
            </Text>
            <Text flex="1" textAlign="start" borderBottom="1px solid white">
              {user?.email}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;

UserModal.propTypes = {
  isOpenModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

UserModal.defaultProps = {
  isOpenModal: false,
  toggleModal: () => {},
};
