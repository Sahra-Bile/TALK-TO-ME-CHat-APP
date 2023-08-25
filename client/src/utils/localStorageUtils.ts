

// Save messages to localStorage for a specific room
export function saveMessageToLocalStorage(room: string, message: any): void {
    const messagesFromLocalStorage = getMessagesFromLocalStorage(room);
    messagesFromLocalStorage.push(message);
    localStorage.setItem(room, JSON.stringify(messagesFromLocalStorage));
  }
  
  // Get messages from localStorage for a specific room
  export function getMessagesFromLocalStorage(room: string): any[] {
    const messagesFromLocalStorage = localStorage.getItem(room);
    if (messagesFromLocalStorage) {
      return JSON.parse(messagesFromLocalStorage);
    }
    return [];
  }
  