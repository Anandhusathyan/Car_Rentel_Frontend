import React from "react";
import Approutes from "./Approutes";
import CarContext from "./context/CarContext"

const App = () => {
  return (
    <>
      <CarContext>
        <Approutes />
      </CarContext>
    </>
  );
};

export default App;
