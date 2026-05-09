import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (onSlotBooked) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

    socketRef.current.on("slotBooked", (data) => {
      onSlotBooked(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current;
};

export default useSocket;
