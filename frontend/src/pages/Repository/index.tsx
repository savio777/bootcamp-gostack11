import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Header, RepositoryInfo, Issues } from "./styles";
import logo from "../../assets/logo.svg";

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  // const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars3.githubusercontent.com/u/35678887?v=4"
            alt="savio777"
          />
          <div>
            <strong>savio777/tcc</strong>
            <p>descrição bla bla</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>49</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>78</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="iae">
          <div>
            <strong>iae</strong>
            <p>iae iae</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
