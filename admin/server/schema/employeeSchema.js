//Employee schema

const mongoose=require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { Schema } = mongoose;

const schema = new Schema({
firstname: {
    type: String,
    required: true
},
lastname: {
    type: String,
    required: true
},
fullname: {
    type: String,
},
email: {
    type: String,
    required: true
},
phone: {
    type: Number,
    required: true
},
emergencyphone: {
    type: Number,
    required: true
},
role: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
cpassword: {
    type: String, 
    required: true
},
employeeid: {
    type: String,
},
manager:{
    type: String,
},
tasks:[
    {
        task_name: {
            type: String,
            required: true
        },
        task_description: {
            type: String,
            required: true
        },
        due_time: {
            type: Date,
            required: true
        },
    }
],





images: [
    {
        filename: {
            type: String,
            unique: true, 
            
        },
        originalName: {
            type: String,
            
        },
        path: {
            type: String,
            
        },
        avatar: {
            type: String,
            
        },
    },
],

created: { 
    type: Date, 
    default: Date.now 
},
tokens:[
    {
        token: {
            type: String,
            required: true
        }
    }
],
});


//Hashing the password
schema.pre('save', async function (next){
  if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password, 12);
     this.cpassword = await bcrypt.hash(this.cpassword, 12);
 }
 next();
});

//Generating Token
schema.methods.generateAuthToken = async function(){
try{
 let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
 this.tokens = this.tokens.concat({token:token});
 await this.save();
 return token;
}catch(err){
 console.log(err);
}
}

const employeeSchema = mongoose.model('EMPLOYEE', schema);

module.exports = employeeSchema;