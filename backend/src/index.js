const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const port = 3333;

const app = express();

app.use(express.json());
app.use(cors());

const projectsTest = [];

function testMiddleware(req, res, next) {
  const { method, url } = req;

  const log = `${method}~> ${url}`;

  console.log(log);

  // sem isso não passa para as outras rotas
  return next();

  // sem return tem a possibilidade de executar codigo após executar o endpoint
  //next();
  //console.log("after");
}

function testIdValidation(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: "id invalid" });
  }

  return next();
}

app.use(testMiddleware);
app.use("/test/:id", testIdValidation);

// pode adicionar quantos middlewares que quiser
//app.get("/test/:title?", testMiddleware, middleware2, (req, res) => {
app.get("/test/:title?", (req, res) => {
  const { title } = req.query;

  const projects =
    title && title != ""
      ? projectsTest.filter((proj) => proj.title.includes(title))
      : projectsTest;

  return res.json({ projects });
});

app.post("/test", (req, res) => {
  const { title, owner } = req.body;
  const project = { id: uuid(), title, owner };

  projectsTest.push(project);

  return res.json({ project });
});

app.put("/test/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projectsTest.findIndex((proj) => proj.id == id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "project not found" });
  }

  const project = { id, title, owner };
  projectsTest[projectIndex] = project;

  return res.json({ project });
});

app.delete("/test/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projectsTest.findIndex((proj) => proj.id == id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "project not found" });
  }

  projectsTest.splice(projectIndex, 1);

  return res.json({
    msg: `deleted: ${req.params.id}`,
  });
});

app.listen(port, () => console.log(`server in: localhost:${port} 🔥`));
