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

//register
//this will insert the users info into the users database
app.post("/api/register", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  let userCheck = await sequelize.query(
    `SELECT username FROM users WHERE username='${username}'`
  );
  if (userCheck[0].length !== 0) {
    return res.send("Account already created").status(200);
  } else {
    return sequelize
      .query(
        `INSERT INTO users (username, firstname, lastname, password) VALUES ('${username}', '${firstname}', '${lastname}', '${password}')`
      )
      .then((result) => res.send("account created").status(200));
  }
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

//login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  return sequelize
    .query(
      `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
    )
    .then((result) => {
      if (result[0][0]) {
        // console.log("true");
        res.status(200).send(true);
      } else {
        // console.log("false");
        res.status(200).send(false);
      }
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//npm i sequelize pg pg-hstore axios dotenv express cors
