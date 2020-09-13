import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

interface Repository {
  full_name: string;
  owner: { login: string; avatar_url: string };
  description: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function getRepositories(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setNewRepo("");

    // o tipo Repository será passado para o data do response
    const response = await api.get<Repository>(`/repos/${newRepo}`);

    if (response.status === 200) {
      console.log(response.data);

      setRepositories([...repositories, response.data]);
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form onSubmit={getRepositories}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button>Pesquisar</button>
      </Form>
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
