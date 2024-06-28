const express = require('express');

const todoRouter = express.Router();
const auth = require('../middleware/auth.middleware');
const{createTodoHandler,getTodosHandler,getTodoHandler,deleteTodoHandler,updateTodoHandler} = require('../controllers/todo.controller')



todoRouter.post('/create',auth,createTodoHandler )
todoRouter.get('/view',auth,getTodosHandler )
todoRouter.get('/view/:todoId',auth,getTodoHandler)
todoRouter.delete('/delete/:todoId',auth, deleteTodoHandler)
todoRouter.patch('/update/:todoId', auth, updateTodoHandler)

module.exports = todoRouter;

