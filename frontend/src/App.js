import React, { useState } from "react";
import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState(["dev app", "fontend", "api"]);

  function handleAddProject() {
    setProjects([...projects, `Novo projeto: ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Home">
        <ul>
          <li>Home</li>

          <li>Perfil</li>
          <li>Sair</li>
        </ul>
      </Header>
      <ul>
        {projects.map((value, index) => (
          <li key={`${index}`}>{value}</li>
        ))}
      </ul>
      <button type="button" onClick={() => handleAddProject()}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
