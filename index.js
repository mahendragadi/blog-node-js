require('dotenv').config({path:__dirname+'/.env'});


const config = require('./config/');
const userAuth = require('./app/middlewares/authorize');


const mapRoutes = require('express-routes-mapper');

const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = mapRoutes(config.userRoutes,'./app/controllers/',[userAuth]);

app.use('/user',userRoutes);


app.listen(config.port,()=>{
    console.log('Server Started on port : '+config.port);
});