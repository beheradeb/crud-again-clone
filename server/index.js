const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
//route

//create a record
app.post("/create", async (req, res) => {
  try {
    const { description } = req.body;
    const response = await pool.query(
      "INSERT INTO crudtable (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
//get all records
app.get("/readall", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM crudtable");
    res.json(response.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//get a record
app.get("/read/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM crudtable WHERE t_id=$1", [
      id,
    ]);
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
//update a record
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const response = await pool.query(
      "UPDATE crudtable SET description=$1 WHERE t_id=$2",
      [description, id]
    );
    res.json("UPDATED");
  } catch (err) {
    console.log(err.message);
  }
});
//delete a record
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("DELETE FROM crudtable WHERE t_id=$1", [
      id,
    ]);
    res.json("DELETED");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public"));
});

app.listen(PORT, () => {
  console.log(`server is started on port ${PORT}`);
});
