// User Schema
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  tokens:[
    {
        token: {
            type: String,
            required: true
        }
    }
  ],

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


const userSchema = mongoose.model('USER', schema);

module.exports = userSchema;
