export const GET_CONVERSATIONS_FRAGMENT = `
    id
    participants {
        id
        name
        image
    }
    lastMessage {
        userId
        content
        createdAt
    }
    image
    userHaveSeen
    createdBy
`;

export const CREATE_CONVERSATION_FRAGMENT = `
    id
    participantIds
    participants
    image
    createdBy
`;
