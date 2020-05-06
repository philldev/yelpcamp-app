const   Campground  = require('../models/campgrounds'),
        Comment     = require('../models/comment');


middlewareObj = {};

// isAdmin middleware 
middlewareObj.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if (!req.user.isAdmin){
            req.flash('error', `You're not allowed to do that!`)
            return res.redirect('/campgrounds');
        } 
        return next();
    }
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('/login');
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash('error', 'Comment not found')
                res.redirect('/campground')
            } else {
            if (!foundComment) {
                req.flash('error', 'Item not found')
                return res.redirect('/campgrounds')
            }
            if (foundComment.author.id.equals(req.user._id)|| req.user.isAdmin){
                return next();
            }
            req.flash('error', `You don't have permission to do that`)
            res.redirect(`back`)
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that')
        res.redirect(`back`)
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('/login');
}

//Campground ownership middleware
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    // check if is logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                // if campground not found
                req.flash('error', 'Campground not found')
                res.redirect('/campground');
            } else {
                if(!foundCampground){
                    //if campground id not found
                    req.flash('error', 'Item not found')
                    return res.redirect('/campgrounds')
                }
                if(foundCampground.author.id.equals(req.user._id)|| req.user.isAdmin){
                    //if campground found exit middleware
                    return next();
                }
                //if user is not the author 
                req.flash('error', `You don't have permission to do that`)
                res.redirect(`back`)
            }
        })
    } else {
        // if not logged in
        req.flash('error', 'You need to be logged in to do that')
        res.redirect(`back`)
    }
}

module.exports = middlewareObj