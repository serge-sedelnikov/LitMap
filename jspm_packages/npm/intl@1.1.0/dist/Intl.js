/* */ 
(function(process) {
  (function() {
    "use strict";
    var $$exp$$extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}',
        $$exp$$language = '(?:[a-z]{2,3}(?:-' + $$exp$$extlang + ')?|[a-z]{4}|[a-z]{5,8})',
        $$exp$$script = '[a-z]{4}',
        $$exp$$region = '(?:[a-z]{2}|\\d{3})',
        $$exp$$variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})',
        $$exp$$singleton = '[0-9a-wy-z]',
        $$exp$$extension = $$exp$$singleton + '(?:-[a-z0-9]{2,8})+',
        $$exp$$privateuse = 'x(?:-[a-z0-9]{1,8})+',
        $$exp$$irregular = '(?:en-GB-oed' + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)' + '|sgn-(?:BE-FR|BE-NL|CH-DE))',
        $$exp$$regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn' + '|zh-(?:guoyu|hakka|min|min-nan|xiang))',
        $$exp$$grandfathered = '(?:' + $$exp$$irregular + '|' + $$exp$$regular + ')',
        $$exp$$langtag = $$exp$$language + '(?:-' + $$exp$$script + ')?(?:-' + $$exp$$region + ')?(?:-' + $$exp$$variant + ')*(?:-' + $$exp$$extension + ')*(?:-' + $$exp$$privateuse + ')?';
    var $$exp$$expBCP47Syntax = RegExp('^(?:' + $$exp$$langtag + '|' + $$exp$$privateuse + '|' + $$exp$$grandfathered + ')$', 'i');
    var $$exp$$expVariantDupes = RegExp('^(?!x).*?-(' + $$exp$$variant + ')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');
    var $$exp$$expSingletonDupes = RegExp('^(?!x).*?-(' + $$exp$$singleton + ')-(?:\\w+-(?!x-))*\\1\\b', 'i');
    var $$exp$$expExtSequences = RegExp('-' + $$exp$$extension, 'ig');
    var $$cldr$$expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    var $$cldr$$expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    var $$cldr$$unwantedDTCs = /[rqQxXVOvZASjJgwWIQq]/;
    var $$cldr$$dtKeys = ["weekday", "era", "year", "month", "day", "weekday", "quarter"];
    var $$cldr$$tmKeys = ["hour", "minute", "second", "hour12", "timeZoneName"];
    function $$cldr$$isDateFormatOnly(obj) {
      for (var i = 0; i < $$cldr$$tmKeys.length; i += 1) {
        if (obj.hasOwnProperty($$cldr$$tmKeys[i])) {
          return false;
        }
      }
      return true;
    }
    function $$cldr$$isTimeFormatOnly(obj) {
      for (var i = 0; i < $$cldr$$dtKeys.length; i += 1) {
        if (obj.hasOwnProperty($$cldr$$dtKeys[i])) {
          return false;
        }
      }
      return true;
    }
    function $$cldr$$joinDateAndTimeFormats(dateFormatObj, timeFormatObj) {
      var o = {};
      for (var i = 0; i < $$cldr$$dtKeys.length; i += 1) {
        if (dateFormatObj[$$cldr$$dtKeys[i]]) {
          o[$$cldr$$dtKeys[i]] = dateFormatObj[$$cldr$$dtKeys[i]];
        }
      }
      for (var j = 0; j < $$cldr$$tmKeys.length; j += 1) {
        if (timeFormatObj[$$cldr$$tmKeys[j]]) {
          o[$$cldr$$tmKeys[j]] = timeFormatObj[$$cldr$$tmKeys[j]];
        }
      }
      return o;
    }
    function $$cldr$$computeFinalPatterns(formatObj) {
      formatObj.pattern12 = formatObj.extendedPattern.replace(/'([^']*)'/g, function($0, literal) {
        return literal ? literal : "'";
      });
      formatObj.pattern = formatObj.pattern12.replace('{ampm}', '').replace($$cldr$$expPatternTrimmer, '');
      return formatObj;
    }
    function $$cldr$$createDateTimeFormat(skeleton, pattern) {
      if ($$cldr$$unwantedDTCs.test(pattern))
        return undefined;
      var formatObj = {originalPattern: pattern};
      formatObj.extendedPattern = pattern.replace($$cldr$$expDTComponents, function($0) {
        switch ($0.charAt(0)) {
          case 'G':
            return '{era}';
          case 'y':
          case 'Y':
          case 'u':
          case 'U':
          case 'r':
            return '{year}';
          case 'Q':
          case 'q':
            return '{quarter}';
          case 'M':
          case 'L':
            return '{month}';
          case 'w':
          case 'W':
            return '{weekday}';
          case 'd':
          case 'D':
          case 'F':
          case 'g':
            return '{day}';
          case 'E':
          case 'e':
          case 'c':
            return '{weekday}';
          case 'a':
          case 'b':
          case 'B':
            return '{ampm}';
          case 'h':
          case 'H':
          case 'k':
          case 'K':
            return '{hour}';
          case 'm':
            return '{minute}';
          case 's':
          case 'S':
          case 'A':
            return '{second}';
          case 'z':
          case 'Z':
          case 'O':
          case 'v':
          case 'V':
          case 'X':
          case 'x':
            return '{timeZoneName}';
        }
      });
      skeleton.replace($$cldr$$expDTComponents, function($0) {
        switch ($0.charAt(0)) {
          case 'G':
            formatObj.era = ['short', 'short', 'short', 'long', 'narrow'][$0.length - 1];
            break;
          case 'y':
          case 'Y':
          case 'u':
          case 'U':
            formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'Q':
          case 'q':
            formatObj.quarter = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
            break;
          case 'M':
          case 'L':
            formatObj.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
            break;
          case 'w':
            formatObj.week = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'W':
            formatObj.week = 'numeric';
            break;
          case 'd':
            formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'D':
            formatObj.day = 'numeric';
            break;
          case 'F':
            formatObj.day = 'numeric';
            break;
          case 'E':
            formatObj.weekday = ['short', 'short', 'short', 'long', 'narrow', 'short'][$0.length - 1];
            break;
          case 'e':
            formatObj.weekday = ['numeric', '2-digit', 'short', 'long', 'narrow', 'short'][$0.length - 1];
            break;
          case 'c':
            formatObj.weekday = ['numeric', undefined, 'short', 'long', 'narrow', 'short'][$0.length - 1];
            break;
          case 'a':
          case 'b':
          case 'B':
            formatObj.hour12 = true;
            break;
          case 'H':
          case 'k':
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'h':
          case 'K':
            formatObj.hour12 = true;
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'm':
            formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 's':
            formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
            break;
          case 'z':
          case 'Z':
          case 'O':
          case 'v':
          case 'V':
          case 'X':
          case 'x':
            formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
            break;
        }
      });
      return $$cldr$$computeFinalPatterns(formatObj);
    }
    function $$cldr$$createDateTimeFormats(formats) {
      var availableFormats = formats.availableFormats;
      var timeFormats = formats.timeFormats;
      var dateFormats = formats.dateFormats;
      var result = [];
      var skeleton,
          pattern,
          computed,
          i,
          j;
      var timeRelatedFormats = [];
      var dateRelatedFormats = [];
      for (skeleton in availableFormats) {
        if (availableFormats.hasOwnProperty(skeleton)) {
          pattern = availableFormats[skeleton];
          computed = $$cldr$$createDateTimeFormat(skeleton, pattern);
          if (computed) {
            result.push(computed);
            if ($$cldr$$isDateFormatOnly(computed)) {
              dateRelatedFormats.push(computed);
            } else if ($$cldr$$isTimeFormatOnly(computed)) {
              timeRelatedFormats.push(computed);
            }
          }
        }
      }
      for (skeleton in timeFormats) {
        if (timeFormats.hasOwnProperty(skeleton)) {
          pattern = timeFormats[skeleton];
          computed = $$cldr$$createDateTimeFormat(skeleton, pattern);
          if (computed) {
            result.push(computed);
            timeRelatedFormats.push(computed);
          }
        }
      }
      for (skeleton in dateFormats) {
        if (dateFormats.hasOwnProperty(skeleton)) {
          pattern = dateFormats[skeleton];
          computed = $$cldr$$createDateTimeFormat(skeleton, pattern);
          if (computed) {
            result.push(computed);
            dateRelatedFormats.push(computed);
          }
        }
      }
      for (i = 0; i < timeRelatedFormats.length; i += 1) {
        for (j = 0; j < dateRelatedFormats.length; j += 1) {
          if (dateRelatedFormats[j].month === 'long') {
            pattern = dateRelatedFormats[j].weekday ? formats.full : formats.long;
          } else if (dateRelatedFormats[j].month === 'short') {
            pattern = formats.medium;
          } else {
            pattern = formats.short;
          }
          computed = $$cldr$$joinDateAndTimeFormats(dateRelatedFormats[j], timeRelatedFormats[i]);
          computed.originalPattern = pattern;
          computed.extendedPattern = pattern.replace('{0}', timeRelatedFormats[i].extendedPattern).replace('{1}', dateRelatedFormats[j].extendedPattern).replace(/^[,\s]+|[,\s]+$/gi, '');
          result.push($$cldr$$computeFinalPatterns(computed));
        }
      }
      return result;
    }
    var $$core$$Intl = {},
        $$core$$realDefineProp = (function() {
          var sentinel = {};
          try {
            Object.defineProperty(sentinel, 'a', {});
            return 'a' in sentinel;
          } catch (e) {
            return false;
          }
        })(),
        $$core$$es3 = !$$core$$realDefineProp && !Object.prototype.__defineGetter__,
        $$core$$hop = Object.prototype.hasOwnProperty,
        $$core$$defineProperty = $$core$$realDefineProp ? Object.defineProperty : function(obj, name, desc) {
          if ('get' in desc && obj.__defineGetter__)
            obj.__defineGetter__(name, desc.get);
          else if (!$$core$$hop.call(obj, name) || 'value' in desc)
            obj[name] = desc.value;
        },
        $$core$$arrIndexOf = Array.prototype.indexOf || function(search) {
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
        $$core$$objCreate = Object.create || function(proto, props) {
          var obj;
          function F() {}
          F.prototype = proto;
          obj = new F();
          for (var k in props) {
            if ($$core$$hop.call(props, k))
              $$core$$defineProperty(obj, k, props[k]);
          }
          return obj;
        },
        $$core$$arrSlice = Array.prototype.slice,
        $$core$$arrConcat = Array.prototype.concat,
        $$core$$arrPush = Array.prototype.push,
        $$core$$arrJoin = Array.prototype.join,
        $$core$$arrShift = Array.prototype.shift,
        $$core$$arrUnshift = Array.prototype.unshift,
        $$core$$fnBind = Function.prototype.bind || function(thisObj) {
          var fn = this,
              args = $$core$$arrSlice.call(arguments, 1);
          if (fn.length === 1) {
            return function(a) {
              return fn.apply(thisObj, $$core$$arrConcat.call(args, $$core$$arrSlice.call(arguments)));
            };
          } else {
            return function() {
              return fn.apply(thisObj, $$core$$arrConcat.call(args, $$core$$arrSlice.call(arguments)));
            };
          }
        },
        $$core$$defaultLocale,
        $$core$$internals = $$core$$objCreate(null),
        $$core$$secret = Math.random(),
        $$core$$dateWidths = $$core$$objCreate(null, {
          narrow: {},
          short: {},
          long: {}
        }),
        $$core$$numberFormatProtoInitialised = false,
        $$core$$dateTimeFormatProtoInitialised = false,
        $$core$$expCurrencyCode = /^[A-Z]{3}$/,
        $$core$$expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi,
        $$core$$redundantTags = {
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
        $$core$$currencyMinorUnits = {
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
    function $$core$$IsStructurallyValidLanguageTag(locale) {
      if (!$$exp$$expBCP47Syntax.test(locale))
        return false;
      if ($$exp$$expVariantDupes.test(locale))
        return false;
      if ($$exp$$expSingletonDupes.test(locale))
        return false;
      return true;
    }
    function $$core$$CanonicalizeLanguageTag(locale) {
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
      locale = $$core$$arrJoin.call(parts, '-');
      if ((match = locale.match($$exp$$expExtSequences)) && match.length > 1) {
        match.sort();
        locale = locale.replace(RegExp('(?:' + $$exp$$expExtSequences.source + ')+', 'i'), $$core$$arrJoin.call(match, ''));
      }
      if ($$core$$hop.call($$core$$redundantTags.tags, locale))
        locale = $$core$$redundantTags.tags[locale];
      parts = locale.split('-');
      for (var i = 1,
          max = parts.length; i < max; i++) {
        if ($$core$$hop.call($$core$$redundantTags.subtags, parts[i]))
          parts[i] = $$core$$redundantTags.subtags[parts[i]];
        else if ($$core$$hop.call($$core$$redundantTags.extLang, parts[i])) {
          parts[i] = $$core$$redundantTags.extLang[parts[i]][0];
          if (i === 1 && $$core$$redundantTags.extLang[parts[1]][1] === parts[0]) {
            parts = $$core$$arrSlice.call(parts, i++);
            max -= 1;
          }
        }
      }
      return $$core$$arrJoin.call(parts, '-');
    }
    function $$core$$DefaultLocale() {
      return $$core$$defaultLocale;
    }
    function $$core$$IsWellFormedCurrencyCode(currency) {
      var c = String(currency),
          normalized = $$core$$toLatinUpperCase(c);
      if ($$core$$expCurrencyCode.test(normalized) === false)
        return false;
      return true;
    }
    function $$core$$CanonicalizeLocaleList(locales) {
      if (locales === undefined)
        return new $$core$$List();
      var seen = new $$core$$List(),
          locales = typeof locales === 'string' ? [locales] : locales,
          O = $$core$$toObject(locales),
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
          if (!$$core$$IsStructurallyValidLanguageTag(tag))
            throw new RangeError("'" + tag + "' is not a structurally valid language tag");
          tag = $$core$$CanonicalizeLanguageTag(tag);
          if ($$core$$arrIndexOf.call(seen, tag) === -1)
            $$core$$arrPush.call(seen, tag);
        }
        k++;
      }
      return seen;
    }
    function $$core$$BestAvailableLocale(availableLocales, locale) {
      var candidate = locale;
      while (true) {
        if ($$core$$arrIndexOf.call(availableLocales, candidate) > -1)
          return candidate;
        var pos = candidate.lastIndexOf('-');
        if (pos < 0)
          return;
        if (pos >= 2 && candidate.charAt(pos - 2) === '-')
          pos -= 2;
        candidate = candidate.substring(0, pos);
      }
    }
    function $$core$$LookupMatcher(availableLocales, requestedLocales) {
      var i = 0,
          len = requestedLocales.length,
          availableLocale;
      while (i < len && !availableLocale) {
        var locale = requestedLocales[i],
            noExtensionsLocale = String(locale).replace($$core$$expUnicodeExSeq, ''),
            availableLocale = $$core$$BestAvailableLocale(availableLocales, noExtensionsLocale);
        i++;
      }
      var result = new $$core$$Record();
      if (availableLocale !== undefined) {
        result['[[locale]]'] = availableLocale;
        if (String(locale) !== String(noExtensionsLocale)) {
          var extension = locale.match($$core$$expUnicodeExSeq)[0],
              extensionIndex = locale.indexOf('-u-');
          result['[[extension]]'] = extension;
          result['[[extensionIndex]]'] = extensionIndex;
        }
      } else
        result['[[locale]]'] = $$core$$DefaultLocale();
      return result;
    }
    function $$core$$BestFitMatcher(availableLocales, requestedLocales) {
      return $$core$$LookupMatcher(availableLocales, requestedLocales);
    }
    function $$core$$ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
      if (availableLocales.length === 0) {
        throw new ReferenceError('No locale data has been provided for this object yet.');
      }
      var matcher = options['[[localeMatcher]]'];
      if (matcher === 'lookup')
        var r = $$core$$LookupMatcher(availableLocales, requestedLocales);
      else
        var r = $$core$$BestFitMatcher(availableLocales, requestedLocales);
      var foundLocale = r['[[locale]]'];
      if ($$core$$hop.call(r, '[[extension]]'))
        var extension = r['[[extension]]'],
            extensionIndex = r['[[extensionIndex]]'],
            split = String.prototype.split,
            extensionSubtags = split.call(extension, '-'),
            extensionSubtagsLength = extensionSubtags.length;
      var result = new $$core$$Record();
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
            indexOf = $$core$$arrIndexOf;
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
        if ($$core$$hop.call(options, '[[' + key + ']]')) {
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
    function $$core$$LookupSupportedLocales(availableLocales, requestedLocales) {
      var len = requestedLocales.length,
          subset = new $$core$$List(),
          k = 0;
      while (k < len) {
        var locale = requestedLocales[k],
            noExtensionsLocale = String(locale).replace($$core$$expUnicodeExSeq, ''),
            availableLocale = $$core$$BestAvailableLocale(availableLocales, noExtensionsLocale);
        if (availableLocale !== undefined)
          $$core$$arrPush.call(subset, locale);
        k++;
      }
      var subsetArray = $$core$$arrSlice.call(subset);
      return subsetArray;
    }
    function $$core$$BestFitSupportedLocales(availableLocales, requestedLocales) {
      return $$core$$LookupSupportedLocales(availableLocales, requestedLocales);
    }
    function $$core$$SupportedLocales(availableLocales, requestedLocales, options) {
      if (options !== undefined) {
        var options = new $$core$$Record($$core$$toObject(options)),
            matcher = options.localeMatcher;
        if (matcher !== undefined) {
          matcher = String(matcher);
          if (matcher !== 'lookup' && matcher !== 'best fit')
            throw new RangeError('matcher should be "lookup" or "best fit"');
        }
      }
      if (matcher === undefined || matcher === 'best fit')
        var subset = $$core$$BestFitSupportedLocales(availableLocales, requestedLocales);
      else
        var subset = $$core$$LookupSupportedLocales(availableLocales, requestedLocales);
      for (var P in subset) {
        if (!$$core$$hop.call(subset, P))
          continue;
        $$core$$defineProperty(subset, P, {
          writable: false,
          configurable: false,
          value: subset[P]
        });
      }
      $$core$$defineProperty(subset, 'length', {writable: false});
      return subset;
    }
    function $$core$$GetOption(options, property, type, values, fallback) {
      var value = options[property];
      if (value !== undefined) {
        value = type === 'boolean' ? Boolean(value) : (type === 'string' ? String(value) : value);
        if (values !== undefined) {
          if ($$core$$arrIndexOf.call(values, value) === -1)
            throw new RangeError("'" + value + "' is not an allowed value for `" + property + '`');
        }
        return value;
      }
      return fallback;
    }
    function $$core$$GetNumberOption(options, property, minimum, maximum, fallback) {
      var value = options[property];
      if (value !== undefined) {
        value = Number(value);
        if (isNaN(value) || value < minimum || value > maximum)
          throw new RangeError('Value is not a number or outside accepted range');
        return Math.floor(value);
      }
      return fallback;
    }
    function $$core$$NumberFormatConstructor() {
      var locales = arguments[0];
      var options = arguments[1];
      if (!this || this === $$core$$Intl) {
        return new $$core$$Intl.NumberFormat(locales, options);
      }
      return $$core$$InitializeNumberFormat($$core$$toObject(this), locales, options);
    }
    $$core$$defineProperty($$core$$Intl, 'NumberFormat', {
      configurable: true,
      writable: true,
      value: $$core$$NumberFormatConstructor
    });
    $$core$$defineProperty($$core$$Intl.NumberFormat, 'prototype', {writable: false});
    function $$core$$InitializeNumberFormat(numberFormat, locales, options) {
      var internal = $$core$$getInternalProperties(numberFormat),
          regexpState = $$core$$createRegExpRestore();
      if (internal['[[initializedIntlObject]]'] === true)
        throw new TypeError('`this` object has already been initialized as an Intl object');
      $$core$$defineProperty(numberFormat, '__getInternalProperties', {value: function() {
          if (arguments[0] === $$core$$secret)
            return internal;
        }});
      internal['[[initializedIntlObject]]'] = true;
      var requestedLocales = $$core$$CanonicalizeLocaleList(locales);
      if (options === undefined)
        options = {};
      else
        options = $$core$$toObject(options);
      var opt = new $$core$$Record(),
          matcher = $$core$$GetOption(options, 'localeMatcher', 'string', new $$core$$List('lookup', 'best fit'), 'best fit');
      opt['[[localeMatcher]]'] = matcher;
      var localeData = $$core$$internals.NumberFormat['[[localeData]]'],
          r = $$core$$ResolveLocale($$core$$internals.NumberFormat['[[availableLocales]]'], requestedLocales, opt, $$core$$internals.NumberFormat['[[relevantExtensionKeys]]'], localeData);
      internal['[[locale]]'] = r['[[locale]]'];
      internal['[[numberingSystem]]'] = r['[[nu]]'];
      internal['[[dataLocale]]'] = r['[[dataLocale]]'];
      var dataLocale = r['[[dataLocale]]'],
          s = $$core$$GetOption(options, 'style', 'string', new $$core$$List('decimal', 'percent', 'currency'), 'decimal');
      internal['[[style]]'] = s;
      var c = $$core$$GetOption(options, 'currency', 'string');
      if (c !== undefined && !$$core$$IsWellFormedCurrencyCode(c))
        throw new RangeError("'" + c + "' is not a valid currency code");
      if (s === 'currency' && c === undefined)
        throw new TypeError('Currency code is required when style is currency');
      if (s === 'currency') {
        c = c.toUpperCase();
        internal['[[currency]]'] = c;
        var cDigits = $$core$$CurrencyDigits(c);
      }
      var cd = $$core$$GetOption(options, 'currencyDisplay', 'string', new $$core$$List('code', 'symbol', 'name'), 'symbol');
      if (s === 'currency')
        internal['[[currencyDisplay]]'] = cd;
      var mnid = $$core$$GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);
      internal['[[minimumIntegerDigits]]'] = mnid;
      var mnfdDefault = s === 'currency' ? cDigits : 0,
          mnfd = $$core$$GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);
      internal['[[minimumFractionDigits]]'] = mnfd;
      var mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits) : (s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3)),
          mxfd = $$core$$GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);
      internal['[[maximumFractionDigits]]'] = mxfd;
      var mnsd = options.minimumSignificantDigits,
          mxsd = options.maximumSignificantDigits;
      if (mnsd !== undefined || mxsd !== undefined) {
        mnsd = $$core$$GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);
        mxsd = $$core$$GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);
        internal['[[minimumSignificantDigits]]'] = mnsd;
        internal['[[maximumSignificantDigits]]'] = mxsd;
      }
      var g = $$core$$GetOption(options, 'useGrouping', 'boolean', undefined, true);
      internal['[[useGrouping]]'] = g;
      var dataLocaleData = localeData[dataLocale],
          patterns = dataLocaleData.patterns;
      var stylePatterns = patterns[s];
      internal['[[positivePattern]]'] = stylePatterns.positivePattern;
      internal['[[negativePattern]]'] = stylePatterns.negativePattern;
      internal['[[boundFormat]]'] = undefined;
      internal['[[initializedNumberFormat]]'] = true;
      if ($$core$$es3)
        numberFormat.format = $$core$$GetFormatNumber.call(numberFormat);
      regexpState.exp.test(regexpState.input);
      return numberFormat;
    }
    function $$core$$CurrencyDigits(currency) {
      return $$core$$currencyMinorUnits[currency] !== undefined ? $$core$$currencyMinorUnits[currency] : 2;
    }
    $$core$$internals.NumberFormat = {
      '[[availableLocales]]': [],
      '[[relevantExtensionKeys]]': ['nu'],
      '[[localeData]]': {}
    };
    $$core$$defineProperty($$core$$Intl.NumberFormat, 'supportedLocalesOf', {
      configurable: true,
      writable: true,
      value: $$core$$fnBind.call($$core$$supportedLocalesOf, $$core$$internals.NumberFormat)
    });
    $$core$$defineProperty($$core$$Intl.NumberFormat.prototype, 'format', {
      configurable: true,
      get: $$core$$GetFormatNumber
    });
    function $$core$$GetFormatNumber() {
      var internal = this != null && typeof this === 'object' && $$core$$getInternalProperties(this);
      if (!internal || !internal['[[initializedNumberFormat]]'])
        throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');
      if (internal['[[boundFormat]]'] === undefined) {
        var F = function(value) {
          return $$core$$FormatNumber(this, Number(value));
        },
            bf = $$core$$fnBind.call(F, this);
        internal['[[boundFormat]]'] = bf;
      }
      return internal['[[boundFormat]]'];
    }
    function $$core$$FormatNumber(numberFormat, x) {
      var n,
          regexpState = $$core$$createRegExpRestore(),
          internal = $$core$$getInternalProperties(numberFormat),
          locale = internal['[[dataLocale]]'],
          nums = internal['[[numberingSystem]]'],
          data = $$core$$internals.NumberFormat['[[localeData]]'][locale],
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
        if ($$core$$hop.call(internal, '[[minimumSignificantDigits]]') && $$core$$hop.call(internal, '[[maximumSignificantDigits]]'))
          n = $$core$$ToRawPrecision(x, internal['[[minimumSignificantDigits]]'], internal['[[maximumSignificantDigits]]']);
        else
          n = $$core$$ToRawFixed(x, internal['[[minimumIntegerDigits]]'], internal['[[minimumFractionDigits]]'], internal['[[maximumFractionDigits]]']);
        if ($$core$$numSys[nums]) {
          var digits = $$core$$numSys[internal['[[numberingSystem]]']];
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
            var groups = new $$core$$List(),
                end = igr.length - pgSize,
                idx = end % sgSize,
                start = igr.slice(0, idx);
            if (start.length)
              $$core$$arrPush.call(groups, start);
            while (idx < end) {
              $$core$$arrPush.call(groups, igr.slice(idx, idx + sgSize));
              idx += sgSize;
            }
            $$core$$arrPush.call(groups, igr.slice(end));
            parts[0] = $$core$$arrJoin.call(groups, ild.group);
          }
          n = $$core$$arrJoin.call(parts, ild.decimal);
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
    function $$core$$ToRawPrecision(x, minPrecision, maxPrecision) {
      var p = maxPrecision;
      if (x === 0) {
        var m = $$core$$arrJoin.call(Array(p + 1), '0'),
            e = 0;
      } else {
        var e = $$core$$log10Floor(Math.abs(x)),
            f = Math.round(Math.exp((Math.abs(e - p + 1)) * Math.LN10)),
            m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
      }
      if (e >= p)
        return m + $$core$$arrJoin.call(Array(e - p + 1 + 1), '0');
      else if (e === p - 1)
        return m;
      else if (e >= 0)
        m = m.slice(0, e + 1) + '.' + m.slice(e + 1);
      else if (e < 0)
        m = '0.' + $$core$$arrJoin.call(Array(-(e + 1) + 1), '0') + m;
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
    function $$core$$ToRawFixed(x, minInteger, minFraction, maxFraction) {
      var idx,
          m = Number.prototype.toFixed.call(x, maxFraction),
          igr = m.split(".")[0].length,
          cut = maxFraction - minFraction,
          exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;
      if (exp) {
        m = m.slice(0, idx).replace('.', '');
        m += $$core$$arrJoin.call(Array(exp - (m.length - 1) + 1), '0') + '.' + $$core$$arrJoin.call(Array(maxFraction + 1), '0');
        igr = m.length;
      }
      while (cut > 0 && m.slice(-1) === "0") {
        m = m.slice(0, -1);
        cut--;
      }
      if (m.slice(-1) === ".")
        m = m.slice(0, -1);
      if (igr < minInteger)
        var z = $$core$$arrJoin.call(Array(minInteger - igr + 1), '0');
      return (z ? z : '') + m;
    }
    var $$core$$numSys = {
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
    $$core$$defineProperty($$core$$Intl.NumberFormat.prototype, 'resolvedOptions', {
      configurable: true,
      writable: true,
      value: function() {
        var prop,
            descs = new $$core$$Record(),
            props = ['locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'],
            internal = this != null && typeof this === 'object' && $$core$$getInternalProperties(this);
        if (!internal || !internal['[[initializedNumberFormat]]'])
          throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');
        for (var i = 0,
            max = props.length; i < max; i++) {
          if ($$core$$hop.call(internal, prop = '[[' + props[i] + ']]'))
            descs[props[i]] = {
              value: internal[prop],
              writable: true,
              configurable: true,
              enumerable: true
            };
        }
        return $$core$$objCreate({}, descs);
      }
    });
    function $$core$$DateTimeFormatConstructor() {
      var locales = arguments[0];
      var options = arguments[1];
      if (!this || this === $$core$$Intl) {
        return new $$core$$Intl.DateTimeFormat(locales, options);
      }
      return $$core$$InitializeDateTimeFormat($$core$$toObject(this), locales, options);
    }
    $$core$$defineProperty($$core$$Intl, 'DateTimeFormat', {
      configurable: true,
      writable: true,
      value: $$core$$DateTimeFormatConstructor
    });
    $$core$$defineProperty($$core$$DateTimeFormatConstructor, 'prototype', {writable: false});
    function $$core$$InitializeDateTimeFormat(dateTimeFormat, locales, options) {
      var internal = $$core$$getInternalProperties(dateTimeFormat),
          regexpState = $$core$$createRegExpRestore();
      if (internal['[[initializedIntlObject]]'] === true)
        throw new TypeError('`this` object has already been initialized as an Intl object');
      $$core$$defineProperty(dateTimeFormat, '__getInternalProperties', {value: function() {
          if (arguments[0] === $$core$$secret)
            return internal;
        }});
      internal['[[initializedIntlObject]]'] = true;
      var requestedLocales = $$core$$CanonicalizeLocaleList(locales),
          options = $$core$$ToDateTimeOptions(options, 'any', 'date'),
          opt = new $$core$$Record();
      matcher = $$core$$GetOption(options, 'localeMatcher', 'string', new $$core$$List('lookup', 'best fit'), 'best fit');
      opt['[[localeMatcher]]'] = matcher;
      var DateTimeFormat = $$core$$internals.DateTimeFormat,
          localeData = DateTimeFormat['[[localeData]]'],
          r = $$core$$ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales, opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);
      internal['[[locale]]'] = r['[[locale]]'];
      internal['[[calendar]]'] = r['[[ca]]'];
      internal['[[numberingSystem]]'] = r['[[nu]]'];
      internal['[[dataLocale]]'] = r['[[dataLocale]]'];
      var dataLocale = r['[[dataLocale]]'],
          tz = options.timeZone;
      if (tz !== undefined) {
        tz = $$core$$toLatinUpperCase(tz);
        if (tz !== 'UTC')
          throw new RangeError('timeZone is not supported.');
      }
      internal['[[timeZone]]'] = tz;
      opt = new $$core$$Record();
      for (var prop in $$core$$dateTimeComponents) {
        if (!$$core$$hop.call($$core$$dateTimeComponents, prop))
          continue;
        var value = $$core$$GetOption(options, prop, 'string', $$core$$dateTimeComponents[prop]);
        opt['[[' + prop + ']]'] = value;
      }
      var bestFormat,
          dataLocaleData = localeData[dataLocale],
          formats = $$core$$ToDateTimeFormats(dataLocaleData.formats),
          matcher = $$core$$GetOption(options, 'formatMatcher', 'string', new $$core$$List('basic', 'best fit'), 'best fit');
      dataLocaleData.formats = formats;
      if (matcher === 'basic')
        bestFormat = $$core$$BasicFormatMatcher(opt, formats);
      else
        bestFormat = $$core$$BestFitFormatMatcher(opt, formats);
      for (var prop in $$core$$dateTimeComponents) {
        if (!$$core$$hop.call($$core$$dateTimeComponents, prop))
          continue;
        if ($$core$$hop.call(bestFormat, prop)) {
          var p = bestFormat[prop];
          internal['[[' + prop + ']]'] = opt['[[' + prop + ']]'] || p;
        }
      }
      var pattern,
          hr12 = $$core$$GetOption(options, 'hour12', 'boolean');
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
      if ($$core$$es3)
        dateTimeFormat.format = $$core$$GetFormatDateTime.call(dateTimeFormat);
      regexpState.exp.test(regexpState.input);
      return dateTimeFormat;
    }
    var $$core$$dateTimeComponents = {
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
    function $$core$$ToDateTimeFormats(formats) {
      if (Object.prototype.toString.call(formats) === '[object Array]') {
        return formats;
      }
      return $$cldr$$createDateTimeFormats(formats);
    }
    function $$core$$ToDateTimeOptions(options, required, defaults) {
      if (options === undefined)
        options = null;
      else {
        var opt2 = $$core$$toObject(options);
        options = new $$core$$Record();
        for (var k in opt2)
          options[k] = opt2[k];
      }
      var create = $$core$$objCreate,
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
    function $$core$$BasicFormatMatcher(options, formats) {
      return $$core$$calculateScore(options, formats);
    }
    function $$core$$calculateScore(options, formats, bestFit) {
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
        for (var property in $$core$$dateTimeComponents) {
          if (!$$core$$hop.call($$core$$dateTimeComponents, property))
            continue;
          var optionsProp = options['[[' + property + ']]'],
              formatProp = $$core$$hop.call(format, property) ? format[property] : undefined;
          if (optionsProp === undefined && formatProp !== undefined)
            score -= additionPenalty;
          else if (optionsProp !== undefined && formatProp === undefined)
            score -= removalPenalty;
          else {
            var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'],
                optionsPropIndex = $$core$$arrIndexOf.call(values, optionsProp),
                formatPropIndex = $$core$$arrIndexOf.call(values, formatProp),
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
    function $$core$$BestFitFormatMatcher(options, formats) {
      return $$core$$calculateScore(options, formats, true);
    }
    $$core$$internals.DateTimeFormat = {
      '[[availableLocales]]': [],
      '[[relevantExtensionKeys]]': ['ca', 'nu'],
      '[[localeData]]': {}
    };
    $$core$$defineProperty($$core$$Intl.DateTimeFormat, 'supportedLocalesOf', {
      configurable: true,
      writable: true,
      value: $$core$$fnBind.call($$core$$supportedLocalesOf, $$core$$internals.DateTimeFormat)
    });
    $$core$$defineProperty($$core$$Intl.DateTimeFormat.prototype, 'format', {
      configurable: true,
      get: $$core$$GetFormatDateTime
    });
    function $$core$$GetFormatDateTime() {
      var internal = this != null && typeof this === 'object' && $$core$$getInternalProperties(this);
      if (!internal || !internal['[[initializedDateTimeFormat]]'])
        throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');
      if (internal['[[boundFormat]]'] === undefined) {
        var F = function() {
          var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);
          return $$core$$FormatDateTime(this, x);
        },
            bf = $$core$$fnBind.call(F, this);
        internal['[[boundFormat]]'] = bf;
      }
      return internal['[[boundFormat]]'];
    }
    function $$core$$FormatDateTime(dateTimeFormat, x) {
      if (!isFinite(x))
        throw new RangeError('Invalid valid date passed to format');
      var internal = dateTimeFormat.__getInternalProperties($$core$$secret),
          regexpState = $$core$$createRegExpRestore(),
          locale = internal['[[locale]]'],
          nf = new $$core$$Intl.NumberFormat([locale], {useGrouping: false}),
          nf2 = new $$core$$Intl.NumberFormat([locale], {
            minimumIntegerDigits: 2,
            useGrouping: false
          }),
          tm = $$core$$ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']),
          result = internal['[[pattern]]'],
          dataLocale = internal['[[dataLocale]]'],
          localeData = $$core$$internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars,
          ca = internal['[[calendar]]'];
      for (var p in $$core$$dateTimeComponents) {
        if ($$core$$hop.call(internal, '[[' + p + ']]')) {
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
            fv = $$core$$FormatNumber(nf, v);
          else if (f === '2-digit') {
            fv = $$core$$FormatNumber(nf2, v);
            if (fv.length > 2)
              fv = fv.slice(-2);
          } else if (f in $$core$$dateWidths) {
            switch (p) {
              case 'month':
                fv = $$core$$resolveDateString(localeData, ca, 'months', f, tm['[[' + p + ']]']);
                break;
              case 'weekday':
                try {
                  fv = $$core$$resolveDateString(localeData, ca, 'days', f, tm['[[' + p + ']]']);
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
        fv = $$core$$resolveDateString(localeData, ca, 'dayPeriods', pm ? 'pm' : 'am');
        result = result.replace('{ampm}', fv);
      }
      regexpState.exp.test(regexpState.input);
      return result;
    }
    function $$core$$ToLocalTime(date, calendar, timeZone) {
      var d = new Date(date),
          m = 'get' + (timeZone || '');
      return new $$core$$Record({
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
    $$core$$defineProperty($$core$$Intl.DateTimeFormat.prototype, 'resolvedOptions', {
      writable: true,
      configurable: true,
      value: function() {
        var prop,
            descs = new $$core$$Record(),
            props = ['locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'],
            internal = this != null && typeof this === 'object' && $$core$$getInternalProperties(this);
        if (!internal || !internal['[[initializedDateTimeFormat]]'])
          throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');
        for (var i = 0,
            max = props.length; i < max; i++) {
          if ($$core$$hop.call(internal, prop = '[[' + props[i] + ']]'))
            descs[props[i]] = {
              value: internal[prop],
              writable: true,
              configurable: true,
              enumerable: true
            };
        }
        return $$core$$objCreate({}, descs);
      }
    });
    var $$core$$ls = $$core$$Intl.__localeSensitiveProtos = {
      Number: {},
      Date: {}
    };
    $$core$$ls.Number.toLocaleString = function() {
      if (Object.prototype.toString.call(this) !== '[object Number]')
        throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');
      return $$core$$FormatNumber(new $$core$$NumberFormatConstructor(arguments[0], arguments[1]), this);
    };
    $$core$$ls.Date.toLocaleString = function() {
      if (Object.prototype.toString.call(this) !== '[object Date]')
        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');
      var x = +this;
      if (isNaN(x))
        return 'Invalid Date';
      var locales = arguments[0],
          options = arguments[1],
          options = $$core$$ToDateTimeOptions(options, 'any', 'all'),
          dateTimeFormat = new $$core$$DateTimeFormatConstructor(locales, options);
      return $$core$$FormatDateTime(dateTimeFormat, x);
    };
    $$core$$ls.Date.toLocaleDateString = function() {
      if (Object.prototype.toString.call(this) !== '[object Date]')
        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');
      var x = +this;
      if (isNaN(x))
        return 'Invalid Date';
      var locales = arguments[0],
          options = arguments[1],
          options = $$core$$ToDateTimeOptions(options, 'date', 'date'),
          dateTimeFormat = new $$core$$DateTimeFormatConstructor(locales, options);
      return $$core$$FormatDateTime(dateTimeFormat, x);
    };
    $$core$$ls.Date.toLocaleTimeString = function() {
      if (Object.prototype.toString.call(this) !== '[object Date]')
        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');
      var x = +this;
      if (isNaN(x))
        return 'Invalid Date';
      var locales = arguments[0],
          options = arguments[1],
          options = $$core$$ToDateTimeOptions(options, 'time', 'time'),
          dateTimeFormat = new $$core$$DateTimeFormatConstructor(locales, options);
      return $$core$$FormatDateTime(dateTimeFormat, x);
    };
    $$core$$defineProperty($$core$$Intl, '__applyLocaleSensitivePrototypes', {
      writable: true,
      configurable: true,
      value: function() {
        $$core$$defineProperty(Number.prototype, 'toLocaleString', {
          writable: true,
          configurable: true,
          value: $$core$$ls.Number.toLocaleString
        });
        $$core$$defineProperty(Date.prototype, 'toLocaleString', {
          writable: true,
          configurable: true,
          value: $$core$$ls.Date.toLocaleString
        });
        for (var k in $$core$$ls.Date) {
          if ($$core$$hop.call($$core$$ls.Date, k))
            $$core$$defineProperty(Date.prototype, k, {
              writable: true,
              configurable: true,
              value: $$core$$ls.Date[k]
            });
        }
      }
    });
    $$core$$defineProperty($$core$$Intl, '__addLocaleData', {value: function(data) {
        if (!$$core$$IsStructurallyValidLanguageTag(data.locale))
          throw new Error("Object passed doesn't identify itself with a valid language tag");
        $$core$$addLocaleData(data, data.locale);
      }});
    function $$core$$addLocaleData(data, tag) {
      if (!data.number)
        throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");
      var locale,
          locales = [tag],
          parts = tag.split('-');
      if (parts.length > 2 && parts[1].length === 4)
        $$core$$arrPush.call(locales, parts[0] + '-' + parts[2]);
      while (locale = $$core$$arrShift.call(locales)) {
        $$core$$arrPush.call($$core$$internals.NumberFormat['[[availableLocales]]'], locale);
        $$core$$internals.NumberFormat['[[localeData]]'][locale] = data.number;
        if (data.date) {
          data.date.nu = data.number.nu;
          $$core$$arrPush.call($$core$$internals.DateTimeFormat['[[availableLocales]]'], locale);
          $$core$$internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
        }
      }
      if ($$core$$defaultLocale === undefined)
        $$core$$defaultLocale = tag;
      if (!$$core$$numberFormatProtoInitialised) {
        $$core$$InitializeNumberFormat($$core$$Intl.NumberFormat.prototype);
        $$core$$numberFormatProtoInitialised = true;
      }
      if (data.date && !$$core$$dateTimeFormatProtoInitialised) {
        $$core$$InitializeDateTimeFormat($$core$$Intl.DateTimeFormat.prototype);
        $$core$$dateTimeFormatProtoInitialised = true;
      }
    }
    function $$core$$log10Floor(n) {
      if (typeof Math.log10 === 'function')
        return Math.floor(Math.log10(n));
      var x = Math.round(Math.log(n) * Math.LOG10E);
      return x - (Number('1e' + x) > n);
    }
    function $$core$$supportedLocalesOf(locales) {
      if (!$$core$$hop.call(this, '[[availableLocales]]'))
        throw new TypeError('supportedLocalesOf() is not a constructor');
      var regexpState = $$core$$createRegExpRestore(),
          options = arguments[1],
          availableLocales = this['[[availableLocales]]'],
          requestedLocales = $$core$$CanonicalizeLocaleList(locales);
      regexpState.exp.test(regexpState.input);
      return $$core$$SupportedLocales(availableLocales, requestedLocales, options);
    }
    function $$core$$resolveDateString(data, ca, component, width, key) {
      var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component],
          alts = {
            narrow: ['short', 'long'],
            short: ['long', 'narrow'],
            long: ['short', 'narrow']
          },
          resolved = $$core$$hop.call(obj, width) ? obj[width] : $$core$$hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];
      return key != null ? resolved[key] : resolved;
    }
    $$core$$Record.prototype = $$core$$objCreate(null);
    function $$core$$Record(obj) {
      for (var k in obj) {
        if (obj instanceof $$core$$Record || $$core$$hop.call(obj, k))
          $$core$$defineProperty(this, k, {
            value: obj[k],
            enumerable: true,
            writable: true,
            configurable: true
          });
      }
    }
    $$core$$List.prototype = $$core$$objCreate(null);
    function $$core$$List() {
      $$core$$defineProperty(this, 'length', {
        writable: true,
        value: 0
      });
      if (arguments.length)
        $$core$$arrPush.apply(this, $$core$$arrSlice.call(arguments));
    }
    function $$core$$createRegExpRestore() {
      var esc = /[.?*+^$[\]\\(){}|-]/g,
          lm = RegExp.lastMatch || '',
          ml = RegExp.multiline ? 'm' : '',
          ret = {input: RegExp.input},
          reg = new $$core$$List(),
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
          $$core$$arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
          lm = lm.slice(lm.indexOf('(') + 1);
        }
      }
      ret.exp = new RegExp($$core$$arrJoin.call(reg, '') + lm, ml);
      return ret;
    }
    function $$core$$toLatinUpperCase(str) {
      var i = str.length;
      while (i--) {
        var ch = str.charAt(i);
        if (ch >= "a" && ch <= "z")
          str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
      }
      return str;
    }
    function $$core$$toObject(arg) {
      if (arg == null)
        throw new TypeError('Cannot convert null or undefined to object');
      return Object(arg);
    }
    function $$core$$getInternalProperties(obj) {
      if ($$core$$hop.call(obj, '__getInternalProperties'))
        return obj.__getInternalProperties($$core$$secret);
      else
        return $$core$$objCreate(null);
    }
    var $$core$$default = $$core$$Intl;
    if (!this.Intl) {
      this.Intl = $$core$$default;
      $$core$$default.__applyLocaleSensitivePrototypes();
    }
    var src$main$$default = $$core$$default;
    this['IntlPolyfill'] = src$main$$default;
  }).call(this);
})(require('process'));
