require('./src/models/User');
require('./src/models/TodoList');
const express = require('express');
const authRoutes= require('./src/routes/AuthRoutes');
const app= express ();
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const requireAuth = require('./src/middlewares/requireAuth');
const todoListRoutes = require('./src/routes/TodoListRoutes');
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
});
app.options('*', cors())

app.use(body_parser.json());
app.use(cors());
app.use('/',authRoutes);
app.use('/todo',todoListRoutes);

app.get('/',requireAuth,(req,res)=>{
    return res.json({message:`Idhu SMK vazhangum Todo App!!!!,${req.user.email}`});
});

const mongoUri = "mongodb+srv://smk07:ungalNaan@cluster0.maiue.mongodb.net/todoapp?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB!")
});

mongoose.connection.on('error',(err)=>{
    console.log("Error connecting the server");
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})