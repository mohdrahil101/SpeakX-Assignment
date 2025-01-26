const mongoose=require('mongoose');

const blocksOption = mongoose.Schema({
    isCorrectAnswer: Boolean,
    text: String,
  });  
const schema=new mongoose.Schema({
    anagramType: String,
    blocks: [blocksOption],
    solution: String,
    title: String,
    type: String,
})


const model=mongoose.model("questions",schema);
module.exports = model; 