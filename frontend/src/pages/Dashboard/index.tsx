import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import { Title, Form, Repositories, Error } from "./styles";

interface Repository {
  full_name: string;
  owner: { login: string; avatar_url: string };
  description: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // maneira de passar valores sem o useEffect
  /*
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const repositoriesSaved = localStorage.getItem(
      "@GithubExplorer:repositories"
    );

    if (repositoriesSaved) {
      return JSON.parse(repositoriesSaved);
    }

    return [];
  });
  */

  useEffect(() => {
    const repositoriesSaved = localStorage.getItem(
      "@GithubExplorer:repositories"
    );

    if (repositoriesSaved) {
      setRepositories(JSON.parse(repositoriesSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "@GithubExplorer:repositories",
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function getRepositories(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo || newRepo === "") {
      setInputError("Digite o autor/nome do repositório");
      return;
    }

    try {
      // o tipo Repository será passado para o data do response
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      setRepositories([...repositories, response.data]);
      setNewRepo("");
      setInputError("");
    } catch (error) {
      setInputError("Erro na busca por esse repositório");
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={getRepositories}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button>Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((r) => (
          <a key={r.full_name} href="teste">
            <img src={r.owner.avatar_url} alt={r.owner.login} />
            <div>
              <strong>{r.full_name}</strong>
              <p>{r.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
