"bundle";!function(){var a=System.amdDefine;a("elements/navBar.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <nav class="navbar navbar-default navbar-fixed-top" role="navigation"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#"> <img alt="Brand" src="./content/logo2.png" class="logo"> </a> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li repeat.for="row of router.navigation" class="${row.isActive ? \'active\' : \'\'}"> <a href.bind="row.href">${row.title}</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li class="loader" if.bind="router.isNavigating"> <i class="fa fa-spinner fa-spin fa-2x"></i> </li> </ul> </div> </nav> </template>'})}(),System.register("elements/navBar.js",["aurelia-framework"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.bindable}],execute:function(){c=function(){function a(){babelHelpers.classCallCheck(this,a),babelHelpers.defineDecoratedPropertyDescriptor(this,"router",c)}var c={};return babelHelpers.createDecoratedClass(a,[{key:"router",decorators:[b],initializer:null,enumerable:!0}],null,c),a}(),a("NavBar",c)}}});