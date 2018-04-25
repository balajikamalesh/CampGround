var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//ROUTING
router.get("/",function(req,res){
    res.render("landing");
});

//====================
//Auth Routes
//====================
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    
    var newUser = new User({
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        avatar: req.body.avatar
    });
    
    if(req.body.adminCode == "iamadmin"){
        newUser.isAdmin = true;   
    }
    
    User.register(newUser,req.body.password,function(err,user){
        
        if(err){
            console.log(err);
            return res.render("register");
        }
        
        passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds"); 
        });
        
    });
    
});

router.get("/login",function(req,res){
    
    res.render("login");

});

router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }),function(req,res){
    
});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

router.get("/users/:id",function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
        } else{
            Campground.find().where('author.id').equals(user.id).exec(function(err,campgrounds){
                if(err){
                    console.log(err);
                }
                res.render("user/show",{user: user,campgrounds: campgrounds});    
            });
        }
    }); 
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;