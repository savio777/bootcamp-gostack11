import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    /*async function getRepositories() {
      const response = await api.get("/test");

      if (response.status == 200) {
        setProjects(response.data.projects);
      }
    }
    getRepositories();*/

    api.get("/test").then((response) => {
      setProjects(response.data.projects);
    });
  }, []);

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
        {projects.map((value) => (
          <li key={value.id}>{value.title}</li>
        ))}
      </ul>
      <button type="button" onClick={() => handleAddProject()}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
