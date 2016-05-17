import $ from "jquery";
import {bindable} from "aurelia-framework";
import {ObserverLocator, inject} from 'aurelia-framework';

@inject (ObserverLocator)
export class MarkerEditModal{

  //marker to be bind
  @bindable item;

  constructor(ObserverLocator){
    //subscribe for item properties changed
    this.ol = ObserverLocator;
  }

  //reset the marker on item property changed
  onItemColorChange(newValue, oldValue){
    console.log(this);
      this.setUpMarker();
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

        // Disable drag and zoom handlers.
        // this.map.dragging.disable();
        // this.map.touchZoom.disable();
        // this.map.doubleClickZoom.disable();
        // this.map.scrollWheelZoom.disable();
        // this.map.keyboard.disable();

        // Disable tap handler, if present.
        // if (this.map.tap)
        //   this.map.tap.disable();
      }

      this.map.setView(this.item.pos, 16);
      this.setUpMarker();
    }

  itemChanged(){
    if(this.subscription)
      this.subscription.unsubscribe();

    if(this.item)
        this.subscription = this.ol.getObserver(this.item, 'color')
          .subscribe((o,n)=>{
            this.onItemColorChange(o,n);
          });

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

  activate(){
    console.log("123");
  }
}
