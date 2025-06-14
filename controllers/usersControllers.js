const User = require('../models/user');
const passport = require('passport');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
}
module.exports.renderRegister = async (req, res,next) => {
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
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.login =  (req, res, next) => {
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
}

module.exports.logout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/campgrounds');
    });
}