const express = require('express');
const cors = require("cors")
const app = express();
const dotenv = require('dotenv')
dotenv.config({path: './config.env' })
const passport = require("passport");
const passportStrategy = require("./passport");

dotenv.config();

// Google Auth - passport
app.use(passport.initialize());
 
//cors gateway to client
// app.use(cors());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
      credentials: true,
      allowedHeaders: "Content-Type, Authorization",
    })
);


// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
//   credentials: true, // Allow credentials (cookies) to be sent with the request
// };

// app.use(cors(corsOptions));

//Connect to the DB
require('./db/dbconn');

//Router 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const authRoute = require("./router/auth");
app.use("/", authRoute);


//Rendering Client
// app.use(express.static("client/dist"));
// app.get("/",function(req,res) {
//     res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// })
                                 
//PORT
const PORT = 4000;
app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`)); 
console.log("========================"); 