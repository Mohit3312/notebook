import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
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
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
