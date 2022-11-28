import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Alert = () => {
  const context = useContext(NoteContext);
  const { alert } = context;
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    let firstChar = word.toUpperCase().charAt(0);
    let restChar = word.slice(1);
    return firstChar + restChar;
  };
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
