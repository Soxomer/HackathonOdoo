const express = require('express');
const passport = require("passport");
const cors = require("cors");
const app = express()
const cookieParser = require('cookie-parser');
const parser = require("body-parser");
const port = 3000
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const {PrismaClient} = require("@prisma/client");
const bodyParser = require('body-parser');
const {add} = require("nodemon/lib/rules");

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
      clientID: "client-id",
      clientSecret: "client-secret",
      callbackURL: "http://localhost:3000/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      let user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (user) {
        await prisma.user.update({
          where: {
            id: profile.id,
          },
          data: {
            token: accessToken,
          },
        });
        done(null, {accessToken: accessToken, profile: profile});
        return;
      }
      await prisma.user.create({
        data: {
          id: profile.id,
          name: profile.displayName || profile.username,
          pseudo: profile.username,
          token: accessToken,
          urlAvatar: profile._json.avatar_url,
        },
      })
      done(null, {accessToken: accessToken, profile: profile});
    }
));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",
      'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

/**********************************AUTH***************************************\
 *                                                                            *
 \*****************************************************************************/
app.get('/auth/github',
    passport.authenticate('github', {scope: ['admin:repo_hook', 'repo']}));

app.get('/auth/github/callback',
    passport.authenticate('github',
        {failureRedirect: 'http://localhost:8100/error'}),
    function (req, res) {
      res.cookie('github_token', req.user.accessToken);
      res.cookie('username', req.user.profile.username, {
        httpOnly: false, // This is recommended for security
        sameSite: 'None', // Allow cross-site requests
        secure: true, // Set to true if your application is served over HTTPS
      });
      res.redirect("http://localhost:8100/");
    });

/**********************************HOME***************************************\
 *                                                                            *
 \*****************************************************************************/
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/', async (req, res) => {
  let creator;
  const type = req.header('X-GitHub-Event');
  let addValue = 1;
  const parsedPayload = JSON.parse(req.body?.payload)
  switch (type) {
    case 'push':
      const pusher = parsedPayload.pusher?.name;
      creator = await prisma.user.findUnique({
        where: {
          pseudo: pusher,
        },
      });
      break;
    case 'star':
      if (parsedPayload.action === 'deleted') {
        addValue = -3;
      } else {
        addValue = 3;
      }
      const login = parsedPayload.repository?.owner?.login;
      console.log("LOGIN")
      console.log(login);
      creator = await prisma.user.findUnique({
        where: {
          pseudo: login,
        },
      });
      break;
    default:
      res.status(404).send('Event not found');
      return;
  }

  const event = await prisma.event.findFirst({
    where: {
      type: type,
      creatorId: creator.id,
    },
  });
  console.log(event)
  if (event === null) {
    // IF event doesn't exist, create it
    const newEvent = await prisma.event.create({
      data: {
        type: type,
        creatorId: creator.id,
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
      quantity: event.quantity + addValue,
    },
  });
  res.json(eventUpdate);
  return;
})

// Logout route
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:8100/');
  });
});
/**********************************USERS***************************************\
 *                                                                            *
 *                                                                            *
 \*****************************************************************************/
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
        company: true
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

// PATCH the company of the user
app.patch('/profile/:username', async (req, res) => {
  const username = req.params.username;
  const companyName = req.body.id;
  console.log(companyName);
  const company = await prisma.company.findUnique({
    where: {
      name: companyName,
    },
  });
  if (company === null) {
    res.status(404).send('Company not found');
    return;
  }
  prisma.user.update({
    where: {
      pseudo: username,
    },
    data: {
      companyId: company.id,
    },
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.json(err);
  });
});
/*********************************WEBHOOK**************************************\
 *                                                                            *
 *                                                                            *
 \*****************************************************************************/
app.post('/webhook/create/:username', async (req, res) => {
  let token;
  let pseudo;
  if (req.params.username != undefined) {
    const userEvents = prisma.user.findUnique({
      where: {
        pseudo: req.params.username,
      },
      include: {
        events: true,
      },
    }).then(async (user) => {
      token = user.token;
      pseudo = user.pseudo;
      console.log(token);
      req.body.repos.map(async (item) => {
        let test = await fetch(
            `https://api.github.com/repos/${pseudo}/${item.fullname}/hooks`, {
              method: "POST",
              headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28",
                "Content-Type": "application/json"  // Add this line to specify the content type
              },
              body: JSON.stringify({
                config: {
                  url: "https://evolving-keen-boxer.ngrok-free.app",
                },
                events: ["*"]
              })
            });
      });
    }).catch((err) => {
      res.json(err);
    });
  } else {
    res.redirect('http://localhost:8100/');
  }
});

/*********************************EVENTS**************************************\
 *                                                                            *
 *                                                                            *
 \*****************************************************************************/
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

/*********************************RANKING*************************************\
 *                                                                            *
 *                                                                            *
 \*****************************************************************************/
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
      urlAvatar: user.urlAvatar
    };
  });
  res.json(usr);
});

// GET all users with their number of events from a company
app.get('/ranking/company/:companyName', (req, res) => {
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
          urlAvatar: user.urlAvatar
        };
      });
      res.json(usr);
    });
  });
});

app.get('/company', async (req, res) => {
  const companies = await prisma.company.findMany();
  res.json(companies);
});

app.post('/company', async (req, res) => {
  const {name} = req.body;
  const company = await prisma.company.findUnique({
    where: {
      name: name,
    },
  });
  if (!company) {
    await prisma.company.create({
      data: {
        name: name,
      },
    });
  }
  res.json(company);
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
      pseudo: company.name,
      eventSum: company.eventSum,
    };
  });
  res.json(cmp);
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

