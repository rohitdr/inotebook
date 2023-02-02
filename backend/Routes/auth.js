const express = require('express')
const router = express.Router();
const User = require('../Modals/User')
const  bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');
const jwtsecret="rohitdr"
//creating user Route1
router.post('/createUser',[
    body('email','Enter a correct email').isEmail(),
    body('name','Enter correct name').isLength({ min: 5 }),
],async(req,res)=>{
  //error for bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user =  await User.findOne({'email':req.body.email});
    if(user){
     return  res.status("400").json({'error':"sorry user already exits"})
    }
    const salt = await  bcrypt.genSalt(10);
    const  securedPass = await bcrypt.hash(req.body.password,salt);
    //creating user
    user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: securedPass
      })
  //    .then(user => res.json(user)).catch(err=> {console.log(err)
  //  res.json({error:'no reapating'}) })
  const data ={
    user:{
      id :user.id
    }
  }
  const auth_token =jwt.sign(data,jwtsecret)
  res.json({auth_token})
    }
    catch(error){
      console.error(error.message)
      res.status("500").send("some thing is wrong")
    }
})

//authenticating users Route2
router.post('/login',[
  body('email','Enter a correct email').isEmail(),
  body('password',"password can't be blank").exists()
 
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password}=req.body
try{
let user = await User.findOne({email});
if(!user){
   return res.status('400').send("Please use correct correndentials")
}
const passCompare = await bcrypt.compare(password, user.password)
if(!passCompare){
  res.status('400').send('Please use correct correndentials')
}
const data ={
  user:{
    id :user.id
  }
}
const auth_token =jwt.sign(data,jwtsecret)
res.json({auth_token})
}catch(error){
console.error(error.message)
res.status('500').send('something went wrong')
}
})

//Route 3 get user detail login required
router.post('/getuser',fetchuser,async(req,res)=>{
try{
  const id = req.user.id;
  const user = await User.findById(id).select("-password")
  res.send(user)
}catch(error){
  console.error(error.message);
  res.status(500).send("something is wrong");
}
})
module.exports=router