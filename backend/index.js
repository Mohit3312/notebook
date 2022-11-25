const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/about", (req, res) => {
//   res.send("Hello About!");
// });

// app.get("/contact", (req, res) => {
//   res.send("Hello Contact Us!");
// });

app.listen(port, () => {
  console.log(`Notebook backend listening at http://localhost:${port}`);
});
