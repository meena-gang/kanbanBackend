const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    task: {type:String, required:true},
    status: {type:String, required:true},
    user_id:{type:String,required:true}
},{
    versionKey:false,
    timeStamps:true
})

const TodoModel = mongoose.model('todo',todoSchema);

module.exports = TodoModel;  //exporting the model so that it can be used in other files