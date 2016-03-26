/* */ 
var m = require('./lib/core'),
    IntlPolyfill = m['default'];
global.IntlPolyfill = IntlPolyfill;
require('@empty');
if (!global.Intl) {
  global.Intl = IntlPolyfill;
  IntlPolyfill.__applyLocaleSensitivePrototypes();
}
module.exports = exports = IntlPolyfill;
exports['default'] = IntlPolyfill;
