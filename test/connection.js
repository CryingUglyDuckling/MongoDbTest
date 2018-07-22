//this file connects to mongoose
const mongoose=require('mongoose');
//Es6 Promises overrides mongoose promise

//Connect to DB before test run hook
before(function(done){
    mongoose.Promise=global.Promise;
    //Connect to mongoDB database IF database is not there it creates auto
    mongoose.connect('mongodb://localhost/testaroo');
    //Just listen to even once 
    mongoose.connection.once('open',function(){
        console.log("Connection has been made now make fireworks");
        done();
    }).on('error',function(){
        console.log("Connection error".error);    
    });
})

//Drop the character collection before each test
beforeEach(function(done){
    //Drop the collection
    // mongoose.connection.collections refers every collection in DB
    mongoose.connection.collections.mariomodels.drop(function(){
        done();
        console.log("Dropped the collection");
    });
    //drop() is an asynchronous function

})