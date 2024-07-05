const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const publicPath = path.join(__dirname + "/public");

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "donate_page",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

//donate-pay page
app.post("/submit-donate", (req, res) => {
  console.log("Received form data:", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const amount = req.body.amount;
  const ngo = req.body.ngo;
  const cause = req.body.cause;
  const donationType = req.body.donationType;

  const query =
    "INSERT INTO donations (name, email, amount, ngo_name, cause_category, donation_type) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [name, email, amount, ngo, cause, donationType],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Database error" });
      } else {
        console.log("Inserted into database:", result);
        res.status(200).json({ message: "New record created successfully" });
      }
    }
  );
});

app.get("/donate-pay", (req, res) => {
  res.sendFile(publicPath + "/donate-pay.html");
});

//home-page
app.get("/", (req, res) => {
  res.sendFile(publicPath + "/homePage.html");
});

//gallery page
app.get("/gallery", (req, res) => {
  res.sendFile(publicPath + "/gallery.html");
});

//donate page
app.get("/donate", (req, res) => {
  res.sendFile(publicPath + "/donate.html");
});

//about page
app.get("/about", (req, res) => {
  res.sendFile(publicPath + "/about.html");
});

//causes page
app.set("view engine", "ejs");

app.get("/causes", (req, res) => {
  let sql = "SELECT * FROM causes";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("indexCauses", {
      causes: results,
    });
  });
});

//volunteer_opportunities form
app.post("/submit-vol", (req, res) => {
  console.log("Received form data:", req.body);
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const opportunity_name = req.body.opportunity_name;
  const location = req.body.location;

  const query =
    "INSERT INTO volunteer_opportunities (user_name, user_email, opportunity_name, location) VALUES (?,?,?,?)";
  db.query(
    query,
    [user_name, user_email, opportunity_name, location],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Database error" });
      } else {
        console.log("Inserted into database:", result);
        res.status(200).json({ message: "New record created successfully" });
      }
    }
  );
});

app.get("/vol", (req, res) => {
  res.sendFile(publicPath + "/vol_form.html");
});

//fundraising_campaigns form
app.post("/submit-fund", (req, res) => {
  console.log("Received form data:", req.body);
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const campaign_name = req.body.campaign_name;
  const goal_amount = req.body.goal_amount;
  const raised_amount = req.body.raised_amount;
  const end_date = req.body.end_date;

  const query =
    "INSERT INTO fundraising_campaigns (user_name, user_email, campaign_name, goal_amount, raised_amount, end_date) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [
      user_name,
      user_email,
      campaign_name,
      goal_amount,
      raised_amount,
      end_date,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Database error" });
      } else {
        console.log("Inserted into database:", result);
        res.status(200).json({ message: "New record created successfully" });
      }
    }
  );
});
app.get("/fund", (req, res) => {
  res.sendFile(publicPath + "/fund_form.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
