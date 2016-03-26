/* */ 
(function(process) {
  "use strict";
  var src$exp$$ = require('./exp'),
      src$cldr$$ = require('./cldr');
  var Intl = {},
      realDefineProp = (function() {
        var sentinel = {};
        try {
          Object.defineProperty(sentinel, 'a', {});
          return 'a' in sentinel;
        } catch (e) {
          return false;
        }
      })(),
      es3 = !realDefineProp && !Object.prototype.__defineGetter__,
      hop = Object.prototype.hasOwnProperty,
      defineProperty = realDefineProp ? Object.defineProperty : function(obj, name, desc) {
        if ('get' in desc && obj.__defineGetter__)
          obj.__defineGetter__(name, desc.get);
        else if (!hop.call(obj, name) || 'value' in desc)
          obj[name] = desc.value;
      },
      arrIndexOf = Array.prototype.indexOf || function(search) {
        var t = this;
        if (!t.length)
          return -1;
        for (var i = arguments[1] || 0,
            max = t.length; i < max; i++) {
          if (t[i] === search)
            return i;
        }
        return -1;
      },
      objCreate = Object.create || function(proto, props) {
        var obj;
        function F() {}
        F.prototype = proto;
        obj = new F();
        for (var k in props) {
          if (hop.call(props, k))
            defineProperty(obj, k, props[k]);
        }
        return obj;
      },
      arrSlice = Array.prototype.slice,
      arrConcat = Array.prototype.concat,
      arrPush = Array.prototype.push,
      arrJoin = Array.prototype.join,
      arrShift = Array.prototype.shift,
      arrUnshift = Array.prototype.unshift,
      fnBind = Function.prototype.bind || function(thisObj) {
        var fn = this,
            args = arrSlice.call(arguments, 1);
        if (fn.length === 1) {
          return function(a) {
            return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
          };
        } else {
          return function() {
            return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
          };
        }
      },
      defaultLocale,
      internals = objCreate(null),
      secret = Math.random(),
      dateWidths = objCreate(null, {
        narrow: {},
        short: {},
        long: {}
      }),
      numberFormatProtoInitialised = false,
      dateTimeFormatProtoInitialised = false,
      expCurrencyCode = /^[A-Z]{3}$/,
      expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi,
      redundantTags = {
        tags: {
          "art-lojban": "jbo",
          "i-ami": "ami",
          "i-bnn": "bnn",
          "i-hak": "hak",
          "i-klingon": "tlh",
          "i-lux": "lb",
          "i-navajo": "nv",
          "i-pwn": "pwn",
          "i-tao": "tao",
          "i-tay": "tay",
          "i-tsu": "tsu",
          "no-bok": "nb",
          "no-nyn": "nn",
          "sgn-BE-FR": "sfb",
          "sgn-BE-NL": "vgt",
          "sgn-CH-DE": "sgg",
          "zh-guoyu": "cmn",
          "zh-hakka": "hak",
          "zh-min-nan": "nan",
          "zh-xiang": "hsn",
          "sgn-BR": "bzs",
          "sgn-CO": "csn",
          "sgn-DE": "gsg",
          "sgn-DK": "dsl",
          "sgn-ES": "ssp",
          "sgn-FR": "fsl",
          "sgn-GB": "bfi",
          "sgn-GR": "gss",
          "sgn-IE": "isg",
          "sgn-IT": "ise",
          "sgn-JP": "jsl",
          "sgn-MX": "mfs",
          "sgn-NI": "ncs",
          "sgn-NL": "dse",
          "sgn-NO": "nsl",
          "sgn-PT": "psr",
          "sgn-SE": "swl",
          "sgn-US": "ase",
          "sgn-ZA": "sfs",
          "zh-cmn": "cmn",
          "zh-cmn-Hans": "cmn-Hans",
          "zh-cmn-Hant": "cmn-Hant",
          "zh-gan": "gan",
          "zh-wuu": "wuu",
          "zh-yue": "yue"
        },
        subtags: {
          BU: "MM",
          DD: "DE",
          FX: "FR",
          TP: "TL",
          YD: "YE",
          ZR: "CD",
          heploc: "alalc97",
          'in': "id",
          iw: "he",
          ji: "yi",
          jw: "jv",
          mo: "ro",
          ayx: "nun",
          bjd: "drl",
          ccq: "rki",
          cjr: "mom",
          cka: "cmr",
          cmk: "xch",
          drh: "khk",
          drw: "prs",
          gav: "dev",
          hrr: "jal",
          ibi: "opa",
          kgh: "kml",
          lcq: "ppr",
          mst: "mry",
          myt: "mry",
          sca: "hle",
          tie: "ras",
          tkk: "twm",
          tlw: "weo",
          tnf: "prs",
          ybd: "rki",
          yma: "lrr"
        },
        extLang: {
          aao: ["aao", "ar"],
          abh: ["abh", "ar"],
          abv: ["abv", "ar"],
          acm: ["acm", "ar"],
          acq: ["acq", "ar"],
          acw: ["acw", "ar"],
          acx: ["acx", "ar"],
          acy: ["acy", "ar"],
          adf: ["adf", "ar"],
          ads: ["ads", "sgn"],
          aeb: ["aeb", "ar"],
          aec: ["aec", "ar"],
          aed: ["aed", "sgn"],
          aen: ["aen", "sgn"],
          afb: ["afb", "ar"],
          afg: ["afg", "sgn"],
          ajp: ["ajp", "ar"],
          apc: ["apc", "ar"],
          apd: ["apd", "ar"],
          arb: ["arb", "ar"],
          arq: ["arq", "ar"],
          ars: ["ars", "ar"],
          ary: ["ary", "ar"],
          arz: ["arz", "ar"],
          ase: ["ase", "sgn"],
          asf: ["asf", "sgn"],
          asp: ["asp", "sgn"],
          asq: ["asq", "sgn"],
          asw: ["asw", "sgn"],
          auz: ["auz", "ar"],
          avl: ["avl", "ar"],
          ayh: ["ayh", "ar"],
          ayl: ["ayl", "ar"],
          ayn: ["ayn", "ar"],
          ayp: ["ayp", "ar"],
          bbz: ["bbz", "ar"],
          bfi: ["bfi", "sgn"],
          bfk: ["bfk", "sgn"],
          bjn: ["bjn", "ms"],
          bog: ["bog", "sgn"],
          bqn: ["bqn", "sgn"],
          bqy: ["bqy", "sgn"],
          btj: ["btj", "ms"],
          bve: ["bve", "ms"],
          bvl: ["bvl", "sgn"],
          bvu: ["bvu", "ms"],
          bzs: ["bzs", "sgn"],
          cdo: ["cdo", "zh"],
          cds: ["cds", "sgn"],
          cjy: ["cjy", "zh"],
          cmn: ["cmn", "zh"],
          coa: ["coa", "ms"],
          cpx: ["cpx", "zh"],
          csc: ["csc", "sgn"],
          csd: ["csd", "sgn"],
          cse: ["cse", "sgn"],
          csf: ["csf", "sgn"],
          csg: ["csg", "sgn"],
          csl: ["csl", "sgn"],
          csn: ["csn", "sgn"],
          csq: ["csq", "sgn"],
          csr: ["csr", "sgn"],
          czh: ["czh", "zh"],
          czo: ["czo", "zh"],
          doq: ["doq", "sgn"],
          dse: ["dse", "sgn"],
          dsl: ["dsl", "sgn"],
          dup: ["dup", "ms"],
          ecs: ["ecs", "sgn"],
          esl: ["esl", "sgn"],
          esn: ["esn", "sgn"],
          eso: ["eso", "sgn"],
          eth: ["eth", "sgn"],
          fcs: ["fcs", "sgn"],
          fse: ["fse", "sgn"],
          fsl: ["fsl", "sgn"],
          fss: ["fss", "sgn"],
          gan: ["gan", "zh"],
          gds: ["gds", "sgn"],
          gom: ["gom", "kok"],
          gse: ["gse", "sgn"],
          gsg: ["gsg", "sgn"],
          gsm: ["gsm", "sgn"],
          gss: ["gss", "sgn"],
          gus: ["gus", "sgn"],
          hab: ["hab", "sgn"],
          haf: ["haf", "sgn"],
          hak: ["hak", "zh"],
          hds: ["hds", "sgn"],
          hji: ["hji", "ms"],
          hks: ["hks", "sgn"],
          hos: ["hos", "sgn"],
          hps: ["hps", "sgn"],
          hsh: ["hsh", "sgn"],
          hsl: ["hsl", "sgn"],
          hsn: ["hsn", "zh"],
          icl: ["icl", "sgn"],
          ils: ["ils", "sgn"],
          inl: ["inl", "sgn"],
          ins: ["ins", "sgn"],
          ise: ["ise", "sgn"],
          isg: ["isg", "sgn"],
          isr: ["isr", "sgn"],
          jak: ["jak", "ms"],
          jax: ["jax", "ms"],
          jcs: ["jcs", "sgn"],
          jhs: ["jhs", "sgn"],
          jls: ["jls", "sgn"],
          jos: ["jos", "sgn"],
          jsl: ["jsl", "sgn"],
          jus: ["jus", "sgn"],
          kgi: ["kgi", "sgn"],
          knn: ["knn", "kok"],
          kvb: ["kvb", "ms"],
          kvk: ["kvk", "sgn"],
          kvr: ["kvr", "ms"],
          kxd: ["kxd", "ms"],
          lbs: ["lbs", "sgn"],
          lce: ["lce", "ms"],
          lcf: ["lcf", "ms"],
          liw: ["liw", "ms"],
          lls: ["lls", "sgn"],
          lsg: ["lsg", "sgn"],
          lsl: ["lsl", "sgn"],
          lso: ["lso", "sgn"],
          lsp: ["lsp", "sgn"],
          lst: ["lst", "sgn"],
          lsy: ["lsy", "sgn"],
          ltg: ["ltg", "lv"],
          lvs: ["lvs", "lv"],
          lzh: ["lzh", "zh"],
          max: ["max", "ms"],
          mdl: ["mdl", "sgn"],
          meo: ["meo", "ms"],
          mfa: ["mfa", "ms"],
          mfb: ["mfb", "ms"],
          mfs: ["mfs", "sgn"],
          min: ["min", "ms"],
          mnp: ["mnp", "zh"],
          mqg: ["mqg", "ms"],
          mre: ["mre", "sgn"],
          msd: ["msd", "sgn"],
          msi: ["msi", "ms"],
          msr: ["msr", "sgn"],
          mui: ["mui", "ms"],
          mzc: ["mzc", "sgn"],
          mzg: ["mzg", "sgn"],
          mzy: ["mzy", "sgn"],
          nan: ["nan", "zh"],
          nbs: ["nbs", "sgn"],
          ncs: ["ncs", "sgn"],
          nsi: ["nsi", "sgn"],
          nsl: ["nsl", "sgn"],
          nsp: ["nsp", "sgn"],
          nsr: ["nsr", "sgn"],
          nzs: ["nzs", "sgn"],
          okl: ["okl", "sgn"],
          orn: ["orn", "ms"],
          ors: ["ors", "ms"],
          pel: ["pel", "ms"],
          pga: ["pga", "ar"],
          pks: ["pks", "sgn"],
          prl: ["prl", "sgn"],
          prz: ["prz", "sgn"],
          psc: ["psc", "sgn"],
          psd: ["psd", "sgn"],
          pse: ["pse", "ms"],
          psg: ["psg", "sgn"],
          psl: ["psl", "sgn"],
          pso: ["pso", "sgn"],
          psp: ["psp", "sgn"],
          psr: ["psr", "sgn"],
          pys: ["pys", "sgn"],
          rms: ["rms", "sgn"],
          rsi: ["rsi", "sgn"],
          rsl: ["rsl", "sgn"],
          sdl: ["sdl", "sgn"],
          sfb: ["sfb", "sgn"],
          sfs: ["sfs", "sgn"],
          sgg: ["sgg", "sgn"],
          sgx: ["sgx", "sgn"],
          shu: ["shu", "ar"],
          slf: ["slf", "sgn"],
          sls: ["sls", "sgn"],
          sqk: ["sqk", "sgn"],
          sqs: ["sqs", "sgn"],
          ssh: ["ssh", "ar"],
          ssp: ["ssp", "sgn"],
          ssr: ["ssr", "sgn"],
          svk: ["svk", "sgn"],
          swc: ["swc", "sw"],
          swh: ["swh", "sw"],
          swl: ["swl", "sgn"],
          syy: ["syy", "sgn"],
          tmw: ["tmw", "ms"],
          tse: ["tse", "sgn"],
          tsm: ["tsm", "sgn"],
          tsq: ["tsq", "sgn"],
          tss: ["tss", "sgn"],
          tsy: ["tsy", "sgn"],
          tza: ["tza", "sgn"],
          ugn: ["ugn", "sgn"],
          ugy: ["ugy", "sgn"],
          ukl: ["ukl", "sgn"],
          uks: ["uks", "sgn"],
          urk: ["urk", "ms"],
          uzn: ["uzn", "uz"],
          uzs: ["uzs", "uz"],
          vgt: ["vgt", "sgn"],
          vkk: ["vkk", "ms"],
          vkt: ["vkt", "ms"],
          vsi: ["vsi", "sgn"],
          vsl: ["vsl", "sgn"],
          vsv: ["vsv", "sgn"],
          wuu: ["wuu", "zh"],
          xki: ["xki", "sgn"],
          xml: ["xml", "sgn"],
          xmm: ["xmm", "ms"],
          xms: ["xms", "sgn"],
          yds: ["yds", "sgn"],
          ysl: ["ysl", "sgn"],
          yue: ["yue", "zh"],
          zib: ["zib", "sgn"],
          zlm: ["zlm", "ms"],
          zmi: ["zmi", "ms"],
          zsl: ["zsl", "sgn"],
          zsm: ["zsm", "ms"]
        }
      },
      currencyMinorUnits = {
        BHD: 3,
        BYR: 0,
        XOF: 0,
        BIF: 0,
        XAF: 0,
        CLF: 4,
        CLP: 0,
        KMF: 0,
        DJF: 0,
        XPF: 0,
        GNF: 0,
        ISK: 0,
        IQD: 3,
        JPY: 0,
        JOD: 3,
        KRW: 0,
        KWD: 3,
        LYD: 3,
        OMR: 3,
        PYG: 0,
        RWF: 0,
        TND: 3,
        UGX: 0,
        UYI: 0,
        VUV: 0,
        VND: 0
      };
  function IsStructurallyValidLanguageTag(locale) {
    if (!src$exp$$.expBCP47Syntax.test(locale))
      return false;
    if (src$exp$$.expVariantDupes.test(locale))
      return false;
    if (src$exp$$.expSingletonDupes.test(locale))
      return false;
    return true;
  }
  function CanonicalizeLanguageTag(locale) {
    var match,
        parts;
    locale = locale.toLowerCase();
    parts = locale.split('-');
    for (var i = 1,
        max = parts.length; i < max; i++) {
      if (parts[i].length === 2)
        parts[i] = parts[i].toUpperCase();
      else if (parts[i].length === 4)
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
      else if (parts[i].length === 1 && parts[i] !== 'x')
        break;
    }
    locale = arrJoin.call(parts, '-');
    if ((match = locale.match(src$exp$$.expExtSequences)) && match.length > 1) {
      match.sort();
      locale = locale.replace(RegExp('(?:' + src$exp$$.expExtSequences.source + ')+', 'i'), arrJoin.call(match, ''));
    }
    if (hop.call(redundantTags.tags, locale))
      locale = redundantTags.tags[locale];
    parts = locale.split('-');
    for (var i = 1,
        max = parts.length; i < max; i++) {
      if (hop.call(redundantTags.subtags, parts[i]))
        parts[i] = redundantTags.subtags[parts[i]];
      else if (hop.call(redundantTags.extLang, parts[i])) {
        parts[i] = redundantTags.extLang[parts[i]][0];
        if (i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
          parts = arrSlice.call(parts, i++);
          max -= 1;
        }
      }
    }
    return arrJoin.call(parts, '-');
  }
  function DefaultLocale() {
    return defaultLocale;
  }
  function IsWellFormedCurrencyCode(currency) {
    var c = String(currency),
        normalized = toLatinUpperCase(c);
    if (expCurrencyCode.test(normalized) === false)
      return false;
    return true;
  }
  function CanonicalizeLocaleList(locales) {
    if (locales === undefined)
      return new List();
    var seen = new List(),
        locales = typeof locales === 'string' ? [locales] : locales,
        O = toObject(locales),
        len = O.length,
        k = 0;
    while (k < len) {
      var Pk = String(k),
          kPresent = Pk in O;
      if (kPresent) {
        var kValue = O[Pk];
        if (kValue == null || (typeof kValue !== 'string' && typeof kValue !== 'object'))
          throw new TypeError('String or Object type expected');
        var tag = String(kValue);
        if (!IsStructurallyValidLanguageTag(tag))
          throw new RangeError("'" + tag + "' is not a structurally valid language tag");
        tag = CanonicalizeLanguageTag(tag);
        if (arrIndexOf.call(seen, tag) === -1)
          arrPush.call(seen, tag);
      }
      k++;
    }
    return seen;
  }
  function BestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while (true) {
      if (arrIndexOf.call(availableLocales, candidate) > -1)
        return candidate;
      var pos = candidate.lastIndexOf('-');
      if (pos < 0)
        return;
      if (pos >= 2 && candidate.charAt(pos - 2) === '-')
        pos -= 2;
      candidate = candidate.substring(0, pos);
    }
  }
  function LookupMatcher(availableLocales, requestedLocales) {
    var i = 0,
        len = requestedLocales.length,
        availableLocale;
    while (i < len && !availableLocale) {
      var locale = requestedLocales[i],
          noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
          availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
      i++;
    }
    var result = new Record();
    if (availableLocale !== undefined) {
      result['[[locale]]'] = availableLocale;
      if (String(locale) !== String(noExtensionsLocale)) {
        var extension = locale.match(expUnicodeExSeq)[0],
            extensionIndex = locale.indexOf('-u-');
        result['[[extension]]'] = extension;
        result['[[extensionIndex]]'] = extensionIndex;
      }
    } else
      result['[[locale]]'] = DefaultLocale();
    return result;
  }
  function BestFitMatcher(availableLocales, requestedLocales) {
    return LookupMatcher(availableLocales, requestedLocales);
  }
  function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
    if (availableLocales.length === 0) {
      throw new ReferenceError('No locale data has been provided for this object yet.');
    }
    var matcher = options['[[localeMatcher]]'];
    if (matcher === 'lookup')
      var r = LookupMatcher(availableLocales, requestedLocales);
    else
      var r = BestFitMatcher(availableLocales, requestedLocales);
    var foundLocale = r['[[locale]]'];
    if (hop.call(r, '[[extension]]'))
      var extension = r['[[extension]]'],
          extensionIndex = r['[[extensionIndex]]'],
          split = String.prototype.split,
          extensionSubtags = split.call(extension, '-'),
          extensionSubtagsLength = extensionSubtags.length;
    var result = new Record();
    result['[[dataLocale]]'] = foundLocale;
    var supportedExtension = '-u',
        i = 0,
        len = relevantExtensionKeys.length;
    while (i < len) {
      var key = relevantExtensionKeys[i],
          foundLocaleData = localeData[foundLocale],
          keyLocaleData = foundLocaleData[key],
          value = keyLocaleData['0'],
          supportedExtensionAddition = '',
          indexOf = arrIndexOf;
      if (extensionSubtags !== undefined) {
        var keyPos = indexOf.call(extensionSubtags, key);
        if (keyPos !== -1) {
          if (keyPos + 1 < extensionSubtagsLength && extensionSubtags[keyPos + 1].length > 2) {
            var requestedValue = extensionSubtags[keyPos + 1],
                valuePos = indexOf.call(keyLocaleData, requestedValue);
            if (valuePos !== -1)
              var value = requestedValue,
                  supportedExtensionAddition = '-' + key + '-' + value;
          } else {
            var valuePos = indexOf(keyLocaleData, 'true');
            if (valuePos !== -1)
              var value = 'true';
          }
        }
      }
      if (hop.call(options, '[[' + key + ']]')) {
        var optionsValue = options['[[' + key + ']]'];
        if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
          if (optionsValue !== value) {
            value = optionsValue;
            supportedExtensionAddition = '';
          }
        }
      }
      result['[[' + key + ']]'] = value;
      supportedExtension += supportedExtensionAddition;
      i++;
    }
    if (supportedExtension.length > 2) {
      var preExtension = foundLocale.substring(0, extensionIndex),
          postExtension = foundLocale.substring(extensionIndex),
          foundLocale = preExtension + supportedExtension + postExtension;
    }
    result['[[locale]]'] = foundLocale;
    return result;
  }
  function LookupSupportedLocales(availableLocales, requestedLocales) {
    var len = requestedLocales.length,
        subset = new List(),
        k = 0;
    while (k < len) {
      var locale = requestedLocales[k],
          noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
          availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
      if (availableLocale !== undefined)
        arrPush.call(subset, locale);
      k++;
    }
    var subsetArray = arrSlice.call(subset);
    return subsetArray;
  }
  function BestFitSupportedLocales(availableLocales, requestedLocales) {
    return LookupSupportedLocales(availableLocales, requestedLocales);
  }
  function SupportedLocales(availableLocales, requestedLocales, options) {
    if (options !== undefined) {
      var options = new Record(toObject(options)),
          matcher = options.localeMatcher;
      if (matcher !== undefined) {
        matcher = String(matcher);
        if (matcher !== 'lookup' && matcher !== 'best fit')
          throw new RangeError('matcher should be "lookup" or "best fit"');
      }
    }
    if (matcher === undefined || matcher === 'best fit')
      var subset = BestFitSupportedLocales(availableLocales, requestedLocales);
    else
      var subset = LookupSupportedLocales(availableLocales, requestedLocales);
    for (var P in subset) {
      if (!hop.call(subset, P))
        continue;
      defineProperty(subset, P, {
        writable: false,
        configurable: false,
        value: subset[P]
      });
    }
    defineProperty(subset, 'length', {writable: false});
    return subset;
  }
  function GetOption(options, property, type, values, fallback) {
    var value = options[property];
    if (value !== undefined) {
      value = type === 'boolean' ? Boolean(value) : (type === 'string' ? String(value) : value);
      if (values !== undefined) {
        if (arrIndexOf.call(values, value) === -1)
          throw new RangeError("'" + value + "' is not an allowed value for `" + property + '`');
      }
      return value;
    }
    return fallback;
  }
  function GetNumberOption(options, property, minimum, maximum, fallback) {
    var value = options[property];
    if (value !== undefined) {
      value = Number(value);
      if (isNaN(value) || value < minimum || value > maximum)
        throw new RangeError('Value is not a number or outside accepted range');
      return Math.floor(value);
    }
    return fallback;
  }
  function NumberFormatConstructor() {
    var locales = arguments[0];
    var options = arguments[1];
    if (!this || this === Intl) {
      return new Intl.NumberFormat(locales, options);
    }
    return InitializeNumberFormat(toObject(this), locales, options);
  }
  defineProperty(Intl, 'NumberFormat', {
    configurable: true,
    writable: true,
    value: NumberFormatConstructor
  });
  defineProperty(Intl.NumberFormat, 'prototype', {writable: false});
  function InitializeNumberFormat(numberFormat, locales, options) {
    var internal = getInternalProperties(numberFormat),
        regexpState = createRegExpRestore();
    if (internal['[[initializedIntlObject]]'] === true)
      throw new TypeError('`this` object has already been initialized as an Intl object');
    defineProperty(numberFormat, '__getInternalProperties', {value: function() {
        if (arguments[0] === secret)
          return internal;
      }});
    internal['[[initializedIntlObject]]'] = true;
    var requestedLocales = CanonicalizeLocaleList(locales);
    if (options === undefined)
      options = {};
    else
      options = toObject(options);
    var opt = new Record(),
        matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');
    opt['[[localeMatcher]]'] = matcher;
    var localeData = internals.NumberFormat['[[localeData]]'],
        r = ResolveLocale(internals.NumberFormat['[[availableLocales]]'], requestedLocales, opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData);
    internal['[[locale]]'] = r['[[locale]]'];
    internal['[[numberingSystem]]'] = r['[[nu]]'];
    internal['[[dataLocale]]'] = r['[[dataLocale]]'];
    var dataLocale = r['[[dataLocale]]'],
        s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');
    internal['[[style]]'] = s;
    var c = GetOption(options, 'currency', 'string');
    if (c !== undefined && !IsWellFormedCurrencyCode(c))
      throw new RangeError("'" + c + "' is not a valid currency code");
    if (s === 'currency' && c === undefined)
      throw new TypeError('Currency code is required when style is currency');
    if (s === 'currency') {
      c = c.toUpperCase();
      internal['[[currency]]'] = c;
      var cDigits = CurrencyDigits(c);
    }
    var cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');
    if (s === 'currency')
      internal['[[currencyDisplay]]'] = cd;
    var mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);
    internal['[[minimumIntegerDigits]]'] = mnid;
    var mnfdDefault = s === 'currency' ? cDigits : 0,
        mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);
    internal['[[minimumFractionDigits]]'] = mnfd;
    var mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits) : (s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3)),
        mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);
    internal['[[maximumFractionDigits]]'] = mxfd;
    var mnsd = options.minimumSignificantDigits,
        mxsd = options.maximumSignificantDigits;
    if (mnsd !== undefined || mxsd !== undefined) {
      mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);
      mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);
      internal['[[minimumSignificantDigits]]'] = mnsd;
      internal['[[maximumSignificantDigits]]'] = mxsd;
    }
    var g = GetOption(options, 'useGrouping', 'boolean', undefined, true);
    internal['[[useGrouping]]'] = g;
    var dataLocaleData = localeData[dataLocale],
        patterns = dataLocaleData.patterns;
    var stylePatterns = patterns[s];
    internal['[[positivePattern]]'] = stylePatterns.positivePattern;
    internal['[[negativePattern]]'] = stylePatterns.negativePattern;
    internal['[[boundFormat]]'] = undefined;
    internal['[[initializedNumberFormat]]'] = true;
    if (es3)
      numberFormat.format = GetFormatNumber.call(numberFormat);
    regexpState.exp.test(regexpState.input);
    return numberFormat;
  }
  function CurrencyDigits(currency) {
    return currencyMinorUnits[currency] !== undefined ? currencyMinorUnits[currency] : 2;
  }
  internals.NumberFormat = {
    '[[availableLocales]]': [],
    '[[relevantExtensionKeys]]': ['nu'],
    '[[localeData]]': {}
  };
  defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
    configurable: true,
    writable: true,
    value: fnBind.call(supportedLocalesOf, internals.NumberFormat)
  });
  defineProperty(Intl.NumberFormat.prototype, 'format', {
    configurable: true,
    get: GetFormatNumber
  });
  function GetFormatNumber() {
    var internal = this != null && typeof this === 'object' && getInternalProperties(this);
    if (!internal || !internal['[[initializedNumberFormat]]'])
      throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');
    if (internal['[[boundFormat]]'] === undefined) {
      var F = function(value) {
        return FormatNumber(this, Number(value));
      },
          bf = fnBind.call(F, this);
      internal['[[boundFormat]]'] = bf;
    }
    return internal['[[boundFormat]]'];
  }
  function FormatNumber(numberFormat, x) {
    var n,
        regexpState = createRegExpRestore(),
        internal = getInternalProperties(numberFormat),
        locale = internal['[[dataLocale]]'],
        nums = internal['[[numberingSystem]]'],
        data = internals.NumberFormat['[[localeData]]'][locale],
        ild = data.symbols[nums] || data.symbols.latn,
        negative = false;
    if (isFinite(x) === false) {
      if (isNaN(x))
        n = ild.nan;
      else {
        n = ild.infinity;
        if (x < 0)
          negative = true;
      }
    } else {
      if (x < 0) {
        negative = true;
        x = -x;
      }
      if (internal['[[style]]'] === 'percent')
        x *= 100;
      if (hop.call(internal, '[[minimumSignificantDigits]]') && hop.call(internal, '[[maximumSignificantDigits]]'))
        n = ToRawPrecision(x, internal['[[minimumSignificantDigits]]'], internal['[[maximumSignificantDigits]]']);
      else
        n = ToRawFixed(x, internal['[[minimumIntegerDigits]]'], internal['[[minimumFractionDigits]]'], internal['[[maximumFractionDigits]]']);
      if (numSys[nums]) {
        var digits = numSys[internal['[[numberingSystem]]']];
        n = String(n).replace(/\d/g, function(digit) {
          return digits[digit];
        });
      } else
        n = String(n);
      n = n.replace(/\./g, ild.decimal);
      if (internal['[[useGrouping]]'] === true) {
        var parts = n.split(ild.decimal),
            igr = parts[0],
            pgSize = data.patterns.primaryGroupSize || 3,
            sgSize = data.patterns.secondaryGroupSize || pgSize;
        if (igr.length > pgSize) {
          var groups = new List(),
              end = igr.length - pgSize,
              idx = end % sgSize,
              start = igr.slice(0, idx);
          if (start.length)
            arrPush.call(groups, start);
          while (idx < end) {
            arrPush.call(groups, igr.slice(idx, idx + sgSize));
            idx += sgSize;
          }
          arrPush.call(groups, igr.slice(end));
          parts[0] = arrJoin.call(groups, ild.group);
        }
        n = arrJoin.call(parts, ild.decimal);
      }
    }
    var result = internal[negative === true ? '[[negativePattern]]' : '[[positivePattern]]'];
    result = result.replace('{number}', n);
    if (internal['[[style]]'] === 'currency') {
      var cd,
          currency = internal['[[currency]]'],
          cData = data.currencies[currency];
      switch (internal['[[currencyDisplay]]']) {
        case 'symbol':
          cd = cData || currency;
          break;
        default:
        case 'code':
        case 'name':
          cd = currency;
      }
      result = result.replace('{currency}', cd);
    }
    regexpState.exp.test(regexpState.input);
    return result;
  }
  function ToRawPrecision(x, minPrecision, maxPrecision) {
    var p = maxPrecision;
    if (x === 0) {
      var m = arrJoin.call(Array(p + 1), '0'),
          e = 0;
    } else {
      var e = log10Floor(Math.abs(x)),
          f = Math.round(Math.exp((Math.abs(e - p + 1)) * Math.LN10)),
          m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
    }
    if (e >= p)
      return m + arrJoin.call(Array(e - p + 1 + 1), '0');
    else if (e === p - 1)
      return m;
    else if (e >= 0)
      m = m.slice(0, e + 1) + '.' + m.slice(e + 1);
    else if (e < 0)
      m = '0.' + arrJoin.call(Array(-(e + 1) + 1), '0') + m;
    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
      var cut = maxPrecision - minPrecision;
      while (cut > 0 && m.charAt(m.length - 1) === '0') {
        m = m.slice(0, -1);
        cut--;
      }
      if (m.charAt(m.length - 1) === '.')
        m = m.slice(0, -1);
    }
    return m;
  }
  function ToRawFixed(x, minInteger, minFraction, maxFraction) {
    var idx,
        m = Number.prototype.toFixed.call(x, maxFraction),
        igr = m.split(".")[0].length,
        cut = maxFraction - minFraction,
        exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;
    if (exp) {
      m = m.slice(0, idx).replace('.', '');
      m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0') + '.' + arrJoin.call(Array(maxFraction + 1), '0');
      igr = m.length;
    }
    while (cut > 0 && m.slice(-1) === "0") {
      m = m.slice(0, -1);
      cut--;
    }
    if (m.slice(-1) === ".")
      m = m.slice(0, -1);
    if (igr < minInteger)
      var z = arrJoin.call(Array(minInteger - igr + 1), '0');
    return (z ? z : '') + m;
  }
  var numSys = {
    arab: ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'],
    arabext: ['\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9'],
    bali: ['\u1B50', '\u1B51', '\u1B52', '\u1B53', '\u1B54', '\u1B55', '\u1B56', '\u1B57', '\u1B58', '\u1B59'],
    beng: ['\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF'],
    deva: ['\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F'],
    fullwide: ['\uFF10', '\uFF11', '\uFF12', '\uFF13', '\uFF14', '\uFF15', '\uFF16', '\uFF17', '\uFF18', '\uFF19'],
    gujr: ['\u0AE6', '\u0AE7', '\u0AE8', '\u0AE9', '\u0AEA', '\u0AEB', '\u0AEC', '\u0AED', '\u0AEE', '\u0AEF'],
    guru: ['\u0A66', '\u0A67', '\u0A68', '\u0A69', '\u0A6A', '\u0A6B', '\u0A6C', '\u0A6D', '\u0A6E', '\u0A6F'],
    hanidec: ['\u3007', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D'],
    khmr: ['\u17E0', '\u17E1', '\u17E2', '\u17E3', '\u17E4', '\u17E5', '\u17E6', '\u17E7', '\u17E8', '\u17E9'],
    knda: ['\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF'],
    laoo: ['\u0ED0', '\u0ED1', '\u0ED2', '\u0ED3', '\u0ED4', '\u0ED5', '\u0ED6', '\u0ED7', '\u0ED8', '\u0ED9'],
    latn: ['\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039'],
    limb: ['\u1946', '\u1947', '\u1948', '\u1949', '\u194A', '\u194B', '\u194C', '\u194D', '\u194E', '\u194F'],
    mlym: ['\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F'],
    mong: ['\u1810', '\u1811', '\u1812', '\u1813', '\u1814', '\u1815', '\u1816', '\u1817', '\u1818', '\u1819'],
    mymr: ['\u1040', '\u1041', '\u1042', '\u1043', '\u1044', '\u1045', '\u1046', '\u1047', '\u1048', '\u1049'],
    orya: ['\u0B66', '\u0B67', '\u0B68', '\u0B69', '\u0B6A', '\u0B6B', '\u0B6C', '\u0B6D', '\u0B6E', '\u0B6F'],
    tamldec: ['\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF'],
    telu: ['\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C6B', '\u0C6C', '\u0C6D', '\u0C6E', '\u0C6F'],
    thai: ['\u0E50', '\u0E51', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59'],
    tibt: ['\u0F20', '\u0F21', '\u0F22', '\u0F23', '\u0F24', '\u0F25', '\u0F26', '\u0F27', '\u0F28', '\u0F29']
  };
  defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
    configurable: true,
    writable: true,
    value: function() {
      var prop,
          descs = new Record(),
          props = ['locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'],
          internal = this != null && typeof this === 'object' && getInternalProperties(this);
      if (!internal || !internal['[[initializedNumberFormat]]'])
        throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');
      for (var i = 0,
          max = props.length; i < max; i++) {
        if (hop.call(internal, prop = '[[' + props[i] + ']]'))
          descs[props[i]] = {
            value: internal[prop],
            writable: true,
            configurable: true,
            enumerable: true
          };
      }
      return objCreate({}, descs);
    }
  });
  function DateTimeFormatConstructor() {
    var locales = arguments[0];
    var options = arguments[1];
    if (!this || this === Intl) {
      return new Intl.DateTimeFormat(locales, options);
    }
    return InitializeDateTimeFormat(toObject(this), locales, options);
  }
  defineProperty(Intl, 'DateTimeFormat', {
    configurable: true,
    writable: true,
    value: DateTimeFormatConstructor
  });
  defineProperty(DateTimeFormatConstructor, 'prototype', {writable: false});
  function InitializeDateTimeFormat(dateTimeFormat, locales, options) {
    var internal = getInternalProperties(dateTimeFormat),
        regexpState = createRegExpRestore();
    if (internal['[[initializedIntlObject]]'] === true)
      throw new TypeError('`this` object has already been initialized as an Intl object');
    defineProperty(dateTimeFormat, '__getInternalProperties', {value: function() {
        if (arguments[0] === secret)
          return internal;
      }});
    internal['[[initializedIntlObject]]'] = true;
    var requestedLocales = CanonicalizeLocaleList(locales),
        options = ToDateTimeOptions(options, 'any', 'date'),
        opt = new Record();
    matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');
    opt['[[localeMatcher]]'] = matcher;
    var DateTimeFormat = internals.DateTimeFormat,
        localeData = DateTimeFormat['[[localeData]]'],
        r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales, opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);
    internal['[[locale]]'] = r['[[locale]]'];
    internal['[[calendar]]'] = r['[[ca]]'];
    internal['[[numberingSystem]]'] = r['[[nu]]'];
    internal['[[dataLocale]]'] = r['[[dataLocale]]'];
    var dataLocale = r['[[dataLocale]]'],
        tz = options.timeZone;
    if (tz !== undefined) {
      tz = toLatinUpperCase(tz);
      if (tz !== 'UTC')
        throw new RangeError('timeZone is not supported.');
    }
    internal['[[timeZone]]'] = tz;
    opt = new Record();
    for (var prop in dateTimeComponents) {
      if (!hop.call(dateTimeComponents, prop))
        continue;
      var value = GetOption(options, prop, 'string', dateTimeComponents[prop]);
      opt['[[' + prop + ']]'] = value;
    }
    var bestFormat,
        dataLocaleData = localeData[dataLocale],
        formats = ToDateTimeFormats(dataLocaleData.formats),
        matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');
    dataLocaleData.formats = formats;
    if (matcher === 'basic')
      bestFormat = BasicFormatMatcher(opt, formats);
    else
      bestFormat = BestFitFormatMatcher(opt, formats);
    for (var prop in dateTimeComponents) {
      if (!hop.call(dateTimeComponents, prop))
        continue;
      if (hop.call(bestFormat, prop)) {
        var p = bestFormat[prop];
        internal['[[' + prop + ']]'] = opt['[[' + prop + ']]'] || p;
      }
    }
    var pattern,
        hr12 = GetOption(options, 'hour12', 'boolean');
    if (internal['[[hour]]']) {
      hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;
      internal['[[hour12]]'] = hr12;
      if (hr12 === true) {
        var hourNo0 = dataLocaleData.hourNo0;
        internal['[[hourNo0]]'] = hourNo0;
        pattern = bestFormat.pattern12;
      } else
        pattern = bestFormat.pattern;
    } else
      pattern = bestFormat.pattern;
    internal['[[pattern]]'] = pattern;
    internal['[[boundFormat]]'] = undefined;
    internal['[[initializedDateTimeFormat]]'] = true;
    if (es3)
      dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);
    regexpState.exp.test(regexpState.input);
    return dateTimeFormat;
  }
  var dateTimeComponents = {
    weekday: ["narrow", "short", "long"],
    era: ["narrow", "short", "long"],
    year: ["2-digit", "numeric"],
    month: ["2-digit", "numeric", "narrow", "short", "long"],
    day: ["2-digit", "numeric"],
    hour: ["2-digit", "numeric"],
    minute: ["2-digit", "numeric"],
    second: ["2-digit", "numeric"],
    timeZoneName: ["short", "long"]
  };
  function ToDateTimeFormats(formats) {
    if (Object.prototype.toString.call(formats) === '[object Array]') {
      return formats;
    }
    return src$cldr$$.createDateTimeFormats(formats);
  }
  function ToDateTimeOptions(options, required, defaults) {
    if (options === undefined)
      options = null;
    else {
      var opt2 = toObject(options);
      options = new Record();
      for (var k in opt2)
        options[k] = opt2[k];
    }
    var create = objCreate,
        options = create(options),
        needDefaults = true;
    if (required === 'date' || required === 'any') {
      if (options.weekday !== undefined || options.year !== undefined || options.month !== undefined || options.day !== undefined)
        needDefaults = false;
    }
    if (required === 'time' || required === 'any') {
      if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined)
        needDefaults = false;
    }
    if (needDefaults && (defaults === 'date' || defaults === 'all'))
      options.year = options.month = options.day = 'numeric';
    if (needDefaults && (defaults === 'time' || defaults === 'all'))
      options.hour = options.minute = options.second = 'numeric';
    return options;
  }
  function BasicFormatMatcher(options, formats) {
    return calculateScore(options, formats);
  }
  function calculateScore(options, formats, bestFit) {
    var diffDataTypePenalty = 8,
        removalPenalty = 120,
        additionPenalty = 20,
        longLessPenalty = 8,
        longMorePenalty = 6,
        shortLessPenalty = 6,
        shortMorePenalty = 3,
        bestScore = -Infinity,
        bestFormat,
        i = 0,
        len = formats.length;
    while (i < len) {
      var format = formats[i],
          score = 0;
      for (var property in dateTimeComponents) {
        if (!hop.call(dateTimeComponents, property))
          continue;
        var optionsProp = options['[[' + property + ']]'],
            formatProp = hop.call(format, property) ? format[property] : undefined;
        if (optionsProp === undefined && formatProp !== undefined)
          score -= additionPenalty;
        else if (optionsProp !== undefined && formatProp === undefined)
          score -= removalPenalty;
        else {
          var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'],
              optionsPropIndex = arrIndexOf.call(values, optionsProp),
              formatPropIndex = arrIndexOf.call(values, formatProp),
              delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);
          if (bestFit && (((optionsProp === 'numeric' || optionsProp === '2-digit') && (formatProp !== 'numeric' && formatProp !== '2-digit') || (optionsProp !== 'numeric' && optionsProp !== '2-digit') && (formatProp === '2-digit' || formatProp === 'numeric'))))
            score -= diffDataTypePenalty;
          if (delta === 2)
            score -= longMorePenalty;
          else if (delta === 1)
            score -= shortMorePenalty;
          else if (delta === -1)
            score -= shortLessPenalty;
          else if (delta === -2)
            score -= longLessPenalty;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestFormat = format;
      }
      i++;
    }
    return bestFormat;
  }
  function BestFitFormatMatcher(options, formats) {
    return calculateScore(options, formats, true);
  }
  internals.DateTimeFormat = {
    '[[availableLocales]]': [],
    '[[relevantExtensionKeys]]': ['ca', 'nu'],
    '[[localeData]]': {}
  };
  defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
    configurable: true,
    writable: true,
    value: fnBind.call(supportedLocalesOf, internals.DateTimeFormat)
  });
  defineProperty(Intl.DateTimeFormat.prototype, 'format', {
    configurable: true,
    get: GetFormatDateTime
  });
  function GetFormatDateTime() {
    var internal = this != null && typeof this === 'object' && getInternalProperties(this);
    if (!internal || !internal['[[initializedDateTimeFormat]]'])
      throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');
    if (internal['[[boundFormat]]'] === undefined) {
      var F = function() {
        var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);
        return FormatDateTime(this, x);
      },
          bf = fnBind.call(F, this);
      internal['[[boundFormat]]'] = bf;
    }
    return internal['[[boundFormat]]'];
  }
  function FormatDateTime(dateTimeFormat, x) {
    if (!isFinite(x))
      throw new RangeError('Invalid valid date passed to format');
    var internal = dateTimeFormat.__getInternalProperties(secret),
        regexpState = createRegExpRestore(),
        locale = internal['[[locale]]'],
        nf = new Intl.NumberFormat([locale], {useGrouping: false}),
        nf2 = new Intl.NumberFormat([locale], {
          minimumIntegerDigits: 2,
          useGrouping: false
        }),
        tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']),
        result = internal['[[pattern]]'],
        dataLocale = internal['[[dataLocale]]'],
        localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars,
        ca = internal['[[calendar]]'];
    for (var p in dateTimeComponents) {
      if (hop.call(internal, '[[' + p + ']]')) {
        var pm,
            fv,
            f = internal['[[' + p + ']]'],
            v = tm['[[' + p + ']]'];
        if (p === 'year' && v <= 0)
          v = 1 - v;
        else if (p === 'month')
          v++;
        else if (p === 'hour' && internal['[[hour12]]'] === true) {
          v = v % 12;
          pm = v !== tm['[[' + p + ']]'];
          if (v === 0 && internal['[[hourNo0]]'] === true)
            v = 12;
        }
        if (f === 'numeric')
          fv = FormatNumber(nf, v);
        else if (f === '2-digit') {
          fv = FormatNumber(nf2, v);
          if (fv.length > 2)
            fv = fv.slice(-2);
        } else if (f in dateWidths) {
          switch (p) {
            case 'month':
              fv = resolveDateString(localeData, ca, 'months', f, tm['[[' + p + ']]']);
              break;
            case 'weekday':
              try {
                fv = resolveDateString(localeData, ca, 'days', f, tm['[[' + p + ']]']);
              } catch (e) {
                throw new Error('Could not find weekday data for locale ' + locale);
              }
              break;
            case 'timeZoneName':
              fv = '';
              break;
            default:
              fv = tm['[[' + p + ']]'];
          }
        }
        result = result.replace('{' + p + '}', fv);
      }
    }
    if (internal['[[hour12]]'] === true) {
      fv = resolveDateString(localeData, ca, 'dayPeriods', pm ? 'pm' : 'am');
      result = result.replace('{ampm}', fv);
    }
    regexpState.exp.test(regexpState.input);
    return result;
  }
  function ToLocalTime(date, calendar, timeZone) {
    var d = new Date(date),
        m = 'get' + (timeZone || '');
    return new Record({
      '[[weekday]]': d[m + 'Day'](),
      '[[era]]': +(d[m + 'FullYear']() >= 0),
      '[[year]]': d[m + 'FullYear'](),
      '[[month]]': d[m + 'Month'](),
      '[[day]]': d[m + 'Date'](),
      '[[hour]]': d[m + 'Hours'](),
      '[[minute]]': d[m + 'Minutes'](),
      '[[second]]': d[m + 'Seconds'](),
      '[[inDST]]': false
    });
  }
  defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
    writable: true,
    configurable: true,
    value: function() {
      var prop,
          descs = new Record(),
          props = ['locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'],
          internal = this != null && typeof this === 'object' && getInternalProperties(this);
      if (!internal || !internal['[[initializedDateTimeFormat]]'])
        throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');
      for (var i = 0,
          max = props.length; i < max; i++) {
        if (hop.call(internal, prop = '[[' + props[i] + ']]'))
          descs[props[i]] = {
            value: internal[prop],
            writable: true,
            configurable: true,
            enumerable: true
          };
      }
      return objCreate({}, descs);
    }
  });
  var ls = Intl.__localeSensitiveProtos = {
    Number: {},
    Date: {}
  };
  ls.Number.toLocaleString = function() {
    if (Object.prototype.toString.call(this) !== '[object Number]')
      throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');
    return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
  };
  ls.Date.toLocaleString = function() {
    if (Object.prototype.toString.call(this) !== '[object Date]')
      throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');
    var x = +this;
    if (isNaN(x))
      return 'Invalid Date';
    var locales = arguments[0],
        options = arguments[1],
        options = ToDateTimeOptions(options, 'any', 'all'),
        dateTimeFormat = new DateTimeFormatConstructor(locales, options);
    return FormatDateTime(dateTimeFormat, x);
  };
  ls.Date.toLocaleDateString = function() {
    if (Object.prototype.toString.call(this) !== '[object Date]')
      throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');
    var x = +this;
    if (isNaN(x))
      return 'Invalid Date';
    var locales = arguments[0],
        options = arguments[1],
        options = ToDateTimeOptions(options, 'date', 'date'),
        dateTimeFormat = new DateTimeFormatConstructor(locales, options);
    return FormatDateTime(dateTimeFormat, x);
  };
  ls.Date.toLocaleTimeString = function() {
    if (Object.prototype.toString.call(this) !== '[object Date]')
      throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');
    var x = +this;
    if (isNaN(x))
      return 'Invalid Date';
    var locales = arguments[0],
        options = arguments[1],
        options = ToDateTimeOptions(options, 'time', 'time'),
        dateTimeFormat = new DateTimeFormatConstructor(locales, options);
    return FormatDateTime(dateTimeFormat, x);
  };
  defineProperty(Intl, '__applyLocaleSensitivePrototypes', {
    writable: true,
    configurable: true,
    value: function() {
      defineProperty(Number.prototype, 'toLocaleString', {
        writable: true,
        configurable: true,
        value: ls.Number.toLocaleString
      });
      defineProperty(Date.prototype, 'toLocaleString', {
        writable: true,
        configurable: true,
        value: ls.Date.toLocaleString
      });
      for (var k in ls.Date) {
        if (hop.call(ls.Date, k))
          defineProperty(Date.prototype, k, {
            writable: true,
            configurable: true,
            value: ls.Date[k]
          });
      }
    }
  });
  defineProperty(Intl, '__addLocaleData', {value: function(data) {
      if (!IsStructurallyValidLanguageTag(data.locale))
        throw new Error("Object passed doesn't identify itself with a valid language tag");
      addLocaleData(data, data.locale);
    }});
  function addLocaleData(data, tag) {
    if (!data.number)
      throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");
    var locale,
        locales = [tag],
        parts = tag.split('-');
    if (parts.length > 2 && parts[1].length === 4)
      arrPush.call(locales, parts[0] + '-' + parts[2]);
    while (locale = arrShift.call(locales)) {
      arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
      internals.NumberFormat['[[localeData]]'][locale] = data.number;
      if (data.date) {
        data.date.nu = data.number.nu;
        arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
        internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
      }
    }
    if (defaultLocale === undefined)
      defaultLocale = tag;
    if (!numberFormatProtoInitialised) {
      InitializeNumberFormat(Intl.NumberFormat.prototype);
      numberFormatProtoInitialised = true;
    }
    if (data.date && !dateTimeFormatProtoInitialised) {
      InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);
      dateTimeFormatProtoInitialised = true;
    }
  }
  function log10Floor(n) {
    if (typeof Math.log10 === 'function')
      return Math.floor(Math.log10(n));
    var x = Math.round(Math.log(n) * Math.LOG10E);
    return x - (Number('1e' + x) > n);
  }
  function supportedLocalesOf(locales) {
    if (!hop.call(this, '[[availableLocales]]'))
      throw new TypeError('supportedLocalesOf() is not a constructor');
    var regexpState = createRegExpRestore(),
        options = arguments[1],
        availableLocales = this['[[availableLocales]]'],
        requestedLocales = CanonicalizeLocaleList(locales);
    regexpState.exp.test(regexpState.input);
    return SupportedLocales(availableLocales, requestedLocales, options);
  }
  function resolveDateString(data, ca, component, width, key) {
    var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component],
        alts = {
          narrow: ['short', 'long'],
          short: ['long', 'narrow'],
          long: ['short', 'narrow']
        },
        resolved = hop.call(obj, width) ? obj[width] : hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];
    return key != null ? resolved[key] : resolved;
  }
  Record.prototype = objCreate(null);
  function Record(obj) {
    for (var k in obj) {
      if (obj instanceof Record || hop.call(obj, k))
        defineProperty(this, k, {
          value: obj[k],
          enumerable: true,
          writable: true,
          configurable: true
        });
    }
  }
  List.prototype = objCreate(null);
  function List() {
    defineProperty(this, 'length', {
      writable: true,
      value: 0
    });
    if (arguments.length)
      arrPush.apply(this, arrSlice.call(arguments));
  }
  function createRegExpRestore() {
    var esc = /[.?*+^$[\]\\(){}|-]/g,
        lm = RegExp.lastMatch || '',
        ml = RegExp.multiline ? 'm' : '',
        ret = {input: RegExp.input},
        reg = new List(),
        has = false,
        cap = {};
    for (var i = 1; i <= 9; i++)
      has = (cap['$' + i] = RegExp['$' + i]) || has;
    lm = lm.replace(esc, '\\$&');
    if (has) {
      for (var i = 1; i <= 9; i++) {
        var m = cap['$' + i];
        if (!m)
          lm = '()' + lm;
        else {
          m = m.replace(esc, '\\$&');
          lm = lm.replace(m, '(' + m + ')');
        }
        arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
        lm = lm.slice(lm.indexOf('(') + 1);
      }
    }
    ret.exp = new RegExp(arrJoin.call(reg, '') + lm, ml);
    return ret;
  }
  function toLatinUpperCase(str) {
    var i = str.length;
    while (i--) {
      var ch = str.charAt(i);
      if (ch >= "a" && ch <= "z")
        str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
    }
    return str;
  }
  function toObject(arg) {
    if (arg == null)
      throw new TypeError('Cannot convert null or undefined to object');
    return Object(arg);
  }
  function getInternalProperties(obj) {
    if (hop.call(obj, '__getInternalProperties'))
      return obj.__getInternalProperties(secret);
    else
      return objCreate(null);
  }
  exports["default"] = Intl;
})(require('process'));
