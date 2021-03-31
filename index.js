const Joi = require('joi');
const express= require('express');
const routes= require('./routes/router');
const createError=require('http-errors');
const fetch = require('node-fetch');

const app= express();

 app.use(express.json());


 app.use('/',routes);


 app.use((req,res,next)=>{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Header","Origin, X-Requested-With,Content-Type,Accept,Authorization");

if(req.method=== "OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
};
next();
 });

 app.use((req,res,next)=>{
    next(createError(404, "Page not Found"));
    });
    
    app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
    });

    async function getWeather() {
        const product = await fetch(
                "https://productapifilesystem.herokuapp.com/1"
            );
        let response = await product.text();
        console.log(response);
    }
    
    getWeather();





    // fetch('https://productapifilesystem.herokuapp.com/')
    // .then(response => response.json())
    // .then(data => console.log(data));







const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});