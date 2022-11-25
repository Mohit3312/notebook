import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTVkNjE1OWRjZGI4MTNiOGNkNmJlIn0sImlhdCI6MTY2OTIyODk3NH0.ye34a_CUI9xElFvJ4H0-atwBZ0pf0wN_Rv4RO1rA3RQ",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTVkNjE1OWRjZGI4MTNiOGNkNmJlIn0sImlhdCI6MTY2OTIyODk3NH0.ye34a_CUI9xElFvJ4H0-atwBZ0pf0wN_Rv4RO1rA3RQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });

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
  const editNote = async (id, title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTVkNjE1OWRjZGI4MTNiOGNkNmJlIn0sImlhdCI6MTY2OTIyODk3NH0.ye34a_CUI9xElFvJ4H0-atwBZ0pf0wN_Rv4RO1rA3RQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    // Logic to edit on client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
