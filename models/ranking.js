const mongoose=require('mongoose');
const schema=mongoose.Schema;
//Create Schema
const rankingSchema=new schema({
    position:Number,
    id:Number,
    name:String,    
});

//Create model
const rankModel=mongoose.model('rankingmodel',rankingSchema);

module.exports=rankModel; 