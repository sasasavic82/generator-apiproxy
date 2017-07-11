#!/usr/bin/env node
'use strict';
const meow = require('meow');
const generatorApigeeApiproxy = require('./');

const cli = meow(`
Usage
  $ generator-apigee-apiproxy [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ generator-apigee-apiproxy
  unicorns
  $ generator-apigee-apiproxy rainbows
  unicorns & rainbows
`);
