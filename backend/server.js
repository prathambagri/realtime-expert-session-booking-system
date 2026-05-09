
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { initSocket } = require("./src/socket");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL },
});

initSocket(io);

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/experts", require("./src/routes/expertRoutes"));
app.use("/bookings", require("./src/routes/bookingRoutes"));

app.use(require("./src/middleware/errorHandler"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
