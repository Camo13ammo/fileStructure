Proposed Webapp File Structure With Gulp
========================================

1. Make sure Node is installed
```
brew install node
```

2. Globally install the Gulp cli
```
npm install gulp-cli -g
```

3. Install all npm dependencies in ./ & ./src
```
npm install
cd ./src
npm install
```

4. (Optional) You can install the chome extention LiveReload.
    This will sync with Gulp to automatically reload your browser
    when you modify any app or css files. We can further
    configure it later to even refresh with html updates.

5. Run Gulp in a tab
```
gulp
```
It will automatically read from our gulpfile.js

Notes:
- We can change the Gulp build process for development and productuon environments
- Gulp-ngAnimate is handling Angular injection for us automatically!
- Babel is transpiling all our code from ES6 to ES5!!
- Gulp-sourcemap is definitely something we don't want in the production build.
    It creates a sourcemap file that helps for prettifying minified/uglified code.
- I still need to look into Karma/Mocha/Chai/PhantomJS for a testing suite.
