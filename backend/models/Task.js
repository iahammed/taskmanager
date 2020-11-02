const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type:String    
    },
    isComplete: {
        type:Boolean,
        default:false
    }
})

//Transform _id to id
TaskSchema.method('transform', function() {
    var obj = this.toObject(); 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

module.exports = mongoose.model('Tasks', TaskSchema)

