"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <require from="thomaspark/bootswatch/paper/bootstrap.min.css"></require> <require from="elements/navBar"></require> <nav-bar router.bind="router"></nav-bar> <router-view></router-view> </template>'})}(),System.register("app.js",["github:components/jquery@2.2.1/jquery.min.js","bootstrap/js/bootstrap.min.js","aurelia-i18n","aurelia-event-aggregator","aurelia-framework"],function(a){"use strict";var b,c,d,e,f;return{setters:[function(a){},function(a){},function(a){b=a.I18N,c=a.BaseI18N},function(a){d=a.EventAggregator},function(a){e=a.inject}],execute:function(){f=function(){function a(a,b,d){babelHelpers.classCallCheck(this,c),this.i18n=a,this.i18n.setLocale("ru")}babelHelpers.createClass(a,[{key:"configureRouter",value:function(a,b){a.title=this.i18n.i18next.t("app.title"),a.map([{route:["","map"],name:"map",moduleId:"./components/map",nav:!0,title:this.i18n.i18next.t("app.mapNav")}]),this.router=b}}]);var c=a;return a=e(b,Element,d)(a)||a}(),a("App",f)}}}),System.register("main.js",["aurelia-i18n","i18next-xhr-backend"],function(a){"use strict";function b(a){a.use.standardConfiguration().developmentLogging().plugin("aurelia-i18n",function(a){a.i18next.use(d).init({backend:{loadPath:"locales/{{lng}}.json"},lng:"ru",attributes:["t","i18n"],fallbackLng:"en",debug:!0,ns:["translation"],defaultNS:"translation",fallbackNS:"translation"}),console.log("init od XHR done")}),a.start().then(function(a){return a.setRoot()})}var c,d;return a("configure",b),{setters:[function(a){c=a.I18N},function(a){d=a["default"]}],execute:function(){}}});