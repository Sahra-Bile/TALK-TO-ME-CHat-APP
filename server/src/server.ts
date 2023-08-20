import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { setupSocket } from './socket';
import { roomRoutes } from './room';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/create_room', roomRoutes);

const server = http.createServer(app);

// Anropa setupSocket för att sätta upp Socket.IO-funktionaliteten
setupSocket(server);

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
