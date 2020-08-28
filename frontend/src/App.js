import React from "react";
import Header from "./components/Header";

const App = () => (
  <>
    <Header title="Home">
      <ul>
        <li>Home</li>
        <li>Perfil</li>
        <li>Sair</li>
      </ul>
    </Header>
    <Header title="Test" />
    <h1>Hello World React</h1>
  </>
);

export default App;
