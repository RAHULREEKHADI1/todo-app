import Todo from "../model/todo.model.js"


export const createTodo =async (req,res)=>{
    const todo = new Todo({
        title:req.body.title,
        completed:req.body.completed,
        user:req.user._id,
    })

    try{
        const newTodo =await todo.save();
        res.status(201).json({
            message:"Todo created successfully",newTodo
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Error occuring in todo creation"
        })
    }
}

export const getTodo =async (req,res)=>{
    try{
        const todos = await Todo.find({user:req.user._id})//fetched todo for logged in user only
        res.status(201).json({
            message:"Todo fetched successfully",todos
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Error occuring in todo fetching "
        })
    }
}

export const updateTodo = async(req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        res.status(201).json({
            message:"Todo updated successfully",todo
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Error occuring in updating the todos"
        })
    }
}

export const deleteTodo = async (req,res)=>{
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }
        res.status(201).json({
            message:"Todo deleted successfully"
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Error in deleting the data from todo"
        })
    }
}