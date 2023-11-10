const express = require('express');
const cors = require("cors")
const app = express();

//Connect to the DB
require('./db/dbconn');

//cors
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Router 
app.use(express.json());
app.use(require('./router/router'));
                                 
//PORT
const PORT = 4000;
app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`));