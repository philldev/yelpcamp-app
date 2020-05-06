const   express = require('express'),
        router  = express.Router(),
        middleware = require('../middleware'),
        User = require('../models/user');

// root route
router.get("/", middleware.isAdmin, function(req, res){
    User.find({}, (err, users) => {
        if (err) {
            req.flash('error', 'something went wrong!')
            res.redirect('back')
        } else {
            res.render('admin/admin', {users: users, admin:req.user})
        }
    })
})

// edit route
router.get("/:id/edit", middleware.isAdmin, function(req, res){
    User.findById(req.params.id, (err, user) => {
        if(err) {
            req.flash('error', 'something went wrong!')
            res.redirect('back')
        }
        res.render('admin/edit', {user: user})
    })
})

// Update route
router.put('/:id', middleware.isAdmin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: {isAdmin : req.body.isAdmin}}, err => {
        if (err) {
            req.flash('error', 'something went wrong!')
            res.redirect('back')
        }
        req.flash('success', 'successfully updated!')
        res.redirect('/admin')
    } )
})

// Destroy routes
router.delete('/:id', middleware.isAdmin, (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            req.flash('error', 'something went wrong!')
            res.redirect('back')
        }
        req.flash('success', 'successfully deleted user!')
        res.redirect('/admin')
    })
})

module.exports = router;