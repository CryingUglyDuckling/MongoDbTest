const assert=require('assert');
const marioChar=require('../models/mariochar');
//Describe test
describe('Finding records',function(){
    var char;
    //create a record and save it to collection before each test  
    beforeEach(function(done){        
        char=new marioChar(
            {
                name:'A Mario'
            }
        );
        char.save().then(function(){
            console.log("Saved a record");
            done();
        });
    });
    
    it('Finds a record from DB',function(done){
        marioChar.findOne({name:'A Mario'}).then(function(result){
            assert(result.name==='A Mario');
            console.log("It found arecord named mario");
            done();
        })        
    });

});