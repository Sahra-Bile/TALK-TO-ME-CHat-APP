import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const CHAT_BOT = 'ChatBot';
let allUsers: any[] = []; // Använd any[] för allUsers för tillfället

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);
    console.log('user joined room ' + room + ' and user name is: ' + username);
    let __createdtime__ = Date.now();

    socket.emit('receive_message', {
      message: `Welcome ${username}`, // Flytta detta till här
      username: CHAT_BOT,
      __createdtime__: Date.now(),
    });

    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    let chatRoomUsers: any[] = [];
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);

    allUsers.push({ id: socket.id, username, room });
  });

  // ... resten av din kod


  socket.on('disconnect', () => {
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    console.log(`User disconnected ${socket.id}`);
  });

  socket.on('send_message', (data) => {
    const { room, message, username, __createdtime__ } = data;
    socket.to(room).emit('receive_message', { message, username, __createdtime__ });

  socket.emit('receive_message', {
    message: `Welcome ${username}`,
    username: CHAT_BOT,
    __createdtime__: Date.now(), 
});
});
});

const run = () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(`An error occurred while starting the server: ${e}`);
    throw new Error('Something went wrong');
  }
};

run();

