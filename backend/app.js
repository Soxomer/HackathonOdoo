const express = require('express');
const passport = require("passport");
const app = express()
const port = 3000
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

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

passport.use(new GitHubStrategy( {
      clientID: "Iv1.bffad14f85e00390",
      clientSecret: "14f9ed89365cdd5330d5023f117ddbad643f1a87",
      callbackURL: "http://localhost:3000/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      let user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (await user) return done(null, profile);

      user = prisma.user.create({
        data: {
          id: profile.id,
          pseudo: profile.username,
          token: accessToken,
        },
      });
  console.log( await user);
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
    console.log("is authenticated");
    res.send(`<h1>Hello ${req.user.username}</h1><a href="/logout">Logout</a>`);
  } else {
    res.redirect('/');
  }
});


// Create a new event
app.post('/event/', (req, res) => {
  const {name, date, description, location} = req.body;
  const event = prisma.event.create({
    data: {
      name: name,
      date: date,
      description: description,
      location: location,
    },
  });
  res.json(event);
});

// Count the number of events from all users and them by the number of events
app.get('/ranking/users', (req, res) => {
  prisma.user.findMany({
    include: {
      events: true,
    },
  }).then((users) => {
    const usersWithEvents = users.map((user) => {
      return {
        ...user,
        eventsCount: user.events.length,
      };
    });
    const sortedUsers = usersWithEvents.sort((a, b) => {
      return b.eventsCount - a.eventsCount;
    });
    let usr = sortedUsers.map((user) => {
      return {
        pseudo: user.pseudo,
        eventsCount: user.eventsCount,
      };
    });
    res.json(usr);
  });
});



// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

