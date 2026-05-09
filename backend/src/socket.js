let io;

const initSocket = (socketIo) => {
  io = socketIo;
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const emitSlotBooked = (expertId, date, time) => {
  if (io) {
    io.emit("slotBooked", { expertId, date, time });
  }
};

const emitSlotFreed = (expertId, date, time) => {
  if (io) {
    io.emit("slotFreed", { expertId, date, time });
  }
};

module.exports = { initSocket, emitSlotBooked, emitSlotFreed };
