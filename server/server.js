require('dotenv').config();
const express = require("express");
const path = require('path')
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// Apollo Server
const { ApolloServer, gql } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
// Database 
const { Question } = require('./models')
const db = require('./config/connection');
const { error } = require('console');
// App Config
const allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com'];
const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://tweeter-4z96.onrender.com' : 'http://localhost:3000'
})); // set up cors to only allow from deployed site url

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
});


const apolloServer = new ApolloServer({ typeDefs, resolvers });

// getting questions array for socket emit
const questions = []

const setQuestions = async () => {
  const here = await Question.find()
  here.map((item) => questions.push(item));
}

setQuestions();

async function startApolloServer() {
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer));
  console.log('running')


  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' ? 'https://tweeter-4z96.onrender.com/' : "http://localhost:3000", // Replace with your client URL
      methods: ["GET", "POST"]
    }
  });


  // checking if should emit to all users or only one user
  function emitCurrentQuestion(user) {
    if (!user) {
      io.emit("set_question", { question: questions[currentQuestionIndex].question });
    }
    else {
      io.to(user).emit("set_question", { question: questions[currentQuestionIndex].question });
    }
  }

  // Question Timer
  let currentQuestionIndex = 0; // index on server start

  const questionInterval = 60 * 1000; // 15 seconds, change to something more reasonable in production

  function startQuestionInterval() {
    setInterval(() => {
      currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
      emitCurrentQuestion();
    }, questionInterval); 
  }

  startQuestionInterval();

  // client connection responses.
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });

    socket.on("get_question", () => {
      emitCurrentQuestion(socket.id);
    })
   
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
    server.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
      console.log('graphql available at http://localhost:3001/graphql');
    });
  })
};

startApolloServer();

// code to prevent render deploy server spindown
if (process.env.NODE_ENV === 'production') {
  const url = 'https://tweeter-4z96.onrender.com';
  const interval = 60 * 1000 * 5; // 5 minutes
  const reloadSite = () => {
    fetch(url)
      .then(res => {
        console.log(`reloaded at ${new Date().toISOString()}: status ${res.status}`);
      })
      .catch(err => {
        console.error(`error at ${new Date().toISOString}`, err.message);
      });
  };
  setTimeout(() => {
    setInterval(reloadSite, interval)
  }, interval);
};