const express = require('express');
const cors  = require('cors');
const morgan = require('morgan');

const { customer, appEvents } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')




module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

  // Health check on the correct app instance
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: process.env.PORT });
  });

    //api middleware
    app.use(morgan('dev'));
    // appEvents(app);

    const channel = await CreateChannel()

    customer(app, channel);
    // error handling
    
}