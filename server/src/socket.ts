import { Server as SocketServer } from "socket.io";
import { CHAT_BOT } from "./room";
import { SaveMessageInDatabase } from "./harper-save-message";
import { harperGetMessages } from "./get-messages";
import { activeRooms } from "./room";
import { v4 as uuidv4 } from "uuid";

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
          createRoom(room, username);
        }
        joinRoom(socket, username, room);
      });
      // Event listener for getting the list of active rooms
      socket.on("get_active_rooms", () => {
        socket.emit("active_rooms", activeRooms);
      });
  
      // Event listener for joining a room from the list of active rooms

      socket.on("join_active_room", (data) => {
        const { roomName, username } = data;
        if (roomExists(roomName)) {
          joinRoom(socket, username, roomName);
        }
      });
  
  
  
      socket.on("disconnect", () => {
        allUsers = allUsers.filter((user) => user.id !== socket.id);
        console.log(`User disconnected ${socket.id}`);
      });
  
      socket.on("send_message", async (data: any) => {
        const { message, username, room, __createdtime__ } = data;
        io.in(room).emit("receive_message", data);
        try {
          const response = await SaveMessageInDatabase(
            message,
            username,
            room,
            __createdtime__
          );
        } catch (error) {
          console.log(error);
        }
      });
  
      socket.on("leave_room", (data) => {
        const { username, room } = data;
        leaveRoom(socket, username, room);
      });
    });
  }
  

function roomExists(roomName: string): boolean {
  return activeRooms.some((room) => room.name === roomName);
}

function createRoom(roomName: string, createdBy: string) {
  const roomId = uuidv4();
  activeRooms.push({ id: roomId, name: roomName, createdBy });
  console.log(`Rum "${roomName}" (ID: ${roomId}) skapat av ${createdBy}`);
}

export function joinRoom(socket: any, username: string, room: string) {
    // Add the user to the room
    socket.join(room);
  
    // Emit a welcome message to the user who joined
    socket.emit("receive_message", {
      message: `Welcome ${username} to ${room} `,
      username: CHAT_BOT,
      __createdtime__: Date.now(),
    });
  
    // Emit a message to all other users in the room about the new user joining
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__: Date.now(),
    });
  
    // Get the list of current users in the room and emit it to everyone in the room
    const chatRoomUsers: any[] = allUsers.filter((user) => user.room === room);
    socket.in(room).emit("chatroom_users", chatRoomUsers);
  
    // Add the user to the list of all users
    allUsers.push({ id: socket.id, username, room });
  }
  
  export function leaveRoom(socket: any, username: string, room: string) {
    // Remove the user from the room
    socket.leave(room);
  
    // Emit a message to all other users in the room about the user leaving
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__: Date.now(),
    });
  
    // Update the list of current users in the room and emit it to everyone in the room
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    const chatRoomUsers: any[] = allUsers.filter((user) => user.room === room);
    socket.in(room).emit("chatroom_users", chatRoomUsers);
  }
  