// import path from 'path';
var autoprefixer = require('autoprefixer');
var simplevars = require('postcss-simple-vars');
var nesting = require('postcss-nested');
var calc = require('postcss-calc');
var colorFunction = require('postcss-color-function');
var hexrgba = require('postcss-hexrgba');
var propertyLookup = require('postcss-property-lookup');
var reporter = require('postcss-reporter');

function config(pathPostcss) {
  return [
    autoprefixer({
      browsers: 'last 2 version, iOS >= 10, ie >= 11,',
    }),
    nesting({}),
    propertyLookup(),
    simplevars({}),
    calc(),
    colorFunction(),
    hexrgba(),
    reporter(),
  ];
}

module.exports = config;
