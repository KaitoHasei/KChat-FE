// Query
import searchUsers from "./query/searchUsers";
import getConversations from "./query/getConversations";
import retrieveConversation from "./query/retrieveConversation";
import getConversationMessages from "./query/getConversationMessages";

// Mutation
import changeUserName from "./mutation/changeUserName";
import createConversation from "./mutation/createConversation";
import sendMessage from "./mutation/sendMessage";

// Subscription
import sentMessage from "./subscription/sentMessage";
import hasUpdateConversation from "./subscription/hasUpdateConversation";

const query = {
  ...searchUsers,
  ...getConversations,
  ...retrieveConversation,
  ...getConversationMessages,
};

const mutation = {
  ...changeUserName,
  ...createConversation,
  ...sendMessage,
};

const subscription = {
  ...sentMessage,
  ...hasUpdateConversation,
};

export default {
  query,
  mutation,
  subscription,
};
