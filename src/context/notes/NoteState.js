import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
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

    const note = await response.json();
    if (note.success === true) {
      showAlert("success", "Note has been added successfully");
    } else {
      showAlert("danger", note.message);
    }
    setNotes(notes.concat(note.message));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3ZTVkNjE1OWRjZGI4MTNiOGNkNmJlIn0sImlhdCI6MTY2OTIyODk3NH0.ye34a_CUI9xElFvJ4H0-atwBZ0pf0wN_Rv4RO1rA3RQ",
      },
    });
    const json = await response.json();
    if (json.success === true) {
      showAlert("success", "Note has been deleted successfully");
    } else {
      showAlert("danger", json.message);
    }

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

    const json = await response.json();
    if (json.success === true) {
      showAlert("success", "Note has been updated successfully");
    } else {
      showAlert("danger", json.message);
    }
    // Logic to edit on client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        alert,
        showAlert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
