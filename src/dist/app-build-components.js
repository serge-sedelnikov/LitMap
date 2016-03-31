"bundle";!function(){var a=System.amdDefine;a("components/details.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <require from="./detailsClose"></require> <div class="page-content container"> <div> <div class="col-sm-4 hidden-xs"> <div class="section"> <h5 t="details.closeToThisPlace"></h5> <hr> <details-close parent-data.bind="currentDetails"></details-close> </div> </div> <div class="col-sm-8 col-xs-12 data" id="data"> <div class="section" innerHTML.bind="data"></div> <div class="section"> <div id="mc-container"></div> </div> </div> </div> </div> </template>'})}(),System.register("components/details.js",["fetch","aurelia-fetch-client","aurelia-framework","aurelia-i18n","lodash","../elements/mediaAdjuster","remarkable"],function(a){"use strict";var b,c,d,e,f,g,h,i;return{setters:[function(a){},function(a){b=a.HttpClient},function(a){c=a.inject,d=a.bindable},function(a){e=a.I18N},function(a){f=a["default"]},function(a){g=a["default"]},function(a){h=a["default"]}],execute:function(){i=function(){function a(a,b,c){babelHelpers.classCallCheck(this,d),this.http=b,this.i18n=a,this.element=c,this.data=""}babelHelpers.createClass(a,[{key:"activate",value:function(a){var b=this;this.link=a.data;var c=this.fetchIndex(),d=this.fetchData(this.link).then(function(){b.initializeComments(b.link)});return Promise.all([c,d])}},{key:"fetchIndex",value:function(){var a=this;return this.http.fetch("data/index.json").then(function(a){return a.json()}).then(function(b){var c=b,d=f.find(c,function(b){return b.data==a.link});return d}).then(function(b){a.currentDetails=b})}},{key:"fetchData",value:function(a){var b=this,c=new h({html:!0});return this.http.fetch("data/full/"+a+".md").then(function(a){return a.text()}).then(function(a){var d=c.render(a);d=g.adjustMedia(d),b.data=d})}},{key:"initializeComments",value:function(a){window.cackle_widget=[],window.cackle_widget.push({widget:"Comment",id:43259,channel:a});var b=document.createElement("script");b.type="text/javascript",b.async=!0,b.src=("https:"==document.location.protocol?"https":"http")+"://cackle.me/widget.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c.nextSibling)}}]);var d=a;return a=c(e,b,Element)(a)||a}(),a("Details",i)}}}),function(){var a=System.amdDefine;a("components/detailsClose.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <require from="../elements/closeInfo"></require> <close-info class="info-tile" repeat.for="i of closeInfos" data.bind="i" details.bind="currentDetails"></close-info> </template>'})}(),System.register("components/detailsClose.js",["fetch","aurelia-fetch-client","aurelia-framework","aurelia-i18n","lodash"],function(a){"use strict";var b,c,d,e,f,g;return{setters:[function(a){},function(a){b=a.HttpClient},function(a){c=a.inject,d=a.bindable},function(a){e=a.I18N},function(a){f=a["default"]}],execute:function(){g=function(){function a(a,b,c){babelHelpers.classCallCheck(this,h),babelHelpers.defineDecoratedPropertyDescriptor(this,"parentData",g),this.http=b,this.i18n=a,this.element=c,this.data="",this.closeInfos=[],this.self=this}var g={},g={};babelHelpers.createDecoratedClass(a,[{key:"parentData",decorators:[d],initializer:null,enumerable:!0}],null,g),babelHelpers.createDecoratedClass(a,[{key:"parentDataChanged",value:function(){return this.fetchIndex()}},{key:"bind",value:function(){return this.fetchIndex()}},{key:"fetchIndex",value:function(){var a=this,b=new L.LatLng(this.parentData.pos[0],this.parentData.pos[1]);return this.http.fetch("data/index.json").then(function(a){return a.json()}).then(function(c){var d=c;d=f.sortBy(d,function(a){var c=new L.LatLng(a.pos[0],a.pos[1]);return a.distance=b.distanceTo(c).toFixed(0),parseInt(a.distance)}),a.closeInfos=f.filter(d,function(a){return a.distance>0&&a.distance<=1e4})})}}],null,g);var h=a;return a=c(e,b,Element)(a)||a}(),a("DetailsClose",g)}}}),function(){var a=System.amdDefine;a("components/home.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <require from="../elements/wall"></require> <div class="page-content container"> <div class="section index-top bg-books"> <div class="text-center"> <div class="logo-container"><img class="logo-index" src="content/logo3.png"></div> </div> <div class="text-center"> <h1>Литературная карта</h1> <h2>города Тюмень</h2> </div> <div class="text-right"> <div class="thumb-small"> <img src="content/coat_of_arms.png" style="margin-top:-22px"> </div> <div class="thumb-small"> <img src="content/flag.png" style="margin-top:-17px;width:50px;margin-left:-25px"> </div> </div> </div> <section> <h4 t="home.interestingThisWeek"></h4> <wall infos.bind="infos"></wall> </section> <section> <h4 t="home.nearMe"></h4> <wall infos.bind="infos"></wall> </section> </div> </template>'})}(),System.register("components/home.js",["fetch","aurelia-fetch-client","aurelia-framework","aurelia-i18n","lodash"],function(a){"use strict";var b,c,d,e,f,g;return{setters:[function(a){},function(a){b=a.HttpClient},function(a){c=a.inject,d=a.bindable},function(a){e=a.I18N},function(a){f=a["default"]}],execute:function(){g=function(){function a(a,b,c){babelHelpers.classCallCheck(this,d),this.http=b,this.i18n=a,this.element=c,this.infos=[]}babelHelpers.createClass(a,[{key:"activate",value:function(){return this.fetchIndex()}},{key:"fetchIndex",value:function(){var a=this;return this.http.fetch("data/index.json").then(function(a){return a.json()}).then(function(b){var c=b;a.infos=c})}}]);var d=a;return a=c(e,b,Element)(a)||a}(),a("Home",g)}}}),function(){var a=System.amdDefine;a("components/map.html!github:systemjs/plugin-text@0.0.4.js",[],function(){return'<template> <div id="map"></div> </template>'})}(),System.register("components/map.js",["lodash","fetch","aurelia-fetch-client","aurelia-framework","aurelia-i18n","../elements/mediaAdjuster","remarkable"],function(a){"use strict";var b,c,d,e,f,g,h;return{setters:[function(a){b=a["default"]},function(a){},function(a){c=a.HttpClient},function(a){d=a.inject},function(a){e=a.I18N},function(a){f=a["default"]},function(a){g=a["default"]}],execute:function(){h=function(){function a(a,b,c){babelHelpers.classCallCheck(this,h),this.self=this,self.http=b,self.i18bn=a,this.element=c}babelHelpers.createClass(a,[{key:"fetchMarkers",value:function(a,c){var d=new L.MarkerClusterGroup;b.forEach(a,function(a){var b=L.marker(new L.LatLng(a.pos[0],a.pos[1]),{icon:L.mapbox.marker.icon({"marker-symbol":a.marker,"marker-color":a.color,"marker-size":"large"}),title:"index"}),c=new g({html:!0});self.http.fetch("data/thumbs/"+a.data+".md").then(function(a){return a.text()}).then(function(e){var g=c.render(e);g=f.adjustMedia(g),b.bindPopup('<div class="marker-thumb">'+g+'</div><div class="text-right"><a href="/#/'+a.data+'" class="btn btn-default">'+self.i18bn.i18next.t("map.marker.readMore")+"</a></div>"),d.addLayer(b)})}),c.addLayer(d)}},{key:"fetchIndex",value:function(a){var b=this;self.http.fetch("data/index.json").then(function(a){return a.json()}).then(function(c){b.fetchMarkers(c,a)})}},{key:"attached",value:function(){L.mapbox.accessToken="pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA",self.map=L.mapbox.map("map","mapbox.streets").setView([57.15,65.53333],11),this.fetchIndex(self.map)}}]);var h=a;return a=d(e,c,Element)(a)||a}(),a("Map",h)}}});