require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");

const app = express();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//endpoints

//this will insert the users info into the users database
app.post("/api/register", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  return sequelize
    .query(
      `INSERT INTO users (username, firstname, lastname, password) VALUES ('${username}', '${firstname}', '${lastname}', '${password}')`
    )
    .then((result) => res.send(result[0]).status(200));
});

//return the first name if user inputs username
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   return sequelize
//     .query(`SELECT * FROM users WHERE username='${username}'`)
//     .then((result) => {
//       res.status(200).send(result[0][0].firstname);
//       console.log(result[0][0].firstname);
//     });
// });

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//npm i sequelize pg pg-hstore axios dotenv express cors
