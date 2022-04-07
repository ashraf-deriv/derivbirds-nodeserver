const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//Import Routes
// const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");
// const postRoutes = require('./routes/post');

dotenv.config();
app.use(bodyParser.json());
//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("DB connected")
);

//Route Middlewares
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post("/login", (req, res) => {
  const username = req.body.name;
  console.log(username);
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.write;
  res.json({ accessToken: accessToken });
});

// function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(403)
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403);
//         req.user = user;
//         next()
//     })
// }
//app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
//app.use('/api/post', postRoutes);

require("./router")(app);
//start listening the server
app.listen(3027, () => console.log("Server is Up and running" + __dirname));
module.exports = app;
