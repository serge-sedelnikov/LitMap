import _ from "lodash";

export class Map{

  constructor(){
    this.self = this;
    self.points = [{
      pos: [57.153525, 65.514422],
      color: "#295EF0",
      marker: 'park'
    },
    {
      pos: [57.145169, 65.577218],
      color: "#FCEE28",
      marker: 'park2'
    },
    {
      pos: [57.148405, 65.567143],
      color: "#FCEE28",
      marker: 'monument'
    },
    {
      pos: [57.133828, 65.550730],
      color: "#FCEE28",
      marker: 'building'
    },
    {
      pos: [57.144173, 65.526712],
      color: "#FCEE28",
      marker: 'theatre'
    },
    {
      pos: [57.134690, 65.561341],
      color: "#F030B6",
      marker: 'building'
    }]
  }

  attached(){
    //initialize map access
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';
    self.map = L.mapbox
        .map('map', 'mapbox.streets')
        .setView([57.15000, 65.53333], 12);

    //set up clustering
    var markers = new L.MarkerClusterGroup();
    _.forEach(self.points, a=>{
        var title = a[2];
        var marker = L.marker(new L.LatLng(a.pos[0], a.pos[1]), {
            icon: L.mapbox.marker.icon({'marker-symbol': a.marker, 'marker-color': a.color}),
            title: 'index'
        });
        marker.bindPopup(title);
        markers.addLayer(marker);
    });

    self.map.addLayer(markers);
  }

}
