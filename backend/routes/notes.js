const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note using: POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // title must be at least 3 chars long
    body("title", "Enter a valid title").isLength({ min: 3 }),

    // description must be at least 5 chars long
    body("description", "description must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {}
  }
);

module.exports = router;
