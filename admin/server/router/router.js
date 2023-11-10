const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
router.use(cookieParser());

//DB
require('../db/dbconn');

//Middlewares
const authenticate = require("../middleware/authenticate");
const upload = require('../middleware/upload');

//Schema
const adminSchema = require("../schema/adminSchema");
const managerSchema = require("../schema/managerSchema");
const hrSchema = require("../schema/hrSchema");
const employeeSchema = require("../schema/employeeSchema");

//cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

//------------------------------------------------------------------------------------------------

// Admin Login Page
router.post('/adminsignin', async (req,res)=>{
    try
    {
        let token;
        const { email, password}=req.body;
        if(!email || !password){
         console.log("Please fill the data");
         return res.status(400).json({errror:"Please fill the data"})
        }
        const userLogin = await adminSchema.findOne({email:email}); 
        if(userLogin)
        {
           const isMatch = await bcrypt.compare(password, userLogin.password);
           token = await userLogin.generateAuthToken();
           res.cookie("jwtoken",token,{
             expires:new Date(Date.now()+ 25892000),
             httpOnly:true
           });
           if(!isMatch)
           {
             console.log("Invalid Credentials");
             return res.status(400).json({error:"Invalid Credentials"});
           }
           else
           {
             console.log("Admin SignIn Successful");
           res.json({message:"Admin SignIn Successful"});
           }
        }
        else
        {
         console.log("Email you have entered has not registered or incorrect");
         return res.status(400).json({error:"Email you have entered has not registered or incorrect"});
        }
     }  
     catch(err)
     {
        console.log(err);
     }
 })

// admin Registration
router.post('/adminregister', async(req,res)=>{
    const { email, password, cpassword} = req.body;
    if(!email || !password || !cpassword)
    {
        console.log("please fill the field properly");
        return res.status(422).json({error: "please fill the field properly"});
    }
    if(password != cpassword)
    {
        console.log("please confirm the same password");
        return res.status(422).json({error: "please confirm the same password"});
    }
    try{ 
        const userExist = await adminSchema.findOne({ email: email });
        if(userExist){
            console.log("Email already exists");
        return res.status(422).json({ error: "Email already exists"});
        }
        const user = new adminSchema({email, password, cpassword}); 
       const userRegister = await user.save();
        if(userRegister){
            console.log(user);
            console.log("admin registered successfully");
            res.status(201).json({ message: "admin registered successfully"});
        }
        else{
            console.log("failed to register");
            res.status(500).json({error: "failed to register"});
        }
    }
    catch(err){
        console.log(err);
    }
});


// Manager Registration
router.post('/manager-register', upload.single('image'), async (req, res) => {
    const { firstname, lastname, email, phone, department, password, cpassword } = req.body;
      if(!firstname || !lastname || !email || !phone || !department || !password || !cpassword )
      {
          console.log("please fill the field properly");
          return res.status(422).json({error: "please fill the field properly"});
      }
      if(password != cpassword)
      {
          console.log("please confirm the same password");
          return res.status(422).json({error: "please confirm the same password"});
      }
      try{ 
        const userExist = await managerSchema.findOne({ email: email });
        if(userExist){
            console.log("Email already exists");
        return res.status(422).json({ error: "Email already exists"});
        }
    }
    catch(err){
        console.log(err);
    }
    const result = await cloudinary.uploader.upload(req.file.path)
    const manager = new managerSchema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      password: req.body.password,
      cpassword: req.body.cpassword,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      avatar : result.secure_url
    });
     const managersave = await manager.save()
      if(managersave){
        console.log(manager);
            console.log("manager registered successfully");
               res.status(201).json({ message: "manager registered successfully"});
      }
      else{
        console.log("failed to register");
            res.status(500).json({error: "failed to register"});
      };
});
 
// hr Registration
router.post('/hr-register', upload.single('image'), async (req, res) => {
    const { firstname, lastname, email, phone, password, cpassword } = req.body;

      if(!firstname || !lastname || !email || !phone || !password || !cpassword )
      {
          console.log("please fill the field properly");
          return res.status(422).json({error: "please fill the field properly"});
      }
      if(password != cpassword)
      {
          console.log("please confirm the same password");
          return res.status(422).json({error: "please confirm the same password"});
      }
      try{ 
        const userExist = await hrSchema.findOne({ email: email });
        if(userExist){
            console.log("Email already exists");
        return res.status(422).json({ error: "Email already exists"});
        }
    } 
    catch(err){
        console.log(err);
    }
    const result = await cloudinary.uploader.upload(req.file.path)
    const hr = new hrSchema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      cpassword: req.body.cpassword,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      avatar : result.secure_url
    });
     const hrsave = await hr.save()
      if(hrsave){
        console.log(hr);
            console.log("hr registered successfully");
               res.status(201).json({ message: "hr registered successfully"});
      }
      else{
        console.log("failed to register");
            res.status(500).json({error: "failed to register"});
      };
}); 


// employee Registration
router.post('/employee-register', upload.array('images', 5), async (req, res) => {
  const { firstname, lastname, email, phone, emergencyphone, role, address, password, cpassword } = req.body;
 
    if(!firstname || !lastname || !email || !phone || !emergencyphone || !role || !address || !password || !cpassword )
    {
        console.log("please fill the field properly");
        return res.status(422).json({error: "please fill the field properly"});
    }
    if(password != cpassword)
    {
        console.log("please confirm the same password");
        return res.status(422).json({error: "please confirm the same password"});
    }
    try{ 
      const userExist = await employeeSchema.findOne({ email: email });
      if(userExist){
          console.log("Email already exists");
      return res.status(422).json({ error: "Email already exists"});
      }
  }
  catch(err){
      console.log(err);
  }


  const imageFiles = req.files;
  // Iterate through image files and save them to the database or Cloudinary
  const uploadedImages = [];
  for (const file of imageFiles) {
      // Handle each image file and save it to the database or Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push({
          filename: file.filename,
          originalName: file.originalname,
          path: file.path,
          avatar: result.secure_url,
      }); 
  } 
  console.log(uploadedImages);

  const employee = new employeeSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    emergencyphone: req.body.emergencyphone,
    role: req.body.role,
    address: req.body.address,
    password: req.body.password,
    cpassword: req.body.cpassword, 
    images: uploadedImages,
  });
   const employeesave = await employee.save()
    if(employeesave){
      console.log(employee);
          console.log("employee registered successfully");
             res.status(201).json({ message: "employee registered successfully"});
    }
    else{
      console.log("failed to register");
          res.status(500).json({error: "failed to register"});
    };
});








  // handle GET request for all managers
  router.get('/managers', async (req, res) => {
  try {
    const managers = await managerSchema.find();
    res.send(managers);
  }catch (err) {
    res.status(500).send(err);
  }
  });
  // handle PUT request for editing a managers
  router.put('/managers/:id', async (req, res) => {
    const managerID = req.params.id;
    const updatedUser = req.body;
    try {
      const user = await managerSchema.findByIdAndUpdate(managerID, updatedUser, { new: true });
  
      if (!user) {
        res.status(404).send(`User with ID ${managerID} not found.`);
      } else {
        res.send(`User ${user.name} updated successfully!`);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // handle DELETE request for deleting a managers
  router.delete('/managers/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await managerSchema.findByIdAndRemove(userId);
  
      if (!user) {
        res.status(404).send(`User with ID ${userId} not found.`);
      } else {
        res.send(`User ${user.name} deleted successfully!`);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });












  // handle GET request for all hrs
  router.get('/hrs', async (req, res) => {
    try {
      const hrs = await hrSchema.find();
      res.send(hrs);
    }catch (err) {
      res.status(500).send(err);
    }
    });
    // handle PUT request for editing a hrs
    router.put('/hrs/:id', async (req, res) => {
      const managerID = req.params.id;
      const updatedUser = req.body;
      try {
        const user = await hrSchema.findByIdAndUpdate(managerID, updatedUser, { new: true });
    
        if (!user) {
          res.status(404).send(`User with ID ${managerID} not found.`);
        } else {
          res.send(`User ${user.name} updated successfully!`);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });
    // handle DELETE request for deleting a hrs
    router.delete('/hrs/:id', async (req, res) => {
      const userId = req.params.id;
    
      try {
        const user = await hrSchema.findByIdAndRemove(userId);
    
        if (!user) {
          res.status(404).send(`User with ID ${userId} not found.`);
        } else {
          res.send(`User ${user.name} deleted successfully!`);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });





    // handle GET request for all hrs
  router.get('/employees', async (req, res) => {
    try {
      const hrs = await employeeSchema.find();
      res.send(hrs);
    }catch (err) {
      res.status(500).send(err);
    }
    });
    // handle PUT request for editing a hrs
    router.put('/employees/:id', async (req, res) => {
      const managerID = req.params.id;
      const updatedUser = req.body;
      try {
        const user = await employeeSchema.findByIdAndUpdate(managerID, updatedUser, { new: true });
    
        if (!user) {
          res.status(404).send(`User with ID ${managerID} not found.`);
        } else {
          res.send(`User ${user.name} updated successfully!`);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });
    // handle DELETE request for deleting a hrs
    router.delete('/employees/:id', async (req, res) => {
      const userId = req.params.id;
    
      try {
        const user = await employeeSchema.findByIdAndRemove(userId);
    
        if (!user) {
          res.status(404).send(`User with ID ${userId} not found.`);
        } else {
          res.send(`User ${user.name} deleted successfully!`);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });



module.exports = router;