const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '123456'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),                    // UUID
    faker.internet.username(),              // Changed: lowercase 'username' not 'userName'
    faker.internet.email(),                 // Email
    faker.internet.password(),              // Password
  ];
};

// let q = "INSERT INTO user(id, username, email, password) VALUES ?";
// let data = [];

// // Generate 100 random users
// for (let i = 0; i < 100; i++) {
//   data.push(getRandomUser());
// }

// console.log(`Generated ${data.length} random users`);

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.error('Error inserting data:', err);
//     connection.end();
//     return;
//   }
  
//   console.log('Insert Result:', result);
//   console.log(`Successfully inserted ${result.affectedRows} records`);
  
//   connection.end();
// });

// home get route
app.get("/", (req, res) => {
  const q = `SELECT COUNT(*) AS cnt FROM user`;
  try{
     connection.query(q, (err, results) => {
    if (err) throw err;
    res.render("showusers.ejs", {users});
  });
} catch (err){
  console.log(err);
  res.send("some error in DB");
}
});

// Show Route
app.get("/user", (req, res) => {
  const q = `SELECT * FROM user`;
  connection.query(q, (err, results) => {
    if (err) {
      console.error('DB error on /user:', err);
      return res.status(500).send('some error in database');
    }
    // render view and pass users
    res.render("showusers.ejs", { users: results });
  });
});

// Edit Route
app.get("/user/:id/edit", (req, res)=>{
  let {id} = req.params;
   let q = `SELECT * FROM user WHERE id= '${id}'`;

  try{
     connection.query(q, (err, results) => {
    if (err) throw err;
    let user = result[0];
    res.render("edit.ejs", {user});
  });
} catch (err){
  console.log(err);
  res.send("some error in DB");
}
});

//UPDATE (DB) Route

app.patch("/user/:id", (req, res) =>{
  res.send("updated");
})


app.listen(port, ()=>{
  console.log(`server is listening on port ${port}`);
});