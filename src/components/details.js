import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';

@inject(I18N, HttpClient, Element)
export class Details{

    //constructor
    constructor(i18n, http, Element){
      this.http = http;
      this.i18n = i18n;
      this.element = Element;
      this.data = '';
      this.closeInfos = [];
      this.self = this;
    }

    //on activate, get link to the param
    activate(params){
      this.link = params.data;

      //fetch index to show close data and interesting data
      this.fetchIndex();

      //start fetching data about user
      return this.fetchData(this.link);
    }

    //refresh closest once data changed
    dataChanged(){
      this.fetchIndex();
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
            this.currentDetails = _.find(infos, (c)=>{
              return c.data == this.link;
            });
              //order them by didtance
              let p1 = new L.LatLng(this.currentDetails.pos[0], this.currentDetails.pos[1]);

              this.closeInfos = _.sortBy(infos, (info)=>{

              let p2 = new L.LatLng(info.pos[0], info.pos[1]);
              info.distance = p1.distanceTo(p2).toFixed(0);
              return parseInt(info.distance);

            });
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
        html = this.adjustMedia(html);
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

    //adjusts media in thumbnails of the markers.
    adjustMedia(html){
      //adjust images
      let thumbs = $('<div>' + html + '</div>');
      thumbs.find('img').addClass('img-responsive img-thumbnail');
      //adjust video
      thumbs.find('iframe').addClass('embed-responsive-item iframe-thumbnail');
      //wrap it into responsive div
      thumbs.find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');

      return thumbs.html();
    }
}
