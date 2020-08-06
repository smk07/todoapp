const express= require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
const mongoose = require('mongoose');
const TodoList = mongoose.model('TodoList');

router.use(requireAuth);
router.get('/',async(req,res)=>{
    try{
        const todoList = await TodoList.find({userId:req.user._id});
        return res.status(200).json({data:todoList});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"Something Went Wrong"});
    }
});

router.post('/',async(req,res)=>{
    const {title,description} = req.body;
    
    try{
        const todolist = new TodoList({userId:req.user._id,title,description});
        await todolist.save();
        return res.status(201).json({data:todolist});
    }
    catch(err){
        console.log(err);
        return res.status(401).json({error:{
            message:err.message
        }});
    }
});

router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    // console.log(id);

    const {title,description} = req.body;
    // console.log(title,description);
    try{
        const todolist = await TodoList.findByIdAndUpdate({_id:id},{$set:{title,description}},{useFindAndModify:false,new:true});
        return res.status(202).json(todolist);
    }
    catch(err){
        console.log(err);
        return res.status(401).json({error:{message:err.message}});
    }
    
    // return res.status(202).json(todolist);
    
    //(err,result)=>{
    //     if(err){
    //         return res.status(401).json({error:{message:err.message}});
    //     }
    //     console.log(result);
    //     return res.status(202).json(result);
    // });
    // await todolist.save();
    // return res.status(202).json({data:todolist});
    // }
    // catch(err){
    //     return res.status(401).json({error:{message:err.message}});
    // }

    // return res.status(200).json({id});
});

router.delete('/:id',async (req,res)=>{
    const {id}= req.params;

    await TodoList.findByIdAndDelete({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).json({error:{message:err.message}});
        }

        // console.log(result);
        return res.status(202).json({data:result});
    });
}); 


module.exports = router;