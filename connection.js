//this file connects to mongoose
const mongoose=require('mongoose');
const player=require('./models/player');
const rank=require('./models/ranking');
//Es6 Promises overrides mongoose promise
mongoose.connect('mongodb://localhost/playerDB');
mongoose.Promise=global.Promise;
//drop everything in playermodel
// mongoose.connection.collections.playermodels.drop(function(){
//     console.log("Dropped the author collection");
// });
       
//Just listen to even once 
const connecting=mongoose.connection.once('open',function(){
    console.log("Connection has been made now make fireworks");
}).on('error',function(){
    console.log("Connection error".error);    
});
module.exports=connecting;

