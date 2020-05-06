const   express = require('express'),
        middleware = require('../middleware'),
        router  = express.Router({mergeParams:true});

const   Campground  = require('../models/campgrounds'),
        Comment     = require('../models/comment');

// Comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) console.log(err);
        res.render('comments/new', {campground:campground})
    })
})

//Comments create
router.post('/', middleware.isLoggedIn, (req, res) => {
    //lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create new comment
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if(err) req.flash('error', 'Something went wrong');
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comment to campground
                comment.save()
                campground.comments.push(comment)
                campground.save()
                //redirect to campground showpage
                req.flash('success', 'Successfully added comment')
                res.redirect(`/campgrounds/${campground._id}`);

            })
        }
    })
})

//Comments Edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err)res.redirect('back');
        res.render('comments/edit', {campground_id : req.params.id, comment : foundComment});
    })
    
})

//Comments update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if(err)res.redirect('back');
        res.redirect(`/campgrounds/${req.params.id}`)
    })
})

//destroy Routes
router.delete('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err)res.redirect('back');
        res.redirect(`/campgrounds/${req.params.id}`)
    })
})

module.exports = router;