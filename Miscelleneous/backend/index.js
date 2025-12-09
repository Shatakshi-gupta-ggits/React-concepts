const express = require("express");
const app = express();

const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/register", (req, res)=>{
    let {user, password} = req.query;
    res.send(`standard GET Response. Welcome ${user} !`);
});

app.post("/register", (req, res)=>{
    let {user, password } = req.body;
    res.send('standard POST Response');
})

app.listen(port, () =>{
    console.log(`listening at port ${port}`);
});
