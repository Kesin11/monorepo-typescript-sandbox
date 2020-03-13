'use strict';

const provider = require('provider')

module.exports = consumer;

function consumer() {
    const arr = provider()
    arr.forEach(val => console.log(val))
}
