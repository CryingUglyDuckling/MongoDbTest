const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const marioSchema=new schema({
    name:String,
    weight:Number
});
//Create model
const MarioCharModel=mongoose.model('mariomodel',marioSchema);

module.exports=MarioCharModel;