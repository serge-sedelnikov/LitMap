import {bindable, inject} from "aurelia-framework";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import ma from '../elements/mediaAdjuster'
import Remarkable from 'remarkable';
import {EventAggregator} from "aurelia-event-aggregator";

@inject (Element, HttpClient, EventAggregator)
export class AdminMarkerInfo{
  @bindable item;
  @bindable index;

  constructor(Element, HttpClient, EventAggregator){
      this.element = Element;
      this.http = HttpClient;
      this.ea = EventAggregator;
  }

  //adds marker to the mini map
  setUpMarker(){
    if(!this.miniMap)
      return;
    if(!this.item)
      return;
    if(!this.item.pos)
      this.item.pos = [0.0, 0.0];

    //set up clustering
    let markers = new L.MarkerClusterGroup();

    //set up center
    self.map.setView(this.item.pos, 13);

    //set marker
    var marker = L.marker(new L.LatLng(this.item.pos[0], this.item.pos[1]), {
        icon: L.mapbox.marker.icon(
          {
            'marker-symbol': this.item.marker,
            'marker-color': this.item.color
          })
    });
    markers.addLayer(marker);
    self.map.addLayer(markers);
  }

  //loads up the content for the mini view
  setUpContent(){

    //init markdown renderer
    let md = new Remarkable({
      html: true
    });

    //fetch marker text as md and set poopup as html
    this.http.fetch('data/thumbs/' + this.item.data + '.md')
      .then(d=>{
        return d.text();
      })
      .then(t=>{
        let html = md.render(t);
        html = ma.adjustMedia(html);
        this.data = html;
      });
  }

  //on item changed
  itemChanged(){
      this.setUpMarker();
  }

  attached(){
    self.map = L.mapbox
        .map(`mini-map-${this.index}`, 'mapbox.streets',{
          zoomControl: false,
          infoControl: false
        })
        .setView(this.item.pos, 16);
        // Disable drag and zoom handlers.
    self.map.dragging.disable();
    self.map.touchZoom.disable();
    self.map.doubleClickZoom.disable();
    self.map.scrollWheelZoom.disable();
    self.map.keyboard.disable();

    // Disable tap handler, if present.
    if (self.map.tap)
      self.map.tap.disable();

      this.setUpMarker();
      this.setUpContent();
  }

  //trigger to marker edit
  editMarker(){
    //pass message to the parent to edit the marker
    this.ea.publish('admin-marker-edit', this.item);
  }
}
