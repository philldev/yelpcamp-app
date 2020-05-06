const   express = require('express'),
        router  = express.Router(),
        middleware = require('../middleware');
//models
const   Campground  = require('../models/campgrounds');

//Index Route  
router.get("/", function(req, res){
    // Campground db
    Campground.find({}, (err, allCampgrounds) => {
        if(err)console.log(err);
        res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user, page : 'campgrounds'})
    })
})
//New route
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})
//Create route
router.post("/",middleware.isLoggedIn, function(req, res){
    const name = req.body.name;
    const price = req.body.price
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id : req.user._id,
        username : req.user.username
    }
    const newCamps = {name: name, price: price, image: image, description: desc, author: author}
    // create new campground and save to db
    Campground.create(newCamps, (err, newCamp) => {
        if(err)console.log(err);
        else {
            res.redirect("/campgrounds");
        }
        console.log(newCamp);
    })
})
//Show route  
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
        if (!foundCampground) {
            req.flash('error', 'Campground not found')
            return res.redirect('/campgrounds')
        }
        res.render('campgrounds/show', {campground: foundCampground})
        }
    })
})

// Edit Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground :foundCampground})
    })
})

// Update Route
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err)res.redirect('/campgrounds');
        res.redirect(`/campgrounds/${req.params.id}`)
    })
})

// Destroy Route
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err) => {
        if(err) res.redirect('/campgrounds');
        res.redirect('/campgrounds');
    })
})

module.exports = router;