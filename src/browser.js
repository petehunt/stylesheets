// Cache DOM reads so we don't need to do them
// over and over
var processHref = require('./processHref');

var alreadyRequired = {};

module.exports = {
  requireStylesheet: function(href) {
    href = processHref(href);

    if (alreadyRequired[href] === undefined) {
      // Need to check if it was server rendered
      alreadyRequired[href] = document.querySelectorAll(
        'link[href=' + JSON.stringify(href) + ']'
      ).length;
    }

    if (!alreadyRequired[href]) {
      // Actually insert the stylesheet
      var elem = document.createElement('link');
      elem.rel = 'stylesheet';
      elem.href = href;
      elem.type = 'text/css';

      document.getElementsByTagName('head')[0].appendChild(elem);

      alreadyRequired[href] = true;
    }
  }
};