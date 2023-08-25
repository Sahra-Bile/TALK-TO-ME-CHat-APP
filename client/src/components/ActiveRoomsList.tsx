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

  const handleNavigateToRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    onJoinActiveRoom(roomId);
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h2>Active Rooms:</h2>
      <ul>
        {activeRooms.map((room) => (
          <li
            style={{ cursor: "pointer" }}
            key={room.id}
            onClick={() => handleNavigateToRoom(room.id)}
          >
            Room: {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
