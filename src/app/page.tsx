// Components
"use client"
import IntroPage from '@/components/IntroPage/IntroPage';

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRandomRoom = async () => {
  const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Room',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'v-vpDjt8KKwXoe_7FmscmNq6uOuFn3s_',
    },
    cache: 'no-store',
  });
  const data = await res.json();
  return data.data.roomId;
};

export default async function Home() {
  const roomId = await createRandomRoom();

  console.log({ roomId });

  return <IntroPage roomId={roomId} />;
}
