const player=require('./models/player');
const rank=require('./models/ranking');
const connecting=require('./connection');
const mongoose=require('mongoose');
// mongoose.set('debug',true);
console.log("Its outside callback n promise this is displayed 1st "); 
function sortExample(){
    //sort player based on scale and sort sorted data based on position -1 for desc 1 for desc
    //when sorting large data use the following technique    
    var start=new Date();
    var sort=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sort.options={allowDiskUse:true};
    sort.exec(function(err,result){
        if(err){console.log(err)}
        else{
            console.log("Sort");// console.log(result);            
            var end=new Date();
            console.log("Time Required "+(end-start));
        }        
    });
}
function sortNRecursionInsert(){
    //Sort and push them to new DB with indexing
    var date=new Date();
    var sortIndex=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sortIndex.options={allowDiskUse:true};
    sortIndex.exec(function(err,result){
        if(err){console.log(err)}        
        else{
            index = result.findIndex(x => x.name=="p28362");            
            console.log("index is "+index);            
  
            //recursion input
            function inputData(pos){
                data=new rank({
                    position:pos,
                    name:result[pos].name,                    
                });
                data.save().then(function(last){
                    // console.log(pos);
                    pass=last.position+1;
                    if(pass<result.length){inputData(pass);}
                    else{
                        console.log("Completed");
                        now=new Date();
                        console.log("Difference is"+(now-date));
                    }
                });

            }
            inputData(0);
            //DB input many            
        }             
    });
}
function sortNInsertMany(){
    //Sort and push them to new DB with indexing
    var date=new Date();
    var sortIndex=player.aggregate([
        {$sort:{scale:-1,position:1}}
    ]
    );
    sortIndex.options={allowDiskUse:true};
    sortIndex.exec(function(err,result){
        if(err){console.log(err)}        
        else{                      
            //DB input many
            start=new Date();
            rank.insertMany(result).then(function(docs) {
                console.log("inserted");
                end=new Date();
                console.log("Time required "+(end-start));
            })
            .catch(function(err) {
                console.log(err)
            });                     
            console.log("This was called later but displayed before");            
        }             
    });
}
function findExample(){
    start=new Date();
    player.find().limit(5000).then(function(result){
        end=new Date();
        console.log(result);
        console.log("found time needed "+(end-start));
    });

}
function matchExample(){
    //find matching property (by scale) and group them by property
    player.aggregate([
        {$match:{scale:2}},
        {$group:{_id:"$position",Total:{$sum:1}}}
    ],function(err,result){
        if(err){cosole.log(err)}
        else{console.log(result);}
    });
}
function groupExample(){
    // group players total based on property  
    
    player.aggregate([
        {
            $group:{
                _id:'$scale',
                total:{$sum:1}//find sum based on scales 1 for sum
            }
        }
    ],function(err,result){
        if(err){console.log(err);}
        else{
            console.log(result);
        }
    });
}
function inputData(){
    for(var i=0;i<5;i++){
        p=new rank(
            {
                name:"p"+i,                
                // scale:Math.floor(Math.random()*5),
                position:Math.floor(Math.random()*50),
            }
        );
        p.save().then(function(){
            date=new Date();            
        })
    }    
}
function dropCollection(){
    mongoose.connection.collections.rankingmodels.drop(function(){
        console.log("Dropped the ranking collection");
    });    
    // mongoose.connection.collections.playermodels.drop(function(){
    //     console.log("Dropped the Player collection");
    // });    
}
function findIndex(){
    start=new Date();
    player.find().then(function(result){
        mid=new Date();
        index = result.findIndex(x => x.name=="p28362");            
        end=new Date();
        console.log("index is "+index +" Time to get data "+(mid-start)+" Time to find "+(end-mid));
    }); 
}
function findData(){
    player.findOne({name:"p50",position:4}).then(function(result){
        console.log(result);
    });
}
function updateInfo(){
    rank.findOne({name:'p2'}).then(function(result){
        if(result!=null){
            result.position=83;
            // result.id=55;        
            result.save();
            console.log("Executed");
            if(result.id==null){console.log("ID is null bitch");}
        }
        else{console.log("No result");}
    });
    
}
// findIndex();
// sortExample();
// dropCollection();

// inputData();
findExample();
//updateInfo();


    