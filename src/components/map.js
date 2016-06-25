import _ from "lodash";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import ma from '../elements/mediaAdjuster'
import Remarkable from 'remarkable';

@inject(I18N, HttpClient, Element)
export class Map{
  @bindable query;

  constructor(i18bn, http, Element){
    this.self = this;
    self.http = http;
    self.i18bn = i18bn;
    this.element = Element;
    this.query = '';

    //loaded up items
    this.items = [];
  }

  //fetching markers from the backend and putting them on the map
  fetchMarkers(points, map, saveOriginal){

    //save points for future search
    if(saveOriginal)
      this.items = points;

    //clear the layers in grouping layer
    self.overlays.clearLayers();

    //set up clustering
    var markers = new L.MarkerClusterGroup().addTo(self.overlays);

    _.forEach(points, a=>{
        var marker = L.marker(new L.LatLng(a.pos[0], a.pos[1]), {
            icon: L.mapbox.marker.icon(
              {
                'marker-symbol': a.marker,
                'marker-color': a.color,
                'marker-size': 'large'
              })
        });

        //init markdown renderer
        var md = new Remarkable({
          html: true
        });

        //fetch marker text as md and set poopup as html
        self.http.fetch('data/thumbs/' + a.data + '.md')
        .then(d=>{

          //fetch full text for each marker to perform full text search
          self.http.fetch('data/full/'+ a.data + '.md')
          .then(ft=>{
            return ft.text();
          })
          .then(fft=>{
            a.fullText = fft;
          });

          return  d.text();
        })
        .then(t=>{
          //save text for search
          a.text = t;

          //render html for marker
          let html = md.render(t);
          html = ma.adjustMedia(html);
          marker.bindPopup('<div class="marker-thumb">' + html + '</div><div class="text-right"><a href="/#/' + a.data + '" class="btn btn-default">' + self.i18bn.i18next.t('map.marker.readMore') + '</a></div>');
          markers.addLayer(marker);
        });
    });

    map.addLayer(markers);
  }

  fetchIndex(map){
      let url = 'data/index.json?t=' + new Date().getTime();
      console.log(url);
      self.http.fetch(url)
      .then(response=>{
        //convert text to json
        return response.json()
      })
      .then(json=>{
        //once file downloaded, fetch markers
        this.fetchMarkers(json, map, true)
      });
  }

  //on attached to DOM
  attached(){
    self.map = L.mapbox
        .map('map', 'mapbox.streets')
        .setView([57.15000, 65.53333], 11);
    self.overlays = L.layerGroup().addTo(self.map);

    //start loading index file and once its done, fetch markers data.
    //start fetching markers
    this.fetchIndex(self.map);
  }

  //on search query changed
  queryChanged(newValue){
      let searchedItems = _.filter(this.items, i => {
          return i.text.toLowerCase().indexOf(newValue.toLowerCase()) != -1 ||
            i.fullText.toLowerCase().indexOf(newValue.toLowerCase()) != -1;
      });

      console.log(searchedItems);
      this.fetchMarkers(searchedItems, self.map);
  }
}

//value converter for i18n
@inject(I18N)
class TValueConverter{

  constructor(i18bn){
    this.i18bn = i18bn;
  }

  toView(key){
    return this.i18n.i18next.t(key);
  }
}
