const jwt = require("jsonwebtoken");
const User = require("../schema/employeeSchema");

const employeeAuthenticate =async (req,res,next) =>
{
try{
    const token = req.cookies.jwtoken;
    console.log("=========");
    console.log(token);
    console.log("=========");
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token": token});
    console.log(verifyToken._id);
    console.log(_id);
    if(!rootUser){ throw new Error('User not Found')}
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();

}catch(err){
    res.status(401).send('Unauthorized:No Token Provided');
    console.log(err);
}
}
module.exports = employeeAuthenticate;