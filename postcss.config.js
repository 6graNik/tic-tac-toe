const path = require('path');
const autoprefixer = require('autoprefixer');
const simplevars = require('postcss-simple-vars');
const nesting = require('postcss-nested');
const calc = require('postcss-calc');
const colorFunction = require('postcss-color-function');
const hexrgba = require('postcss-hexrgba');
const propertyLookup = require('postcss-property-lookup');
const postcssUtilities = require('postcss-utilities');
const reporter = require('postcss-reporter');

module.exports = function (pathPostcss) {
  return [
    autoprefixer({
      browsers: 'last 2 version, iOS >= 8, ie >= 10',
    }),
    postcssUtilities(),
    nesting({}),
    propertyLookup(),
    calc(),
    colorFunction(),
    hexrgba(),
    reporter(),
  ];
};
