const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const playerSchema=new schema({
    id:Number,
    name:String,
    scale:Number,
    position:Number
});

//Create model
const playerModel=mongoose.model('playermodel',playerSchema);

module.exports=playerModel; 