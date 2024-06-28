const express = require('express');
require('dotenv').config();
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const todoRouter = require('./routes/todo.routes')
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());
server.use('/user',userRouter);
server.use('/todo',todoRouter);



const port = process.env.PORT || 3000;

server.listen(port, async() => {
    try{
       await connection;
       console.log(`Database connected and server is running on port ${port}`);
    }
    catch(err){
        console.log(err);
    }
})