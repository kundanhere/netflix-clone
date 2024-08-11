import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
