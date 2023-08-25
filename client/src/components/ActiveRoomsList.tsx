import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Room = {
  id: string;
  name: string;
  createdBy: string;
};

type ActiveRoomsListProps = {
  activeRooms: Room[];
  onJoinActiveRoom: (roomName: string) => void;
};

export const ActiveRoomsList = ({
  activeRooms,
  onJoinActiveRoom,
}: ActiveRoomsListProps) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleNavigateToRoom = (roomName: string) => {
    setSelectedRoom(roomName);
    onJoinActiveRoom(roomName);
    navigate(`/room/${roomName}`);
  };

  return (
    <div>
      <h2>Active Rooms:</h2>
      <ul>
        {activeRooms.map((room) => (
          <li
            style={{ cursor: "pointer" }}
            key={room.id}
            onClick={() => onJoinActiveRoom(room.name)}
          >
            Room: {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
