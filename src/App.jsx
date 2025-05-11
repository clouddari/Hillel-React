import { useState } from "react";
import Header from "./Header";
import LeftNav from "./LeftNav";
import CentralContainer from "./CentralContainer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <LeftNav />
        <CentralContainer />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
