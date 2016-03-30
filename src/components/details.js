import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';
import ma from '../elements/mediaAdjuster'

@inject(I18N, HttpClient, Element)
export class Details{

    //constructor
    constructor(i18n, http, Element){
      this.http = http;
      this.i18n = i18n;
      this.element = Element;
      this.data = '';
      var self = this;
    }

    //on activate, get link to the param
    activate(params){
      this.link = params.data;

      var p1 = this.fetchIndex();

      //start fetching data about user
      var p2 = this.fetchData(this.link)
      .then(()=>{
        this.initializeComments(this.link);
      });

      return Promise.all([p1, p2]);
    }

    //fetching index file and show data on screen
    fetchIndex(){
        return this.http.fetch('data/index.json')
        .then(response=>{
          //convert text to json
          return response.json()
        })
        .then(json=>{

            let infos = json;
            let cur = _.find(infos, (c)=>{
              return c.data == this.link;
            });

            return cur;
          }).then(c=>{
            this.currentDetails = c;
          });
    }

    //fetching data about given link
    fetchData(link){

      //init markdown render to html
      let md = new Remarkable({
        html: true
      });

      return this.http.fetch('data/full/' + link + '.md')
      .then(response=>{
        return response.text();
      })
      .then(data=>{
        let html = md.render(data);
        html = ma.adjustMedia(html);
        this.data = html;
      });
    }

    //initialize comments section
    initializeComments(link){
      window.cackle_widget = [];
      window.cackle_widget.push(
        {
          widget: 'Comment',
          id: 43259,
          channel: link
        });

      var mc = document.createElement('script');
      mc.type = 'text/javascript';
      mc.async = true;
      mc.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cackle.me/widget.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
    }
}
