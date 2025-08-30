const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');

const { products, appEvents } = require("./api");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api middleware
  app.use(morgan('dev'));
  // appEvents(app);

  const channel = await CreateChannel();
  products(app, channel);

  // error handling
  
};