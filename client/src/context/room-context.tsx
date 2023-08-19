import React, { createContext, useContext, useState } from "react";

type RoomContextType = {
  room: string;
  setRoom: (room: string) => void;
};

type UserProp = {
  children: React.ReactNode;
};
const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(" RoomContext must be used within a RoomProvider");
  }
  return context;
};

export const RoomProvider = ({ children }: UserProp) => {
  const [room, setRoom] = useState("");

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
