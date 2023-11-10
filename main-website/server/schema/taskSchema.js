const mongoose=require('mongoose')

const { Schema } = mongoose;

const schema = new Schema({
    task_name:{
        type:String,
        required: true
    },
    task_description:{
        type:String,
        required:true
    },
    due_date:{
        type:String,
        required:true
    }
})

const taskSchema = mongoose.model('TASK', schema);

module.exports = taskSchema;