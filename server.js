const express =require('express');
const app = express();
require('./config/connect');
app.use(express.json());

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');



//http://localhost:3000/product/
app.use('/product',productRoute);

//http://localhost:3000/user/
app.use('/user',userRoute);


app.use('/getImage',express.static('./images'));






app.listen(3000,()=>{
    console.log('server is running');
});