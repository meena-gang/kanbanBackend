const TodoModel = require('../model/Todo.model')

const createTodoHandler = async(req,res) => {
    const{task, status, user_id, role} = req.body;
    
        try{
            const todo = new TodoModel({task, status, user_id});
            await todo.save();
            res.status(201).send({"msg":"todo created"});
        }
        catch(err){
            res.status(400).send({"msg": err.message});
        }
    
}

const getTodosHandler =  async(req,res) => {
    try{
        const todos = await TodoModel.find();
        res.status(200).send({"data" : todos});
    }
    catch(err){
        res.status(400).send({"msg": err.message});
    }
}

const getTodoHandler =  async(req,res) => {
    const{todoId} = req.params;
    try{
        const todo = await TodoModel.findOne({_id:todoId});
        res.status(200).send({"data" : todo});
    }
    catch(err){
        res.status(400).send({"msg": err.message});
    }
}

const deleteTodoHandler = async(req,res) => {
    const{todoId} = req.params;
    const{role} = req.body;
    try{
        if(role === "admin"){
            const result = await TodoModel.deleteOne({_id:todoId});
            if(result.deletedCount === 0){
                res.status(404).send({"msg": "todo not found"});
            }
            res.status(200).send({"msg" : "todo has been deleted"});
        }else{
            res.status(401).send({"msg": "Unauthorized"});
        }

    }catch(err){
        res.status(400).send({"msg": err.message});
    }
}

const updateTodoHandler = async(req,res) => {
    const{todoId} = req.params;
    const{status, user_id, role} = req.body;
    try{
               const todo = await TodoModel.findOne({_id:todoId});
           
                await TodoModel.updateOne({_id:todoId},{$set:{status}});
                res.status(200).send({"msg": "todo updated successfully"});
            
    }catch(err){
        res.status(400).send({"msg": err.message});
    }


}

module.exports = {createTodoHandler, getTodoHandler, getTodosHandler, deleteTodoHandler, updateTodoHandler}
