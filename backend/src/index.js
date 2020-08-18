const express = require("express");

const port = 3333;

const app = express();

app.use(express.json());

// url test
// http://localhost:3333/teste/savio?lastname=fontes
app.get("/test/:name/:lastname?", (req, res) => {
  console.log(`${req.method}: localhost:${port}/test`);
  return res.json({
    msg: `hello world ${req.params.name} ${req.query.lastname}`,
  });
});

app.listen(port, () => console.log(`server in: localhost:${port} 🔥`));
