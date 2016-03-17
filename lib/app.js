'use strict';

const express = require('express');
const superagent = require('superagent');

module.exports = function App(options) {
  let status = 'unknown';

  checkStatus();
  setInterval(checkStatus, options.interval).unref();
  
  return express()
    .get('/', (req, res) => { res.send(`${ options.watchURL } is ${ status }.`); });

  function checkStatus() {
    superagent
      .get(options.watchURL)
      .end((err, res) => {
        if (res && res.ok) status = 'UP';
        else if (res && res.clientError) status = 'unknown';
        else status = 'DOWN';
      });
  }
}
