describe('statics', function() {
  it('should work on the server', function() {
    var statics = require('./src/server');
    var markup = statics.getHeadMarkupFor(function() {
      statics.requireStylesheet('myfile.css');
      statics.requireStylesheet('myfile2.css');
    });
    expect(markup).toBe(
      '<link rel="stylesheet" href="myfile.css" type="text/css" />' +
      '<link rel="stylesheet" href="myfile2.css" type="text/css" />'
    );
  });

  it('should work in the browser', function() {
    var jsdom = require('jsdom');
    var done = false;
    var testResults = [];

    runs(function() {
      // this test is unstable; every error is swallowed
      jsdom.env('http://facebook.com/', [], function(errors, window) {
        if (errors) {
          done = false;
          return;
        }
        // `requireStylesheet` calls `document` globally; jsdom puts it in window
        global.window = window;
        global.document = window.document;
        var statics = require('./src/browser');
        statics.requireStylesheet('myfile.css');
        statics.requireStylesheet('myfile2.css');
        // `expect` is swallowed here, don't use it
        testResults.push(document.querySelectorAll('link[href="myfile.css"]').length);
        testResults.push(document.querySelectorAll('link[href="myfile2.css"]').length);
        delete global.window;

        done = true;
      });
    });

    waitsFor(function() {
      return done;
    }, 'testing in the browser');

    runs(function() {
      expect(testResults).toEqual([1, 1]);
    });
  });

  it('should inject _all.css in prod', function() {
    var statics = require('./src/server');
    process.env.NODE_ENV = 'production';
    process.env.STATIC_ROOT = '/statics';
    var markup = statics.getHeadMarkupFor(function() {
      statics.requireStylesheet('myfile.css');
      statics.requireStylesheet('myfile2.css');
    });
    expect(markup).toBe(
      '<link rel="stylesheet" href="/statics/_all.css" type="text/css" />'
    );
  });
});
