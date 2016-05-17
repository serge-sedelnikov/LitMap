import $ from "jquery";
import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";

@inject (EventAggregator, BindingEngine)
export class MarkerEditModal{

  //marker to be bind
  @bindable item;

  constructor(EventAggregator, BindingEngine){
    //subscribe for item properties changed
    this.mo = BindingEngine;
    this.ea = EventAggregator;
  }

  //adds marker to the mini map
  setUpMarker(){
    if(!this.miniMap)
      return;

    if(!this.item)
      return;
    if(!this.item.pos){
      this.item.pos = [0.0, 0.0];
      return;
    }
    let center = [this.item.pos[0], this.item.pos[1]];

    //clean markers if needed
    if(this.markers)
      this.map.removeLayer(this.markers);

    //set up clustering
    this.markers = new L.MarkerClusterGroup();

    //set up center
    this.map.setView(center, 13);

    //set marker
    var marker = L.marker(new L.LatLng(this.item.pos[0], this.item.pos[1]), {
        icon: L.mapbox.marker.icon(
          {
            'marker-symbol': this.item.marker,
            'marker-color': this.item.color
          })
    });

    this.markers.addLayer(marker);
    this.map.addLayer(this.markers);
  }

  //initializes the map
  initializeMap(){
    //initialize map only if not yet initialized
    if(!this.map){
      this.map = L.mapbox
          .map(`mini-map-modal`, 'mapbox.streets',{
            zoomControl: false,
            infoControl: false
          });
      }
    }

  itemChanged(){
    if(this.dispose)
      this.dispose.dispose();

    if(this.item){
        // subscribe
        this.dispose = this.mo.propertyObserver(this.item, 'color').subscribe(() => {
          this.setUpMarker();
        });
      }
  }

  attached(){

      this.initializeMap();

      let s = this;
      //subscribe for map invalidate
      $(this.modal).on('shown.bs.modal', () => {
        s.invalidateMap();
        s.setUpMarker();
      });

      //subscribe for events
      this.posChangedSub = this.ea.subscribe('marker-model-changed', ()=>{
        this.setUpMarker();
      })
  }

  detached(){
    this.posChangedSub.dispose();
  }

  invalidateMap(){
    this.map.invalidateSize();
  }
}

//converts array of positions into two values according to index
@inject(EventAggregator)
export class PosValueConverter{

  constructor(EventAggregator){
    this.ea = EventAggregator;
  }

  toView(value, index){
    this.index = index;

    if(!value)
      return undefined;

    return value[index];
  }

  fromView(value, index, array){
    array[index] = parseFloat(value);
    this.ea.publish('marker-model-changed');
    return array;
  }
}