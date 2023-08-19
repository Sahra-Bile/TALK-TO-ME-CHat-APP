import React, { createContext, useContext, useState } from "react";

type RoomContextType = {
  username: string;
  setUsername: (username: string) => void;
};

type UserProp = {
  children: React.ReactNode;
};
const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(" RoomContext must be used within a RoomProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProp) => {
  const [username, setUsername] = useState("");

  return (
    <RoomContext.Provider value={{ username, setUsername }}>
      {children}
    </RoomContext.Provider>
  );
};
