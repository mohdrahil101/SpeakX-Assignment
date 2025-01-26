const express=require('express');
const mongoose=require('mongoose');
const cors =require('cors');
const model=require('./model');


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/speakx").then((msg)=>console.log("DB connected")).catch((err)=>console.log(err));
app.post("/questions",async(req,res)=>{
    const {query}=req.body;
    console.log(query)
    const response=await model.find({
        title:query
    })
    console.log(response)
    if(!response) res.status(404).json({msg:"Not found"});
    res.status(200).json({data:response});
})


app.listen(3001,()=>{
    console.log("Server is running");
});
