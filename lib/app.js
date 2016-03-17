'use strict';

const express = require('express');
const superagent = require('superagent');
const debug = require('debug')('health:app');
const log = require('logfmt').stringify;

module.exports = function App(options) {
  let status = 'unknown';

  checkStatus();
  setInterval(checkStatus, options.interval).unref();

  return express()
    .get('/', (req, res) => { res.send(`${ options.watchURL } is ${ status }.`); });

  function checkStatus() {
    debug(log({ action: 'check', url: options.watchURL }));
    superagent
      .get(options.watchURL)
      .end((err, res) => {
        if (res && res.ok) status = 'UP';
        else if (res && res.clientError) status = 'unknown';
        else status = 'DOWN';
        debug(log({ event: 'checked', status: status }));
      });
  }
}
