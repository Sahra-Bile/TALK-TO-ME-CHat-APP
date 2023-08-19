// Importera nödvändiga paket
require('dotenv').config();
console.log(process.env.HARPERDB_URL)
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { SaveMessageInDatabase } from './harper-save-message';
import { harperGetMessages } from './get-messages';

// Skapa Express-appen och definiera porten
const app = express();
const PORT = 4000;

// Använd middleware för att hantera CORS och request body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Skapa HTTP-server med Express-appen
const server = http.createServer(app);

// Konstant för chattbot-username
const CHAT_BOT = 'ChatBot';

// Array för att hålla koll på användare i olika rum
let allUsers: any[] = [];

// Skapa Socket.IO-server med CORS-konfiguration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Hantera anslutningar via Socket.IO
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);
    console.log('user joined room ' + room + ' and user name is: ' + username);
    let __createdtime__ = Date.now();

    // Välkomstmeddelande när användaren går med i ett rum
    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__: Date.now(),
    });

    // Meddelande till andra användare i rummet när någon går med
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
     // Hämta de senaste meddelandena för rummet och skicka till klienten
  harperGetMessages(room) // får denna error Cannot find name 'room'
  .then((last100Messages) => {
    socket.emit('last_100_messages', last100Messages);
  })
  .catch((err) => console.log(err));

    // Skicka aktuella användare i rummet till alla
    let chatRoomUsers: any[] = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);

    // Lägg till användaren i arrayen
    allUsers.push({ id: socket.id, username, room });
  });

  socket.on('disconnect', () => {
    // Ta bort användaren från arrayen när de kopplar ifrån
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    console.log(`User disconnected ${socket.id}`);
  });

  socket.on('send_message', async (data: any) => {
    const { message, username, room, __createdtime__ } = data;
    // Skicka meddelandet till alla användare i rummet, inklusive avsändaren
    io.in(room).emit('receive_message', data);
    try {
      // Spara meddelandet i databasen
      const response = await SaveMessageInDatabase(message, username, room, __createdtime__);
      console.log('this is the response:' + ' ' + response);
    } catch (error) {
      console.log('This is he error from catch' + ' ' + error);
    }
  });


});

// Starta servern
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
