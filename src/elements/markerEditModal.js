import $ from "jquery";
import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {MultiObserver} from './multiObserver';

@inject (MultiObserver)
export class MarkerEditModal{

  //marker to be bind
  @bindable item;

  constructor(MultiObserver){
    //subscribe for item properties changed
    this.mo = MultiObserver;
  }

  //adds marker to the mini map
  setUpMarker(){
    if(!this.miniMap)
      return;

    //clean markers if needed
    if(this.markers)
      this.map.removeLayer(this.markers);

    //set up clustering
    this.markers = new L.MarkerClusterGroup();

    //set up center
    this.map.setView(this.item.pos, 13);

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
    if(!this.item){
      return;
    }
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
    if(this.item){
        // subscribe
        this.mo.observe([
          [this.item, 'pos'],
          [this.item, 'color']
        ], () => {
          this.setUpMarker();
        });
      }

    this.initializeMap();
  }

  attached(){
      this.initializeMap();

      let s = this;
      //subscribe for map invalidate
      $(this.modal).on('shown.bs.modal', () => {
        s.invalidateMap();
      });
  }

  invalidateMap(){
    this.map.invalidateSize();
  }
}

//converts array of positions into two values according to index
export class PosValueConverter{

  toView(value, index){
    this.index = index;

    if(!value)
      return undefined;

    return value[index];
  }

  fromView(value, index, array){
    array[index] = parseFloat(value);
    return array;
  }

}
