const express = require("express");
const { uuid } = require("uuidv4");

const port = 3333;

const app = express();

app.use(express.json());

const projectsTest = [];

app.get("/test/:title?", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);

  const { title } = req.query;

  const projects =
    title && title != ""
      ? projectsTest.filter((proj) => proj.title.includes(title))
      : projectsTest;

  return res.json({ projects });
});

app.post("/test", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);

  const { title, owner } = req.body;
  const project = { id: uuid(), title, owner };

  projectsTest.push(project);

  return res.json({ project });
});

app.put("/test/:id", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);

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
  console.log(`${req.method}: localhost:${port}/test`);

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
