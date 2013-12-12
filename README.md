# ilanguagecloud

Make dynamic wordclouds.

## Getting Started
### On the server
Install the module with: `npm install ilanguagecloud`

```javascript
var ilanguagecloud = require('ilanguagecloud');
ilanguagecloud.WordCloud(); // returns a wordcloud object with default options
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com//ilanguagecloud/master/dist/ilanguagecloud.min.js
[max]: https://raw.github.com//ilanguagecloud/master/dist/ilanguagecloud.js

In your web page:

```html
<script src="dist/ilanguagecloud.min.js"></script>
<script>
  WordCloud().render(); // renders a default cloud to a div id="cloud" if exists
</script>
```

Optionally, you can pass an options object to ilanguagecloud.

```html
<script>
  var myOptions = {
    element: 'cloud',
    text: 'Lots of fun and amazing words go here',
    font: 'FreeSans',
    stopWords: 'a an the he she it we be go am was were'
  };
</script>
<script src="dist/ilanguagecloud.min.js"></script>
<script>
  WordCloud(myOptions).render();
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
 
 Copyright (c) 2013 . Licensed under the MIT license.
