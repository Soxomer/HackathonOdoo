const express = require('express');
const passport = require("passport");
const app = express()
const port = 3000
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');

// Configure express-session
app.use(session({
    secret: 'Sup3rS3cur3!', // Use a strong and unique secret key
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: "Iv1.bffad14f85e00390",
        clientSecret: "14f9ed89365cdd5330d5023f117ddbad643f1a87",
        callbackURL: "http://localhost:3000/auth/github/callback"
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// Logout route
app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Profile route
app.get('/profile', (req, res) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        res.send(`<h1>Hello ${req.user.username}</h1><a href="/logout">Logout</a>`);
    } else {
        res.redirect('/');
    }
});

app.get('/webhook', (req, res) => {
    console.log("webhook received")
    console.log(req);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
