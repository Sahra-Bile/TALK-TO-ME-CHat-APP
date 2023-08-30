import React from "react";

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
  const handleNavigateToRoom = (roomId: string) => {
    onJoinActiveRoom(roomId);
  };

  return (
    <div>
      <h2>Active Rooms:</h2>
      <ul>
        {activeRooms.map((room) => (
          <li
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            key={room.id}
            onClick={() => handleNavigateToRoom(room.id)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
