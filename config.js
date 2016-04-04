System.config({
  defaultJSExtensions: true,
  transpiler: "-a",
  babelOptions: {
    "optional": [
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  paths: {
    "*": "src/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "dist/app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.4.js",
      "app.js",
      "main.js"
    ],
    "dist/vendor-aurelia.js": [
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.0.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.0/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.0.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.0/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0-beta.1.2.0.js",
      "npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history.js",
      "npm:aurelia-i18n@0.5.0.js",
      "npm:aurelia-i18n@0.5.0/aurelia-i18n.js",
      "npm:aurelia-i18n@0.5.0/base-i18n.js",
      "npm:aurelia-i18n@0.5.0/defaultTranslations/relative.time.js",
      "npm:aurelia-i18n@0.5.0/df.js",
      "npm:aurelia-i18n@0.5.0/i18n.js",
      "npm:aurelia-i18n@0.5.0/nf.js",
      "npm:aurelia-i18n@0.5.0/relativeTime.js",
      "npm:aurelia-i18n@0.5.0/rt.js",
      "npm:aurelia-i18n@0.5.0/t.js",
      "npm:aurelia-i18n@0.5.0/utils.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.0.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.0/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.0-beta.1.2.0.js",
      "npm:aurelia-router@1.0.0-beta.1.2.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compile-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compose.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/focus.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/hide.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/if.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/show.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/view-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/with.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.0/aurelia-templating.js",
      "npm:i18next-xhr-backend@0.5.3.js",
      "npm:i18next-xhr-backend@0.5.3/dist/commonjs/index.js",
      "npm:i18next-xhr-backend@0.5.3/dist/commonjs/utils.js",
      "npm:i18next-xhr-backend@0.5.3/index.js",
      "npm:i18next@2.4.0.js",
      "npm:i18next@2.4.0/dist/commonjs/BackendConnector.js",
      "npm:i18next@2.4.0/dist/commonjs/CacheConnector.js",
      "npm:i18next@2.4.0/dist/commonjs/EventEmitter.js",
      "npm:i18next@2.4.0/dist/commonjs/Interpolator.js",
      "npm:i18next@2.4.0/dist/commonjs/LanguageUtils.js",
      "npm:i18next@2.4.0/dist/commonjs/PluralResolver.js",
      "npm:i18next@2.4.0/dist/commonjs/ResourceStore.js",
      "npm:i18next@2.4.0/dist/commonjs/Translator.js",
      "npm:i18next@2.4.0/dist/commonjs/compatibility/v1.js",
      "npm:i18next@2.4.0/dist/commonjs/defaults.js",
      "npm:i18next@2.4.0/dist/commonjs/i18next.js",
      "npm:i18next@2.4.0/dist/commonjs/index.js",
      "npm:i18next@2.4.0/dist/commonjs/logger.js",
      "npm:i18next@2.4.0/dist/commonjs/postProcessor.js",
      "npm:i18next@2.4.0/dist/commonjs/utils.js",
      "npm:i18next@2.4.0/index.js",
      "npm:process@0.11.2.js",
      "npm:process@0.11.2/browser.js"
    ],
    "dist/vendor-build.js": [
      "github:components/jquery@2.2.1.js",
      "github:components/jquery@2.2.1/jquery.js",
      "github:github/fetch@0.10.1.js",
      "github:github/fetch@0.10.1/fetch.js",
      "github:jspm/nodelibs-buffer@0.1.0.js",
      "github:jspm/nodelibs-buffer@0.1.0/index.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:systemjs/plugin-text@0.0.4.js",
      "github:systemjs/plugin-text@0.0.4/text.js",
      "github:twbs/bootstrap@3.3.6.js",
      "github:twbs/bootstrap@3.3.6/js/bootstrap.js",
      "npm:autolinker@0.15.3.js",
      "npm:autolinker@0.15.3/dist/Autolinker.js",
      "npm:base64-js@0.0.8.js",
      "npm:base64-js@0.0.8/lib/b64.js",
      "npm:buffer@3.6.0.js",
      "npm:buffer@3.6.0/index.js",
      "npm:ieee754@1.1.6.js",
      "npm:ieee754@1.1.6/index.js",
      "npm:isarray@1.0.0.js",
      "npm:isarray@1.0.0/index.js",
      "npm:lodash@4.6.1.js",
      "npm:lodash@4.6.1/lodash.js",
      "npm:process@0.11.2.js",
      "npm:process@0.11.2/browser.js",
      "npm:remarkable@1.6.2.js",
      "npm:remarkable@1.6.2/index.js",
      "npm:remarkable@1.6.2/lib/common/entities.js",
      "npm:remarkable@1.6.2/lib/common/html_blocks.js",
      "npm:remarkable@1.6.2/lib/common/html_re.js",
      "npm:remarkable@1.6.2/lib/common/url_schemas.js",
      "npm:remarkable@1.6.2/lib/common/utils.js",
      "npm:remarkable@1.6.2/lib/configs/commonmark.js",
      "npm:remarkable@1.6.2/lib/configs/default.js",
      "npm:remarkable@1.6.2/lib/configs/full.js",
      "npm:remarkable@1.6.2/lib/helpers/normalize_link.js",
      "npm:remarkable@1.6.2/lib/helpers/normalize_reference.js",
      "npm:remarkable@1.6.2/lib/helpers/parse_link_destination.js",
      "npm:remarkable@1.6.2/lib/helpers/parse_link_label.js",
      "npm:remarkable@1.6.2/lib/helpers/parse_link_title.js",
      "npm:remarkable@1.6.2/lib/index.js",
      "npm:remarkable@1.6.2/lib/parser_block.js",
      "npm:remarkable@1.6.2/lib/parser_core.js",
      "npm:remarkable@1.6.2/lib/parser_inline.js",
      "npm:remarkable@1.6.2/lib/renderer.js",
      "npm:remarkable@1.6.2/lib/ruler.js",
      "npm:remarkable@1.6.2/lib/rules.js",
      "npm:remarkable@1.6.2/lib/rules_block/blockquote.js",
      "npm:remarkable@1.6.2/lib/rules_block/code.js",
      "npm:remarkable@1.6.2/lib/rules_block/deflist.js",
      "npm:remarkable@1.6.2/lib/rules_block/fences.js",
      "npm:remarkable@1.6.2/lib/rules_block/footnote.js",
      "npm:remarkable@1.6.2/lib/rules_block/heading.js",
      "npm:remarkable@1.6.2/lib/rules_block/hr.js",
      "npm:remarkable@1.6.2/lib/rules_block/htmlblock.js",
      "npm:remarkable@1.6.2/lib/rules_block/lheading.js",
      "npm:remarkable@1.6.2/lib/rules_block/list.js",
      "npm:remarkable@1.6.2/lib/rules_block/paragraph.js",
      "npm:remarkable@1.6.2/lib/rules_block/state_block.js",
      "npm:remarkable@1.6.2/lib/rules_block/table.js",
      "npm:remarkable@1.6.2/lib/rules_core/abbr.js",
      "npm:remarkable@1.6.2/lib/rules_core/abbr2.js",
      "npm:remarkable@1.6.2/lib/rules_core/block.js",
      "npm:remarkable@1.6.2/lib/rules_core/footnote_tail.js",
      "npm:remarkable@1.6.2/lib/rules_core/inline.js",
      "npm:remarkable@1.6.2/lib/rules_core/linkify.js",
      "npm:remarkable@1.6.2/lib/rules_core/references.js",
      "npm:remarkable@1.6.2/lib/rules_core/replacements.js",
      "npm:remarkable@1.6.2/lib/rules_core/smartquotes.js",
      "npm:remarkable@1.6.2/lib/rules_inline/autolink.js",
      "npm:remarkable@1.6.2/lib/rules_inline/backticks.js",
      "npm:remarkable@1.6.2/lib/rules_inline/del.js",
      "npm:remarkable@1.6.2/lib/rules_inline/emphasis.js",
      "npm:remarkable@1.6.2/lib/rules_inline/entity.js",
      "npm:remarkable@1.6.2/lib/rules_inline/escape.js",
      "npm:remarkable@1.6.2/lib/rules_inline/footnote_inline.js",
      "npm:remarkable@1.6.2/lib/rules_inline/footnote_ref.js",
      "npm:remarkable@1.6.2/lib/rules_inline/htmltag.js",
      "npm:remarkable@1.6.2/lib/rules_inline/ins.js",
      "npm:remarkable@1.6.2/lib/rules_inline/links.js",
      "npm:remarkable@1.6.2/lib/rules_inline/mark.js",
      "npm:remarkable@1.6.2/lib/rules_inline/newline.js",
      "npm:remarkable@1.6.2/lib/rules_inline/state_inline.js",
      "npm:remarkable@1.6.2/lib/rules_inline/sub.js",
      "npm:remarkable@1.6.2/lib/rules_inline/sup.js",
      "npm:remarkable@1.6.2/lib/rules_inline/text.js"
    ],
    "dist/app-build-components.js": [
      "components/details.html!github:systemjs/plugin-text@0.0.4.js",
      "components/details.js",
      "components/detailsClose.html!github:systemjs/plugin-text@0.0.4.js",
      "components/detailsClose.js",
      "components/home.html!github:systemjs/plugin-text@0.0.4.js",
      "components/home.js",
      "components/map.html!github:systemjs/plugin-text@0.0.4.js",
      "components/map.js"
    ],
    "dist/app-build-elements.js": [
      "elements/closeInfo.html!github:systemjs/plugin-text@0.0.4.js",
      "elements/closeInfo.js",
      "elements/footer.html!github:systemjs/plugin-text@0.0.4.js",
      "elements/footer.js",
      "elements/mediaAdjuster.js",
      "elements/navBar.html!github:systemjs/plugin-text@0.0.4.js",
      "elements/navBar.js",
      "elements/wall.html!github:systemjs/plugin-text@0.0.4.js",
      "elements/wall.js"
    ]
  },
  map: {
    "-a": "npm:babel-core@5.8.38",
    "-a-runtime": "npm:babel-runtime@5.8.38",
    "andyearnshaw/Intl.js": "github:andyearnshaw/Intl.js@1.1.0",
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.2.0",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.2.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
    "aurelia-i18n": "npm:aurelia-i18n@0.5.0",
    "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "chjj/marked": "github:chjj/marked@0.3.5",
    "core-js": "npm:core-js@2.2.1",
    "fetch": "github:github/fetch@0.10.1",
    "font-awesome": "npm:font-awesome@4.5.0",
    "i18next-xhr-backend": "npm:i18next-xhr-backend@0.5.3",
    "jszip": "npm:jszip@2.6.0",
    "kombai/freewall": "github:kombai/freewall@1.0.5",
    "lodash": "npm:lodash@4.6.1",
    "markdown": "npm:markdown@0.5.0",
    "masonry-layout": "npm:masonry-layout@4.0.0",
    "remarkable": "npm:remarkable@1.6.2",
    "stephen-hardy/DOCX.js": "github:stephen-hardy/DOCX.js@master",
    "suprb/Nested": "github:suprb/Nested@master",
    "text": "github:systemjs/plugin-text@0.0.4",
    "thomaspark/bootswatch": "github:thomaspark/bootswatch@3.3.6",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "npm:abbrev@1.0.7": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:argparse@0.1.16": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "underscore": "npm:underscore@1.7.0",
      "underscore.string": "npm:underscore.string@2.4.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-binding@1.0.0-beta.1.3.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-i18n@0.5.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.0",
      "i18next": "npm:i18next@2.4.0",
      "intl": "npm:intl@1.1.0"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:autolinker@0.15.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@2.2.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:fizzy-ui-utils@2.0.1": {
      "desandro-matches-selector": "npm:desandro-matches-selector@2.0.1"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:i18next@2.4.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intl@1.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:jszip@2.6.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@4.6.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:markdown@0.5.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "nopt": "npm:nopt@2.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:masonry-layout@4.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "get-size": "npm:get-size@2.0.2",
      "outlayer": "npm:outlayer@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:nopt@2.1.2": {
      "abbrev": "npm:abbrev@1.0.7",
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:outlayer@2.0.1": {
      "ev-emitter": "npm:ev-emitter@1.0.2",
      "fizzy-ui-utils": "npm:fizzy-ui-utils@2.0.1",
      "get-size": "npm:get-size@2.0.2"
    },
    "npm:pako@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:remarkable@1.6.2": {
      "argparse": "npm:argparse@0.1.16",
      "autolinker": "npm:autolinker@0.15.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});