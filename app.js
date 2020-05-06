const   express             = require('express'),
        app                 = express(),
        bodyParser          = require('body-parser'),
        mongoose            = require('mongoose'),
        passport            = require('passport'),
        localStrategy       = require('passport-local'),
        flash               = require('connect-flash'),
        User                = require('./models/user.js'),
        methodOverride      = require('method-override'),
        PORT                = process.env.PORT || 5000, 
        //Routes
        campgroundsRoutes   = require('./router/campgrounds'),
        commentsRoutes      = require('./router/comments'),
        indexRoutes         = require('./router/index'),
        adminRoutes         = require('./router/admin'),
        seedDB              = require('./seed'),
        atlasUri            = 'mongodb+srv://deddy:wCGEwFr9jEwHn7bM@phillcluster01-bagnm.gcp.mongodb.net/Yelp_camp?retryWrites=true&w=majority';

// Data seeds        
// seedDB();
        
// Connect to db
mongoose.connect(atlasUri , {useNewUrlParser: true, useUnifiedTopology: true});
// mongodb+srv://deddy:wCGEwFr9jEwHn7bM@phillcluster01

// Moment JS
app.locals.moment = require('moment');

// Passport Config
app.use(require("express-session")({
    secret : "Phill huge PP",
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());;
passport.authenticate('local', {
    failureFlash: 'Invalid username or password',
    successFlash: 'Welcome!'
})

// App Config
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(methodOverride('_method'))
app.use(flash())

// user auth on all routes
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

//Routes
app.use(indexRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);
app.use('/admin/', adminRoutes);

//Listen
app.listen(PORT , function(){
    console.log("server started!")
})
