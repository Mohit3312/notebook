const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Kohliisking$";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
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

    try {
      // Check whether the user with email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }

      // Password Hashing
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      //   res.json(user);

      res.json({ authToken });
    } catch (error) {
      // Catch errors
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post(
  "/login",

  [
    // email must be an email
    body("email", "Enter a valid email").isEmail(),

    // Password cannot be blank
    body("password", "Password cannot be blank").exists(),
  ],

  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      // Catch errors
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // Catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
