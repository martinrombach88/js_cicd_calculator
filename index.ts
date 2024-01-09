import getDateString from "./src/api/helpers/getDateString";
import getRouteString from "./src/api/helpers/getRouteString";
import Calculator from "./src/api/calculator/calculator";
import * as express from "express";
import * as bodyParser from "body-parser";

//const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const port: number = 8080;
const testCalc = new Calculator();

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  res.json({ message: "pong" });
  // console.log(`${getRouteString("Home", port)} ${getDateString()}.`);
  //console.log(`Calculator says 1 + 1 =`, testCalc.calculate("1+1"));
});

app.post("/calculation-result/", (req: any, res: any) => {
  console.log(req.body.expression);
  console.log(
    `${getRouteString("Calculation", port)} Params: ${
      req.body.expression
    } has the result ${testCalc.calculate(
      req.body.expression
    )}. ${getDateString()}.`
  );
  res.json({ result: testCalc.calculate(req.body.expression) });
});

const server = app.listen(port);

export default [app, server];
