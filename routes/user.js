const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//--------------- Registre ----------------//
router.post( '/register', async (req, res) => {
try{
data=req.body;
usr= new User(data);

salt = bcrypt.genSaltSync(10);                              //crypt key
cryptedPass = await bcrypt.hashSync(data.password , salt);  //pwd crypted
usr.password = cryptedPass;                                 //add pwd to usr

savedUser=await usr.save();
res.status(200).send(savedUser);


}catch(error){
  res.status(400).send(error);
}

})
//***************************************************** */
router.post( '/login', async (req, res) => {

    data=req.body;
user = await User.findOne({email: data.email});
if(!user){
  res.status(404).send('email or  password incorrect !');
}
else{
  validPass = bcrypt.compareSync(data.password, user.password);   //check if the password is correct
if(!validPass){
  res.status(401).send(' email or password incorrect ! ');
}else{
  payload = {                     //
    _id :  user._id,              //
    name : user.name,             // Session
    lastname : user.lastname,     //
    email : user.email            //
  }                               //
  token = jwt.sign( payload , '123456'  )         //crypt key
  res.status(200).send({mytoken : token})           //return a token for the client side
}
}



})





//-----------Create User-----------------//
router.post('/create',async (req,res)=>{
 try{
     data=req.body;
 usr= new User(data);
 savedUser=await usr.save();
 res.status(200).send(savedUser);
 } catch (err){
     res.status(400).send(err);
 }});
    
 //*****************************************************//
 //---------- Get All Users -----------------//
 router.get('/getAll',async(req,res)=>{
   try{
 //users=await User.find({lastname :'maknine'});
 users=await User.find();
 res.status(200).send(users);
   }  catch(err){
 res.status(400).send(err);
   }
 })
  //*****************************************************//
 //---------- Get User By Id -----------------//
 router.get('/getById/:id', async(req,res)=>{
     try{
 myid= req.params.id;
 user=await User.findOne({_id:myid});
 res.status(200).send(user);
     } catch (err){
 res.status(400).send(err);
     }
  })
 //*****************************************************//
 //---------- Update User -----------------//
 router.put('/update/:id',async(req,res)=>{
 try{
 data=req.body;
 var id=req.params.id;
 user=await User.findByIdAndUpdate({_id:id},data);
 res.status(200).send(user);
 }catch(error){
   res.status(400).send(error);
 }
  })
 //*****************************************************//
 //---------- Delete User -----------------//
 router.delete('/delete/:id', async(req,res)=>{
 try{
   var id= req.params.id;
 user=await User.findByIdAndDelete({_id:id});
 res.status(200).send("User  "+ user + "has been deleted");
 }
 catch (err){
 res.status(400).send(err);
 }
   })
 //*****************************************************//
 
 




 module.exports = router;