var monoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment =  require("./models/comment.js");


var data = [
        {name: "camp1",image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id leo bibendum, placerat nunc vel, venenatis mi. Morbi rutrum in nisl ut sodales. Mauris eu orci pellentesque, congue velit bibendum, iaculis purus. Ut interdum nisi est, vel vestibulum tellus blandit non. Pellentesque imperdiet pretium imperdiet. Nullam semper efficitur eros, vel lobortis mauris congue in. Cras justo quam, imperdiet et sapien porttitor, feugiat vulputate odio."},
        {name: "camp2",image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id leo bibendum, placerat nunc vel, venenatis mi. Morbi rutrum in nisl ut sodales. Mauris eu orci pellentesque, congue velit bibendum, iaculis purus. Ut interdum nisi est, vel vestibulum tellus blandit non. Pellentesque imperdiet pretium imperdiet. Nullam semper efficitur eros, vel lobortis mauris congue in. Cras justo quam, imperdiet et sapien porttitor, feugiat vulputate odio."},
        {name: "camp3",image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id leo bibendum, placerat nunc vel, venenatis mi. Morbi rutrum in nisl ut sodales. Mauris eu orci pellentesque, congue velit bibendum, iaculis purus. Ut interdum nisi est, vel vestibulum tellus blandit non. Pellentesque imperdiet pretium imperdiet. Nullam semper efficitur eros, vel lobortis mauris congue in. Cras justo quam, imperdiet et sapien porttitor, feugiat vulputate odio."},
        {name: "camp4",image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id leo bibendum, placerat nunc vel, venenatis mi. Morbi rutrum in nisl ut sodales. Mauris eu orci pellentesque, congue velit bibendum, iaculis purus. Ut interdum nisi est, vel vestibulum tellus blandit non. Pellentesque imperdiet pretium imperdiet. Nullam semper efficitur eros, vel lobortis mauris congue in. Cras justo quam, imperdiet et sapien porttitor, feugiat vulputate odio."}
    ];

function seedDB(){
    //remove campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Campgrounds removed");
        }
    });
    //add a few campgrounds and comments
     data.forEach(function(seed){
         Campground.create(seed,function(err,campground){
             if(err){
                 console.log(err)
             }else{
                 console.log("campground added")
                 Comment.create({
                     text: "This place was great but has no internet",
                     author: "Balaji"
                 },function(err,comment){
                     if(err){
                         console.log(err);
                     }else{
                         campground.comments.push(comment);
                         campground.save();
                         console.log("New comment created");
                     }
                 })
             }
         })
     });
}

module.exports = seedDB;