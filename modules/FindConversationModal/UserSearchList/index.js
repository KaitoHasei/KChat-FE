import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const UserSearchList = ({ isLoading, listUser, onSelect }) => {
  return (
    <Box my="5px" padding="5px">
      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="md" />
        </Flex>
      )}
      {!isEmpty(listUser) && (
        <Flex justifyContent="center">
          <Grid
            width="100%"
            height="210px"
            margin="10px"
            templateColumns="repeat(3, 1fr)"
            gap={4}
            overflow="scroll"
            overflowX="hidden"
          >
            {listUser.map((user, index) => (
              <GridItem
                key={index}
                width="100%"
                margin="5px"
                onClick={() => onSelect(user)}
              >
                <Stack
                  padding="3px"
                  alignItems="center"
                  cursor="pointer"
                  //   _hover={{ bg: "gray.500" }}
                >
                  <Avatar name={user?.name} src={user?.image} />
                  <Text textAlign="center">{user?.name}</Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      )}
    </Box>
  );
};

export default UserSearchList;

UserSearchList.propTypes = {
  isLoading: PropTypes.bool,
  listUser: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  onSelect: PropTypes.func,
};

UserSearchList.defaultProps = {
  isLoading: false,
  listUser: [],
  onSelect: () => {},
};
