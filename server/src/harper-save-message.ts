import axios from 'axios';

export async function SaveMessageInDatabase(message: string, username: string, room: string, __createdtime__: string) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) throw new Error('Missing database URL or password');

  const data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room,
        __createdtime__,
      },
    ],
  });

  const config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log('Request successful:', response.data);
    return JSON.stringify(response.data);
  } catch (error:any) {
    // console.error('Request failed:', error.response);
    throw error;
  }

  
}

