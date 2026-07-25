const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { initSocket } = require("./src/socket");
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const aiPreparationRoutes = require("./src/routes/aiPreparationRoutes");
const aiChatRoutes = require("./src/routes/aiChatRoutes");
const aiBookingRoutes = require("./src/routes/aiBookingRoutes");

const app = express();
const httpServer = http.createServer(app);
const adminManagementRoutes = require("./src/routes/adminManagementRoutes");

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL },
});

initSocket(io);

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/experts", require("./src/routes/expertRoutes"));
app.use("/bookings", require("./src/routes/bookingRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/admins", adminManagementRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", aiPreparationRoutes);
app.use("/api/ai", aiChatRoutes);
app.use("/api/ai", aiBookingRoutes);

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
