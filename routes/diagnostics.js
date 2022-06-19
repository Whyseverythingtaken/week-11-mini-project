const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const diagnosticsJson = require("../db/diagnostics.json");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  res.json(diagnosticsJson);
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const diagnosticsObject = {
    time: new Date().getTime(),
    uuid: uuidv4(),
    errors: req.body,
  };

  readAndAppend(diagnosticsObject, "./db/diagnostics.json");

  res.send("Thanks for reporting");
});

module.exports = diagnostics;
