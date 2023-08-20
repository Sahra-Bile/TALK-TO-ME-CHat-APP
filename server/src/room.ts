import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';

interface Room {
  id: string;
  name: string;
  createdBy: string;
}

export const CHAT_BOT = 'ChatBot';
export const activeRooms: Room[] = [];

export function createRoom(req: Request, res: Response) {

    const { roomName, username } = req.body;

    const roomId = uuidv4();
  
    activeRooms.push({ id: roomId, name: roomName, createdBy: username });
  
    res.json({ id: roomId, name: roomName });
  
    console.log(`Rum "${roomName}" (ID: ${roomId}) skapat av ${username}`);
  
}
export const roomRoutes = express.Router();
roomRoutes.post('/', createRoom);
