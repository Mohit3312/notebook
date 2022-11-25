import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "637f6518f27c4d24f6504c31",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c32",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c33",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c34",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c35",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c36",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f6518f27c4d24f6504c30",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first updated note",
      description: "I am updating my first note",
      tag: "personal",
      date: "2022-11-24T12:35:36.516Z",
      __v: 0,
    },
    {
      _id: "637f65f4fd8e00d382d01db2",
      user: "637e5d6159dcdb813b8cd6be",
      title: "My first note",
      description: "I am writing my first note",
      tag: "personal",
      date: "2022-11-24T12:39:16.205Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    const note = {
      _id: "637f65f4fd8e00d382d01db2",
      user: "637e5d6159dcdb813b8cd6be",
      title: title,
      description: description,
      tag: tag,
      date: "2022-11-24T12:39:16.205Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = (id, title, description, tag) => {};
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
