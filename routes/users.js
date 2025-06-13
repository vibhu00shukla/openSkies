const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const {storeReturnTo} = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', catchAsync( async (req, res,next) => {
    try {
        const { email, username,password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                req.flash('error', 'Login failed after registration');
                return res.redirect('/register');
            }
            req.flash('success', 'Welcome to OpenSkies!');
            res.redirect('/campgrounds');
        }
        )
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});


router.post('/login',storeReturnTo, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const redirectUrl = res.locals.returnTo || '/campgrounds';
            delete req.session.returnTo;
            req.flash('success', 'Welcome back!');
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;