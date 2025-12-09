const express= require("express");
const app= express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:"a",
        username : "shatakshi",
        content: "I love coding"
    },
    {
        id:"b",
         username : "Isshi",
        content: "I love coding"
    },
    {
       id:"c",
        username : "Harsh",
        content: "I love coding"
    },
];

app.get("/", (req, res)=>{
    res.send("Welcome to Posts API");
});

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    console.log('POST /posts received body ->', req.body);
    if(!username || !content) {
        console.log('POST /posts missing fields:', { username, content });
        return res.status(400).send('username and content are required');
    }
    posts.push({ id: uuidv4(), username, content });
    console.log('Post added. Total posts:', posts.length);
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
   let post = posts.find((p) => id ===p.id);
  res.render("show.ejs",{post});
})


app.listen(port, () =>{
    console.log(`listening on port: ${port}`);
});