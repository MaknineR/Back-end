const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const multer = require('multer');   //bibliothèque upload file 


//--------- Upload File  ------------//
filename = '';

const mystorage = multer.diskStorage({
    destination:'./images', 
   filename:(req, file, redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];  //date+extension
        redirect(null , fl);
        filename=fl;
    }
})
const upload = multer({storage:mystorage});
//*********************************************** */
//--------- Create Product ------------//
router.post('/create', upload.any('image') , async (req,res)=>{  //upload  file  image
    try{
  data=req.body;
  product= new Product(data);
  product.image = filename;    //upload file image
  prdct=await product.save();
  filename = '';              //upload file image
  res.status(200).send(prdct);
    }catch(error){
        res.status(400).send(error);
    }
})
//************************************ */
//--------- Get All Products ---------  //
router.get('/getAll', async (req,res)=>{
    try{
products= await  Product.find();
res.status(200).send(products);
    }catch(eroor){
        res.status(400).send(error);
    }
})
//************************************ */
//--------- Get Products By Id ---------  //
router.get('/getById/:id' , async (req,res)=>{
    try{
    var     id=req.params.id;
product=await Product.findById({_id:id});
res.status(200).send(product);
    }catch(error){
        res.status(401).send(error);
    }
})
//************************************ */
//--------- Delete Product ---------  //
router.delete('/delete/:id', async (req,res)=>{
    try{
var id=req.params.id;
product=await Product.deleteOne({_id:id});
res.status(200).send(product);
    }catch(error){
        res.status(400).send(error);
    }
})
//************************************ */
//--------- Update Product ---------  //
router.put('/update/:id', upload.any('image') ,async (req,res)=>{
    try{
var id=req.params.id;
data= req.body;
data.image = filename;    //upload file image
product=await Product.findByIdAndUpdate({_id:id},data)
res.status(200).send(product);
filename='';
    }catch(error){
        res.status(400).send(error);
    }
})
//************************************ */








module.exports = router;



