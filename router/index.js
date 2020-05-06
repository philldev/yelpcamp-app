const   express = require('express'),
        router  = express.Router(),
        passport = require('passport'),
        Campground = require('../models/campgrounds'),
        User = require('../models/user');

// root route
router.get("/", function(req, res){
    res.render("landing");
})

// User routes
// signup form
router.get('/register', (req, res) => {
    res.render('register' , { page : 'register'});
})
// handle signup
router.post('/register', (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        avatar : req.body.avatar
    })
    if (req.body.adminCode === 'secretcode') {
        newUser.isAdmin = true
    }
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register')
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', `Successfully signed up! nice to meet you ${req.body.username}`)
            res.redirect('/campgrounds')
        })
    })
})

// login form
router.get('/login', (req, res) => {
    res.render('login', { page : 'login'});
})
// handle login
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: "/campgrounds",
        successFlash :true ,
        failureRedirect: "/login",
        failureFlash :true
    }
), (req, res) => {});

// logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out!')
    res.redirect('/campgrounds')
})

// User Profile
router.get("/users/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(!foundUser){
            req.flash('error', 'User not found!')
            return res.redirect('back');
        }
        if (err) {
            req.flash('error', 'Something went wrong.')
            res.redirect('/');
        } else {
            Campground.find().where('author.id').equals(foundUser._id).exec((err, campgrounds) => {
                if (err) {
                    req.flash('error', 'Something went wrong.')
                    res.redirect('/');
                } else {
                res.render('users/show', {user : foundUser, campgrounds : campgrounds})
                }
            })            
        }
    })
})

module.exports = router;