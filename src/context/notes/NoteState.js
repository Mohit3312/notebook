import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [state, setState] = useState({
    name: "Mohit",
    class: "10A",
  });
  const update = (nameParam, classParam) => {
    setTimeout(() => {
      setState({
        name: nameParam,
        class: classParam,
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
