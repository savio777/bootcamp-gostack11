import React from "react";
import { FiChevronRight } from "react-icons/fi";

import logo from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

const Dashboard: React.FC = () => (
  <>
    <img src={logo} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button>Pesquisar</button>
    </Form>
    <Repositories>
      <a href="teste">
        <img
          src="https://avatars3.githubusercontent.com/u/35678887?v=4"
          alt="savio"
        />
        <div>
          <strong>savio777/aircnc</strong>
          <p>
            aplicação criada a partir do curso grátis
          </p>
        </div>

        <FiChevronRight size={20} />
      </a>

      <a href="teste">
        <img
          src="https://avatars3.githubusercontent.com/u/35678887?v=4"
          alt="savio"
        />
        <div>
          <strong>savio777/aircnc</strong>
          <p>
            aplicação criada a partir do curso grátis
          </p>
        </div>

        <FiChevronRight size={20} />
      </a>
      <a href="teste">
        <img
          src="https://avatars3.githubusercontent.com/u/35678887?v=4"
          alt="savio"
        />
        <div>
          <strong>savio777/aircnc</strong>
          <p>
            aplicação criada a partir do curso grátis
          </p>
        </div>

        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
);

export default Dashboard;
