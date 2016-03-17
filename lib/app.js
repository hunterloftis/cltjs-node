'use strict';

const express = require('express');

module.exports = function App(options) {
  let status = 'unknown';

  return express()
    .get('/', (req, res) => { res.send(`${ options.watchURL } is ${ status }.`); });
}
