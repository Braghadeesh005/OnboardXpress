//  --------------------        SETUP         ---------------------------

const express = require("express");
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const passport = require("passport");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const authenticate = require('../middleware/authenticate')
const employeeAuthenticate = require("../middleware/employeeAuthenticate")
const upload = require('../middleware/upload')
router.use(cors());

//DB  
require('../db/dbconn')

//Schema 
const employeeSchema = require('../schema/employeeSchema');
const hrSchema = require('../schema/hrSchema');
const managerSchema = require('../schema/managerSchema');
const userSchema = require('../schema/userSchema')
const taskSchema = require('../schema/taskSchema')



//cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// ---------------------   GOOGLE OAUTH 2     ---------------------------

//signup - strategy
router.get("/auth/google/signup", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/signup/callback",
	passport.authenticate("google",{session: false}),
	(req,res) => {
		// successRedirect: process.env.CLIENT_URL,
		// failureRedirect: "/signup/failed",
		const token = req.user.token
		res.cookie("googletoken", token, { path: '/' },{ expires:new Date(Date.now()+ 25892000),httpOnly: true });
		console.log("Cookie stored");
		console.log("========================");
    	res.redirect(process.env.CLIENT_URL);

	}
);

// ---------------------------------------------------------------    ROUTES     ------------------------------------------------------------------

// ------------------------------------------------------------- LOGIN - COMMON TO ALL -------------------------------------------------------------
// Login Page
router.post('/login', async (req,res)=>{
    try
    {
        let token;
        const { name , email, role}=req.body;
 
        if(!email || !name || !role){
         console.log("Please fill the data");
         return res.status(400).json({errror:"Please fill the data"})
        }

		if(role == 'hr'){
			console.log("1");
			let userLogin = await hrSchema.findOne({email:email});
			if(userLogin)
        	{   
           	token = await userLogin.generateAuthToken();
           	res.cookie("hrtoken",token,{
             expires:new Date(Date.now()+ 25892000),
             httpOnly:true
           	});
           	console.log(" SignIn Successful");
			res.send("hr");
           	
        	}
        	else
        	{
         	console.log("Email you have entered has not registered or incorrect");
         	return res.status(400).json({error:"Email you have entered has not registered or incorrect"});
        	}
		}
		else if(role == 'manager'){
			console.log("2");
			let userLogin = await managerSchema.findOne({email:email});
			if(userLogin)
        	{   
           	token = await userLogin.generateAuthToken();
           	res.cookie("managertoken",token,{
             expires:new Date(Date.now()+ 25892000),
             httpOnly:true
           	});
           	console.log(" SignIn Successful");
           	res.send("manager");
        	}
        	else
        	{
         	console.log("Email you have entered has not registered or incorrect");
         	return res.status(400).json({error:"Email you have entered has not registered or incorrect"});
        	}
		}
		else if(role == 'employee'){
			console.log("3");
			let userLogin = await employeeSchema.findOne({email:email});
			if(userLogin)
        	{   
				
           	token = await userLogin.generateAuthToken();
			console.log("-----------");
			console.log(token);
			console.log("---------------");
           	res.cookie("employeetoken",token,{
             expires:new Date(Date.now()+ 25892000),
             httpOnly:true
           	});
			// res.cookie("jwtoken", token, { path: '/' },{ expires:new Date(Date.now()+ 25892000),httpOnly: true });
           	console.log(" SignIn Successful");
           	res.send("employee");
        	}
        	else
        	{
         	console.log("Email you have entered has not registered or incorrect");
         	return res.status(400).json({error:"Email you have entered has not registered or incorrect"});
        	}
		}
		else{
			return res.status(400).json({errror:"Invalid role"})
		}
        
     }  
     catch(err)
     {
        console.log(err);
     }
 })


 // ====================================================== register route ====================================================================
router.post("/register", async (req, res) => {
	const port = 4000;
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
	  return res.status(422).json({ error: "Please fill in all fields..." });
	}
  
	try {
	  const userExist = await userSchema.findOne({ email: email });
	  if (userExist) {
		return res.status(422).json({ error: "Email already exists" });
	  }
  
	  const user = new userSchema({
		name,
		email,
		password,
		verified: false, // Set the initial verified status to false
	  });
  
	  await user.save(); // Save the user in the database, marked as unverified
  
	  const verificationLink = `http://localhost:${port}/verify/${email}`;
  
	  const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
		  user: "210701052@rajalakshmi.edu.in",
		  pass: "avdhjruj",
		},
	  });
  
	  const mailOptions = {
		from: "210701052@rajalakshmi.edu.in",
		to: email,
		subject: "Email Verification",
		text: `Click the following link to verify your email: ${verificationLink}`,
	  };
  
	  transporter.sendMail(mailOptions, async (err) => {
		if (err) {
		  console.error(err);
		  // If there's an error sending the email, handle it here and return a response
		  return res.status(500).json({ error: "Email could not be sent" });
		}
  
		// Send the response after the verification email has been successfully sent
		res.json({ message: "User registered, but not yet verified" });
	  });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: "An error occurred during registration" });
	}
  });
  

  router.get('/verify/:email', async (req, res) => {
	const { email } = req.params;
	console.log(email);
  const user = await userSchema.findOne({ email: email });

  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "Invalid or expired verification token" });
  }

  user.verified = true;

  try {
    await user.save(); // Update the user's status to verified
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while saving user after verification" });
  }
  });


  // User Login Page
router.post('/user-login', async (req,res)=>{
    try
    {
		let token;
        const { email, password}=req.body;
        if(!email || !password){
         console.log("Please fill the data");
         return res.status(400).json({errror:"Please fill the data"})
        }
        const userLogin1 = await userSchema.findOne({email:email}); 
		if(userLogin1.verified != true){
			console.log("Invalid Credentials");
             return res.status(400).json({error:"Invalid Credentials"});
		}
        if(userLogin1)
        {
           const isMatch = await bcrypt.compare(password, userLogin1.password);
           token = await userLogin1.generateAuthToken();
		   res.cookie("usertoken",token,{
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
             console.log("user SignIn Successful");
           res.json({message:"user SignIn Successful"});
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
  
// ============================================================= EMPLOYEE PORTAL ========================================================================


// router.get("/getEmployeeData",employeeAuthenticate, (req,res) => 
// {
//     res.send(req.rootUser);
// });  
router.get("/getEmployeeData", employeeAuthenticate, async (req, res) => {
	try {
	  // Use the `await` keyword to handle the asynchronous operation of `employeeAuthenticate` middleware.
	  await employeeAuthenticate(req, res);
  
	  // Once the middleware is successfully executed, you can access `req.rootUser`.
	  res.send(req.rootUser);
	} catch (err) {
	  // Handle any errors that might occur during middleware execution.
	  res.status(500).send("An error occurred");
	}
  });
  


// ========================================================================== user review - footer page ===================================================================

	//   router.post('/submit-review', authenticate , async (req, res) => {
	// 	try {
	// 		const {message} = req.body;
	// 		const user = await userSchema.findOne({ _id: req.userID });
	// 		if (!user) {
	// 		  return res.status(404).json({ message: 'User not found' });
	// 		}
	  
	// 	  // Create a new review
	// 	  const review = new reviewSchema({
	// 		user: user.displayName,
	// 		email: user.email,
	// 		message: message,
	// 	  });
	  
	// 	  // Save the review to the database
	// 	  await review.save();
	// 	  console.log("message saved");
	// 	  res.status(201).json({ message: 'Review submitted successfully' });
	// 	} catch (error) {
	// 	  console.error(error);
	// 	  res.status(500).json({ error: 'Internal Server Error' });
	// 	}
	//   });
  
//===========================================================


// Manager Registration
router.post('/manager-register', upload.single('image'), async (req, res) => {
    const { firstname, lastname, email, phone, department, password, cpassword } = req.body;
	console.log(firstname);
	console.log(lastname);
	console.log(email);
	console.log(phone);
	console.log(department);
	console.log(password);
	console.log(cpassword);
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

// =========== employee reg ========================

 
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









		router.post('/addtask', async(req,res)=>{
			const { task_name, task_description, due_date} = req.body;
			console.log(task_name);
			console.log(task_description);
			console.log(due_date);
			if(!task_name || !task_description || !due_date)
			{
				console.log("please fill the field properly");
				return res.status(422).json({error: "please fill the field properly"});
			}
			
			try{ 
				// const userExist = await taskSchema.findOne({ email: email });
				// if(userExist){
				// 	console.log("Email already exists");
				// return res.status(422).json({ error: "Email already exists"});
				// }
				const user = new taskSchema({ task_name, task_description, due_date}); 
			   const userRegister = await user.save();
				if(userRegister){
					console.log(user);
					console.log("task added successfully");
					res.status(201).json({ message: "task added successfully"});
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




// handle GET request for all hrs
router.get('/tasks-fetch', async (req, res) => {
	try {
	  const hrs = await taskSchema.find();
	  res.send(hrs);
	}catch (err) {
	  res.status(500).send(err);
	}
	});








  

module.exports = router; 