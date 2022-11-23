const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a User using: POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    // name must be at least 3 chars long
    body("name", "Enter a valid name").isLength({ min: 3 }),

    // email must be an email
    body("email", "Enter a valid email").isEmail(),

    // password must be at least 3 chars long
    body("password", "Password must be at least 3 chars long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json(user);
      console.log(user);
    } catch (error) {
      // Catch errors
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
