//1. importing
const express = require("express");
const libModel = require("./model/bookDb");
const cors = require('cors');

//2. ini
const app = new express()
//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

//3.api creation

app.post('/create',async(req,res)=>{
    console.log(req.body)
    var data =await libModel(req.body)
    data.save()
    res.send({status:'data saved'})
})

app.get('/view',async(req,res)=>{
    var data = await libModel.find();
    res.json(data);
})
//delete all books
app.delete('/deletebooks/:id',async(req,res)=>{
    console.log(req.params)
    let id = req.params.id;
    await libModel.findByIdAndDelete(id);
    
    res.json({status:'deleted'})
    
})

//update
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id;

    try{
        var data = await libModel.findByIdAndUpdate(id,req.body)
        res.json({status:"updated"})
    }
    catch(err){
        res.status(500).send(err)
    }
})



//port
app.listen('3008',()=>{
    console.log('port 3008 is up and running')
})