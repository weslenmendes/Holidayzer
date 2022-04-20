import express from "express";
import { holidays } from "./data.js";

const app = express();

app.get("/holidays", (req, res) => {
  res.send(holidays);
});

app.get("/holidays/:id", (req, res) => {
  const { id } = req.params;

  if (+id < 1 || +id > 12) {
    res.send("Não existe esse mês");
  } else {
    const holidaysInThisMonth = holidays.filter(
      ({ date }) => date.split("/")[0] === id
    );

    res.send(holidaysInThisMonth);
  }
});

app.get("/is-today-holiday", (req, res) => {
  const today = new Date().toLocaleDateString();

  const holiday = holidays.filter(({ date }) => date === today);

  if (holiday.length) {
    res.send("Sim, hoje é " + holiday[0].name);
  } else {
    res.send("Não, hoje não é feriado");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em: http://localhost:3000/");
});
