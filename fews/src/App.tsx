import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      setMsg(...msg, message);
      console.log("Message received:", message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return <>hi there{msg}</>;
}

export default App;
