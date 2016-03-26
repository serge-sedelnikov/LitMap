/* */ 
define(['exports', './i18n'], function (exports, _i18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DfValueConverter = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DfValueConverter = exports.DfValueConverter = function () {
    DfValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };

    function DfValueConverter(i18n) {
      _classCallCheck(this, DfValueConverter);

      this.service = i18n;
    }

    DfValueConverter.prototype.toView = function toView(value, formatOptions, locale, dateFormat) {
      var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

      return df.format(value);
    };

    return DfValueConverter;
  }();
});