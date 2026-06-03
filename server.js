const express=require('express');
const cors=require('cors');
const bodypraser=require('body-parser');
const app=express();
app.use(cors());
app.use(bodypraser.json());
app.use(bodypraser.urlencoded({extended:false})); //
app.use(bodypraser.text());
 app.post('/reportData',(req,res)=>{
    console.log(req.body);
    res.status(200).send('OK');
 })
 app.listen(3300,()=>{
     console.log('server is running on port 3300');
 })
