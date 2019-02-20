"use strict";
exports.__esModule = true;
// import express = require("express");
var express = require("express");
var index_1 = require("./controller/index");
var app = express();
app.get("/", index_1.home);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("listening on port " + PORT + "!");
});
