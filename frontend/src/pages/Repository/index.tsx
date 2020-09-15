import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import api from "../../services/api";
import { Header, RepositoryInfo, Issues } from "./styles";
import logo from "../../assets/logo.svg";

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  stargazers_count: string;
  forks_count: string;
  open_issues_count: string;
  owner: { login: string; avatar_url: string };
  description: string;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    getData();

    async function getData(): Promise<void> {
      // maneira mais padrão para executar ao mesmo tempo
      /*
      api
        .get(`repos/${params.repository}`)
        .then((response) => setRepository(response.data));
      api
        .get(`repos/${params.repository}/issues`)
        .then((response) => setIssues(response.data));
      */
      // maneira não recomendada no caso de mais de muitas requisições por uma esperar a outra
      /*
      const response = await api.get(`repos/${params.repository}`);
      const responseIssues = await api.get(`repos/${params.repository}/issues`);
      */
      // maneira alternativa com desestruturação para executar ao mesmo tempo

      const [responseRepository, responseIssues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);
      setRepository(responseRepository.data);
      setIssues(responseIssues.data);
    }
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((value) => (
          <Link to={value.html_url}>
            <div>
              <strong>{value.title}</strong>
              <p>{value.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
