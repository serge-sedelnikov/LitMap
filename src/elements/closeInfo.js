import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';

@inject(HttpClient)
export class CloseInfo{
@bindable data;
@bindable details;

  constructor(http){
    this.http = http;
    //init markdown renderer
    this.md = new Remarkable({
      html: true
    });
  }

  bind(){
    //calculate and display distance
    let p1 = new L.LatLng(this.data.pos[0], this.data.pos[1]);
    let p2 = new L.LatLng(this.details.pos[0], this.details.pos[1]);
    this.distance = p1.distanceTo(p2).toFixed(0);

    //fetch the file with the given link from thumbs
    this.http.fetch('data/thumbs/' +this.data.data + '.md')
    .then(response=>{
      return response.text();
    })
    .then(t=>{
      let html = this.md.render(t);
      html = this.adjustMedia(html);
      this.html = html;
    });
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

export class DistanceToVisibilityValueConverter{
  toView(value){
    return (value == "0" ? "none" : "inherit");
  }
}

export class ToDistanceViewValueConverter{
  toView(value){
    let num = parseInt(value);
    return (value > 1000 ? (value/1000.0).toFixed(1) : value);
  }
}
