import { Server as SocketServer } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface Room {
  id: string;
  name: string;
  createdBy: string;
}

const CHAT_BOT = `ChatBot`;
let activeRooms: Room[] = [];
let allUsers: any[] = [];

export function setupSocket(server: any) {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
  
    socket.on("join_room", (data) => {
      const { username, room } = data;
      if (!roomExists(room)) {
        createRoom(io, room, username); 
      }
      joinRoom(socket, username, room);
    });

    socket.on("get_active_rooms", () => {
      socket.emit("active_rooms", activeRooms);
    });

    socket.on("join_active_room", (data) => {
      const { roomName, username } = data;
      if (roomExists(roomName)) {
        joinRoom(socket, username, roomName);

        socket.to(roomName).emit("receive_message", {
          message: `${username} has joined the chat room`,
          username: CHAT_BOT,
          __createdtime__: Date.now(),
          room: roomName, 
        });
      }
    });

    socket.on("disconnect", () => {
      allUsers = allUsers.filter((user) => user.id !== socket.id);
      console.log(`User disconnected ${socket.id}`);
    });

    socket.on("send_message", (data: any) => {
      const { room } = data;
      io.in(room).emit("receive_message", data);
    });

    socket.on("leave_room", (data) => {
      const { username, room } = data;
      activeRooms = activeRooms.filter(
        (activeRoom) => activeRoom.name !== room
      );
      leaveRoom(socket, username, room);
      io.emit("active_rooms", activeRooms); // Send update to all clients
    });

    socket.on("user_typing", (data) => {
      const { room, username } = data;
      socket.to(room).emit("user_typing", username);
    });

    socket.on("user_typing_end", (data) => {
      const { room, username } = data;
      socket.to(room).emit("user_typing_end", username);
    });
  });
}

function roomExists(roomName: string): boolean {
  return activeRooms.some((room) => room.name === roomName);
}

function createRoom(io: any, roomName: string, createdBy: string) {
  const roomId = uuidv4();
  const newRoom = { id: roomId, name: roomName, createdBy };
  activeRooms.push(newRoom);
  io.emit("active_rooms", activeRooms); // Send update to all clients
  console.log(`Rum "${roomName}" (ID: ${roomId}) skapat av ${createdBy}`);
}

function joinRoom(socket: any, username: string, room: string) {
  socket.join(room);

  // Emit a welcome message to the user who just joined
  socket.emit("receive_message", {
    message: `Welcome ${username} to ${room}`,
    room: room,
    username: CHAT_BOT,
    __createdtime__: Date.now(),
  });

  // Get the list of current users in the room and emit it to everyone in the room
  const chatRoomUsers: any[] = allUsers.filter((user) => user.room === room);
  socket.in(room).emit("chatroom_users", chatRoomUsers);

  // Emit a message to all other users in the room about the new user joining
  socket.to(room).emit("receive_message", {
    message: `${username} has joined the chat room`,
    username: CHAT_BOT,
    __createdtime__: Date.now(),
    room: room,
  });

  allUsers.push({ id: socket.id, username, room });
}

export function leaveRoom(socket: any, username: string, room: string) {
  // Remove the user from the room
  socket.leave(room);
  // Emit a message to all other users in the room about the user leaving
  socket.to(room).emit("receive_message", {
    username: CHAT_BOT,
    room: room,
    message: `${username} has left the chat`,
    __createdtime__: Date.now(),
  });

  // Update the list of current users in the room and emit it to everyone in the room
  allUsers = allUsers.filter((user) => user.id !== socket.id);
  const chatRoomUsers: any[] = allUsers.filter((user) => user.room === room);
  socket.in(room).emit("chatroom_users", chatRoomUsers);
}
