const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
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

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
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
    const success = false;
    try {
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success, message: { errors: errors.array() } });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json({ success: true, message: savedNote });
    } catch (error) {
      // Catch errors
      console.error(error.message);
      res.status(500).json({ success, message: error.message });
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  let success = false;
  const { title, description, tag } = req.body;

  try {
    // Creating a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Finding the note to be updated then updating it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ success, message: "Not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success, message: "Not found" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ success: true, message: note });
  } catch (error) {
    // Catch errors
    console.error(error.message);
    res.status(500).json({ success, message: error.message });
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const success = false;
  try {
    // Finding the note to be deleted then delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ success, message: "Not found" });
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success, message: "Not Allowed" });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: note });
  } catch (error) {
    // Catch errors
    console.error(error.message);
    res.status(500).json({ success, message: error.message });
  }
});

module.exports = router;
