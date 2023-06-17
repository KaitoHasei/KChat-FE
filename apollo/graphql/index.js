// Query
import searchUsers from "./query/searchUsers";
import getConversations from "./query/getConversations";
import retrieveConversation from "./query/retrieveConversation";
import getConversationMessages from "./query/getConversationMessages";

// Mutation
import changeUserName from "./mutation/changeUserName";
import createConversation from "./mutation/createConversation";
import sendMessage from "./mutation/sendMessage";
import markReadConversation from "./mutation/markReadConversation";

// Subscription
import conversationCreated from "./subscription/conversationCreated";
import conversationHasMessage from "./subscription/conversationHasMessage";
import sentMessage from "./subscription/sentMessage";

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
  ...markReadConversation,
};

const subscription = {
  ...conversationCreated,
  ...conversationHasMessage,
  ...sentMessage,
};

export default {
  query,
  mutation,
  subscription,
};
