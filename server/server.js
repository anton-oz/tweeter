const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ApolloServer, gql } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');


const app = express();
app.use(cors());
app.use(express.json());

const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your client URL
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
      const { message, room, user } = data;
      io.to(room).emit("receive_message", { message, user });
      console.log(`Message: ${message} sent to room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  db.once('open', () => {
    server.listen(3001, () => {
      console.log("Server is running on port 3001");
      console.log('graphql available at http://localhost:3001/graphql');
    });
  })
};

startApolloServer();
