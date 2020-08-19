const express = require("express");

const port = 3333;

const app = express();

app.use(express.json());

/*
  VERBOS HTTP:
  
  GET~> Buscar informações da api;
  POST~> Criar uma informação na api;
  PUT/PATCH~> Alterar uma informação na api;
  DELETE~> Deletar uma informação na api;
*/

/*
  Uso Geral de Parâmetros:
  
  Query~> filtros e paginação, 
  ex:localhost:3333/teste?teste=teste ;
  
  Route~> identificar recursos (atualizar/deletar), 
  ex:localhost:3333/teste/teste
  
  Body~> informações para criar ou editar um recurso (JSON),
  ex: {"teste":"teste"};

  Header~> autenticar usuário ou passar alguma configuração para a api,
  ex: "Auth": "87f633634cc4b02f628685651f0a29b7bfa22a0bd841f725c6772dd00a58d489";
*/

app.get("/test/:name/:lastname?", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);
  return res.json({
    msg: `hello world ${req.params.name} ${req.query.lastname}`,
  });
});

app.post("/test", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);
  return res.json({ result: { ...req.body, auth: `${req.headers.authtest}` } });
});

app.put("/test/:id", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);
  return res.json({
    result: {
      ...req.body,
      id: req.params.id,
      auth: `${req.headers.authtest}`,
    },
  });
});

app.delete("/test/:id", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);
  return res.json({
    msg: `deleted: ${req.params.id}`,
    auth: `${req.headers.authtest}`,
  });
});

app.listen(port, () => console.log(`server in: localhost:${port} 🔥`));
