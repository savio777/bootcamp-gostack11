import React from "react";

import logo from "../../assets/logo.svg";

import { Title, Form } from "./styles";

const Dashboard: React.FC = () => (
  <>
    <img src={logo} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button>Pesquisar</button>
    </Form>
  </>
);

export default Dashboard;
