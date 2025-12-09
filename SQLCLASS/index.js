const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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

let q = "INSERT INTO user(id, username, email, password) VALUES ?";
let data = [];

// Generate 100 random users
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}

console.log(`Generated ${data.length} random users`);

connection.query(q, [data], (err, result) => {
  if (err) {
    console.error('Error inserting data:', err);
    connection.end();
    return;
  }
  
  console.log('Insert Result:', result);
  console.log(`Successfully inserted ${result.affectedRows} records`);
  
  connection.end();
});