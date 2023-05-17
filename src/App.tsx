import { useEffect, useMemo, useState } from "react";
import "./app.css";

import { io } from "socket.io-client";

const url = import.meta.env.VITE_SERVER_URL as string;

function App() {
 const [count, setCount] = useState(0);
 const [img, setImg] = useState("");

 const imageUrl = useMemo(() => {
  if (img) {
   const blob = new Blob([img], { type: "image/png" });
   return URL.createObjectURL(blob);
  }
 }, [img]);

 useEffect(() => {
  const socket = io(url);

  socket.on("connect", () => {
   console.log("connected");
  });

  socket.on("server-send-screenshot", (data) => {
   console.log(data);
   setImg(data);
  });

  socket.on("client", (data) => {
   setCount(data);
  });

  return () => {
   socket.disconnect();
   console.log("disconnected");
  };
 }, []);

 return (
  <div>
   <h1>Client Connected: {count}</h1>

   <div className='image-container'>
    <img src={imageUrl} alt='' />
   </div>
  </div>
 );
}

export default App;
