const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res)=>{
   res.send("this is the home");
});

app.get("/ig/:username", (req, res)=>{
    const followers = ["adam", "bob", "steve"];

  let {username} = req.params;
  res.render("instagram.ejs", {username, followers});

//   console.log(username);

});

app.get("/about",(req, res)=>{
   res.render("home.ejs");
   // res.send("this is about ")
});
app.get("/rolldice",(req, res)=>{
   let diceVal = Math.floor(Math.random()* 6)+1;
   res.render("rolldice.ejs", {num: diceVal });
});

app.listen(port, ()=>{
   console.log(`listening on port ${port}`);
});