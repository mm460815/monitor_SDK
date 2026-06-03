const express=require('express');
const cors=require('cors');
const bodypreser=require('body-parser');
const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false})); //
app.use(bodyparser.text());
