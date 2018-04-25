require('dotenv').config();

var express       = require("express"),
    app           = express(),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User          = require("./models/user");

//ROUTES
var commentsRoute    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

//SCHEMA SETUP
var Campground    = require("./models/campground");
var Comment       = require("./models/comment");

//SEED db
var seedDB = require("./seeds");
//seedDB();

mongoose.connect("mongodb://localhost/YelpCamp_Deployed",{useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");


//Passport Configuration
app.use(require("express-session")({
    secret: "Metal gear solid 5",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//To Pass current logged-in user to all the routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})


//moment js
app.locals.moment = require('moment');

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoute);


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp server started!!!!!");
})