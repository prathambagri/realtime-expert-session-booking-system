import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

let globalSocket = null;

const useSocket = (onSlotBooked, onSlotFreed) => {
  const onSlotBookedRef = useRef(onSlotBooked);
  const onSlotFreedRef = useRef(onSlotFreed);

  useEffect(() => {
    onSlotBookedRef.current = onSlotBooked;
  }, [onSlotBooked]);

  useEffect(() => {
    onSlotFreedRef.current = onSlotFreed;
  }, [onSlotFreed]);

  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io(import.meta.env.VITE_SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
      });
    }

    const handleSlotBooked = (data) => {
      console.log("slotBooked:", data);
      if (onSlotBookedRef.current) onSlotBookedRef.current(data);
    };

    const handleSlotFreed = (data) => {
      console.log("slotFreed:", data);
      if (onSlotFreedRef.current) onSlotFreedRef.current(data);
    };

    globalSocket.on("slotBooked", handleSlotBooked);
    globalSocket.on("slotFreed", handleSlotFreed);

    return () => {
      globalSocket.off("slotBooked", handleSlotBooked);
      globalSocket.off("slotFreed", handleSlotFreed);
    };
  }, []);
};

export default useSocket;
