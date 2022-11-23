const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create a User using: POST "/api/auth/". Doesn't require Auth

router.post("/", (req, res) => {
  console.log(req.body);

  //   let obj = {
  //     a: "this",
  //     number: 39,
  //   };
  //   res.json(obj);

  //   res.send("Hello");

  const user = User(req.body);
  user.save();
  res.send(req.body);
});

module.exports = router;
