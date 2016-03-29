import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import m from 'markdown';
import {I18N} from 'aurelia-i18n';

@inject(I18N, HttpClient, Element)
export class Details{

    //constructor
    constructor(i18n, http, Element){
      this.http = http;
      this.i18n = i18n;
      this.element = Element;
      this.data = '';
      this.closeInfos = [{
        data: 'theatre',
        pos: [65, 54]
      }];
    }

    //on activate, get link to the param
    activate(params){
      this.link = params.data;

      //start fetching data about user
      return this.fetchData(this.link);
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
        this.data = html;
      });
    }

    initializeDisqus(link){
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

    //on attahed to DOM
    attached(){
      //adjust images
      $(this.element).find('#data').find('img').addClass('img-responsive img-thumbnail');
      //adjust video
      $(this.element).find('#data').find('iframe').addClass('embed-responsive-item');
      //wrap it into responsive div
      $(this.element).find('#data').find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
      this.initializeDisqus(this.link);
    }

    detached(){

    }
}
