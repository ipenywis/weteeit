const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const chalk = require("chalk");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.listen(PORT, err => {
  if (err) console.error("Serving Error: Cannot Serve React App ", err.message);
  else console.log(chalk.default.green(`Serving Weteeit App on PORT:${PORT}`));
});
