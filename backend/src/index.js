const express = require("express");

const port = 3333;

const app = express();

app.use(express.json());

// EXAMPLES

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
