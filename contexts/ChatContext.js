import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState("");

  return (
    <ChatContext.Provider
      value={{
        conversationId,

        setConversationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
