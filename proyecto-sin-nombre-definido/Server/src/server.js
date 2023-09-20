require("dotenv").config();
const GitHubStrategy = require("passport-github").Strategy;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./helpers/Middlewares/passport-config");
const router = require("./routes/index");
require("./helpers/Middlewares/github")
const { User } = require("./db");
const { tokenSign } = require("./helpers/Token/loginToken");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Habilita las credenciales si es necesario (cookies, autenticación, etc.)
  })
);

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Configura passport
server.use(passport.initialize());
server.use(passport.session());

// Configura serializeUser y deserializeUser antes de configurar Passport
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  cb(null, id);
});

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/auth/github/callback",
//       scope: ["user:email"], 
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       const user = await User.findOne({ where: { githubId: profile.id } });
//       if (!user) {
//         const newUser = await User.create({
//           githubId: profile.id,
//           userName: profile.username,
//           profilePic: profile.photos[0].value,
//           email: profile.email || null,
//         });
//         return cb(null, newUser);
//       }
//       return cb(null, user);
//     }
//   )
// );

// server.get("/auth/github", passport.authenticate("github"));

// server.get(
//   "/auth/github/callback",
//   passport.authenticate("github", { failureRedirect: "/login" }),
//   async function (req, res) {
//     const user = req.user;
//     const accessToken = await tokenSign(user);
//     res.json(accessToken)
  
//   }
// );

server.use(router);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor.");
});

module.exports = server;
