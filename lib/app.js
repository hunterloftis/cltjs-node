'use strict';

const express = require('express');

module.exports = function App() {
  return express()
    .get('/', (req, res) => { res.send('Hello, world'); });
}
