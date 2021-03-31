const createError=require('http-errors');
const Service = require('../service');

// const getData =(req,res)=>{
//     res.send("Hello");
// }

const getData=async(req,res)=>{
    const data = await Service.getData();
         
res.status(200).send(data);
};

const getdataById=async(req,res)=>{
    const data = await Service.getDataById(req.params.id);
console.log(data)
    res.status(200).send(data);
    };

const addData=async(req,res,next)=>{
    // const scheme={
    //     id: Joi.string().min(3).required()
    //     // id:Joi.required()
    // };

    // const result= Joi.validate(req.body.id,scheme);

    // const data = await  Service.getData();
    if(!req.body.id || !req.body.name){
     next(createError());
     return;
        // res.status(400).send("wrong data");
        // return;
    };
const newdata=await Service.adddata(req.body);
 console.log(newdata);
res.status(200).send(newdata); 

};

const deleteById=async(req,res)=>{
    const data= await Service.deleteById(req.params.id);
    res.status(200).send(data);
};


const updatebyId=async(req,res)=>{

    if(!req.body.id || !req.body.name ){
        res.status(400).send("wrong data");
        return;
    }
    const data= await Service.updateById(req.params.id,req.body);
    res.send(data);

}
module.exports.getData=getData;
module.exports.addData=addData;
module.exports.getDataById=getdataById;
module.exports.deleteById=deleteById;
module.exports.updateById=updatebyId;