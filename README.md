# stylesheets

## Mission

Insert stylesheet requires on the server and client.

## API for component authors

  * `require('stylesheets').requireStylesheet("myfile.css")`: ensure a stylesheet is in the document. must contain only a literal string, concat operator or `process.env.STATIC_ROOT`.

## API for users

  * `var headmarkup = require('stylesheets').getHeadMarkupFor(function() { /* your app code */ });` -- get the HTML needed to include stylesheets into a static HTML file.

