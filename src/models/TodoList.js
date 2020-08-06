const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
});

mongoose.model('TodoList',TodoListSchema);