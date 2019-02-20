// import express = require("express");
import * as express from "express";
import { home } from "./controller/index";

const app: express.Application = express();

app.get("/", home);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`listening on port ${PORT}!`);
});
