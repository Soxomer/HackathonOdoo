const express = require('express');
const passport = require("passport");
const cors = require("cors");
const app = express()
const cookieParser = require('cookie-parser');
const parser = require("body-parser");
const port = 3000
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const {PrismaClient} = require("@prisma/client");
const bodyParser = require('body-parser');

const prisma = new PrismaClient()

// use it before all route definitions
app.use(cors());
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({extended: false}))

// parse application/json
app.use(parser.json())

// Configure express-session
app.use(session({
  secret: 'Sup3rS3cur3!', // Use a strong and unique secret key
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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
    }, async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      let user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (await user) {
        return done(null, profile);
      }

      user = prisma.user.create({
        data: {
          id: profile.id,
          name: profile.displayName,
          pseudo: profile.username,
          token: accessToken,
          urlAvatar: profile._json.avatar_url,
        },
      });
      console.log(await user);
      return done(null, profile);
    }
));

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github',
        {failureRedirect: 'http://localhost:8100/error'}),
    function (req, res) {
      res.cookie('username', req.user.username);
      res.redirect("http://localhost:8100/");
    });

// Logout route
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:8100/');
  });
});

// Get the profile of the user
// If the user is not authenticated, redirect to '/'
// Else, return the user
app.get('/profile/:user', (req, res) => {
  if (req.params.user != undefined) {
    const userEvents = prisma.user.findUnique({
      where: {
        pseudo: req.params.user,
      },
      include: {
        events: true,
      },
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
  } else {
    res.redirect('http://localhost:8100/');
  }
});

// Create a new event
app.post('/event', async (req, res) => {
  const {type, creator} = req.body;
  const event = await prisma.event.findFirst({
    where: {
      type: type,
      creatorId: creator,
    },
  });
  if (event === null) {
    // IF event doesn't exist, create it
    const newEvent = await prisma.event.create({
      data: {
        type: type,
        creatorId: creator,
      },
    });
    res.json(newEvent);
    return;
  }
  // IF event already exists, increment quantity
  const eventUpdate = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      quantity: event.quantity + 1,
    },
  });
  res.json(eventUpdate);
  return;
});

/*********************************RANKING*************************************/
// Sum the quantity of events for each user and sort them by descending order
app.get('/ranking/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      events: true,
    },
  });
  const usersWithEvents = users.map((user) => {
    return {
      ...user,
      eventSum: user.events.length === 0 ? 0 : user.events.reduce(
          (acc, event) => {
            return acc + event.quantity;
          }, 0),
    };
  });
  const sortedUsers = usersWithEvents.sort((a, b) => {
    return b.eventSum - a.eventSum;
  });
  let usr = sortedUsers.map((user) => {
    return {
      pseudo: user.pseudo,
      eventSum: user.eventSum,
    };
  });
  res.json(usr);
});

// GET all users with their number of events from a company
app.get('/ranking/company/:companyName', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   res.redirect('/');
  //   return;
  // }
  const company = req.params.companyName;
  prisma.company.findUnique({
    where: {
      name: company,
    },
  }).catch((err) => {
    console.log(err);
    res.json(err);
  }).then((company) => {
    prisma.user.findMany({
      where: {
        company: {
          name: company.name,
        },
      },
      include: {
        events: true,
      },
    }).then((users) => {
      const usersWithEvents = users.map((user) => {
        return {
          ...user,
          eventSum: user.events.length === 0 ? 0 : user.events.reduce(
              (acc, event) => {
                return acc + event.quantity;
              }, 0),
        };
      });
      const sortedUsers = usersWithEvents.sort((a, b) => {
        return b.eventSum - a.eventSum;
      });
      let usr = sortedUsers.map((user) => {
        return {
          pseudo: user.pseudo,
          eventSum: user.eventSum,
        };
      });
      res.json(usr);
    });
  });
});

// GET the events from all user of each company and sort them by descending order
app.get('/ranking/company', async (req, res) => {
  const companies = await prisma.company.findMany({
        include: {
          users: {
            include: {
              events: true,
            },
          },
        },
      }
  );
  const companiesWithEvents = companies.map((company) => {
    return {
      ...company,
      events: company.users?.length === 0 || company.users === null
      || company.users === undefined ? [] : company.users.reduce(
          (acc, user) => {
            console.log(user.events)
            return acc.concat(user.events);
          }, []),
    };
  });
  const companiesWithEventsSum = companiesWithEvents.map((company) => {
    return {
      ...company,
      eventSum: company.events.length === 0 ? 0 : company.events.reduce(
          (acc, event) => {
            return acc + event.quantity;
          }, 0),
    };
  });
  const sortedCompanies = companiesWithEventsSum.sort((a, b) => {
    return b.eventSum - a.eventSum;
  });
  let cmp = sortedCompanies.map((company) => {
    return {
      name: company.name,
      eventSum: company.eventSum,
    };
  });
  res.json(cmp);
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

