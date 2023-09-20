export const filterListParticipants = (conversation, sessionUserId) => {
  return conversation?.participants?.filter(
    (participant) => participant?.id !== sessionUserId
  );
};

export const formatConversationName = (conversation, sessionUserId) => {
  if (conversation?.name) return conversation?.name;

  const listParticipants = filterListParticipants(conversation, sessionUserId);

  const conversationName = listParticipants
    ?.map((participant) => participant?.name)
    ?.join(", ");

  return conversationName;
};

export const getConversationImage = (conversation, sessionUserId) => {
  if (conversation?.image) return conversation?.image;

  const listParticipants = filterListParticipants(conversation, sessionUserId);

  return listParticipants?.[0]?.image;
};

export const getTimeFromUTCToGMT = (UTCDateTime) => {
  const GMTDateTime = new Date(UTCDateTime);
  const dateTimeNow = new Date();

  const duringDay =
    dateTimeNow.getDate() === GMTDateTime.getDate() &&
    dateTimeNow.getMonth() === GMTDateTime.getMonth();

  if (duringDay) return `${GMTDateTime.getHours()}:${GMTDateTime.getMinutes()}`;

  return `${GMTDateTime.getDate()}/${
    GMTDateTime.getMonth() + 1
  }/${GMTDateTime.getFullYear()}`;
};
