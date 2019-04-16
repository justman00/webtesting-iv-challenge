const express = require("express");
const Cars = require("./carsModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

server.get("/cars", async (req, res) => {
  const cars = await Cars.getAll();

  res.status(200).json(cars);
});

server.post("/cars", async (req, res) => {
  const car = await Cars.insert(req.body);
  res.status(200).json(car);
});

server.delete("/cars/:id", async (req, res) => {
  const deletedCar = await Cars.remove(req.params.id);

  res.status(200).json(deletedCar);
});

module.exports = server;
