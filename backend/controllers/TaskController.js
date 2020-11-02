const { request } = require('express')
const Task = require('../models/Task')

// Listing of the resource.
exports.index =  async (req, res) => {
    try {
        const tasks = await Task.find()
        //Tranform _id to id
        let transfTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            transfTasks.push(tasks[i].transform());
        }
        res.json(transfTasks)
    } catch (err){
        res.json({
            message:err
        })
    }
}

// List of the specified resource.
exports.show =  async (req, res) => {    
    try{
        const task = await Task.findById(req.params.taskId)
        // Send Tranform _id to id
        res.json(task.transform())
    } catch (err) {
        res.json({
            message:err
        })
    }
}

// Store a newly created resource in storage.
exports.store = async (req, res) => {
    const { title, description } = req.body
    if ((!title || title === "") || (!description || description === "")) {
        res.status(400).send({
            message: "Title and Description is required"
        })
    }
    const task = new Task(req.body)
    try{
        const savedTask = await task.save()
        res.json(savedTask.transform())
    } catch (err){
        res.json({
            message:err
        })
    }
}

//Update the specified resource in storage.
exports.update = async (req, res) => {    
    try{
        const updatedTask = await Task.updateOne(
            {_id: req.params.taskId}, 
            { $set: {
                    title: req.body.title, 
                    description: req.body.description,
                    comments: req.body.comments,
                    isComplete: req.body.isComplete
                }
            } )
        res.json(updatedTask)
    } catch (err) {
        res.json({
            message:err
        })
    }
}

//Delete the specified resource in storage.
exports.delete = async (req, res) => {    
    try{
        const removedTask = await Task.remove({_id: req.params.taskId})
        res.json(removedTask)
    } catch (e) {
        res.json({
            message:e
        })
    }
}
