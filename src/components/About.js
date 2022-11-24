import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  const { state, update } = useContext(NoteContext);
  useEffect(() => {
    update("Kartik", "8A");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is About component {state.name} and he is in Class - {state.class}
    </div>
  );
};

export default About;
