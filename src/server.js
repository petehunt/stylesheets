var processHref = require('./processHref');

var stack = [];

module.exports = {
  requireStylesheet: function(href) {
    href = processHref(href);

    if (stack.length === 0) {
      throw new Error('not in a getHeadMarkupFor() block');
    }
    stack[stack.length - 1][href] = true;
  },

  // Server-specific interface
  getHeadMarkupFor: function(f) {
    stack.push({});
    f();
    return Object.keys(stack.pop()).map(function(item) {
      return '<link rel="stylesheet" href=' + JSON.stringify(item) + ' type="text/css" />';
    }).join('');
  }
};