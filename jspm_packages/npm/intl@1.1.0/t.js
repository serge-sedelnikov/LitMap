/* */ 
var IntlPolyfill = require('./index');
var d = new Date('2015/07/07');
var o = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
};
var a = new Intl.DateTimeFormat('en', o).format(d);
var b = new IntlPolyfill.DateTimeFormat('en', o).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
var o = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
var a = new Intl.DateTimeFormat('ja-JP', o).format(d);
var b = new IntlPolyfill.DateTimeFormat('ja-JP', o).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
var a = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
var b = new IntlPolyfill.DateTimeFormat('en', {month: '2-digit'}).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
var o = {weekday: 'long'};
var a = new Intl.DateTimeFormat('en-US', o).format(d);
var b = new IntlPolyfill.DateTimeFormat('en-US', o).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
var o = {month: 'long'};
var a = new Intl.DateTimeFormat('en', o).format(d);
var b = new IntlPolyfill.DateTimeFormat('en', o).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
var o = {
  month: 'long',
  day: 'numeric'
};
var a = new Intl.DateTimeFormat('en', o).format(d);
var b = new IntlPolyfill.DateTimeFormat('en', o).format(d);
console.log('chrome  : ', a);
console.log('polyfill: ', b);
console.log('ddddd');
var d1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
var o = {
  year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "short"
};
var uu = new IntlPolyfill.DateTimeFormat('zh', o);
var b = uu.format(d1);
console.log('expected:  2012年12月19日星期三');
console.log('polyfill: ', b, uu);
