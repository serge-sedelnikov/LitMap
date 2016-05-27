import {inject} from "aurelia-framework";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from "aurelia-event-aggregator";
import $ from "jquery";
import _ from "lodash";

Array.prototype.insert = (index, item) => {
  this.splice(index, 0, item);
};

@inject(HttpClient, EventAggregator)
export class Admin{

  constructor(http, ea){
    this.http = http;
    this.ea = ea;
    this.subscriptions = [];
  }

  //executes on activate
  activate(){

    //subscribe for events
    this.subscriptions.push(this.ea.subscribe('admin-marker-edit', (item)=>{
      this.editMarker(item);
    }));
    this.subscriptions.push(this.ea.subscribe('admin-marker-saved', (item)=>{
      this.markerSaved(item);
    }));

    let p1 = this.fetchIndex();
    return p1.then((infos)=>{
      //get the most interesting this week
      //meaning get last 8 articles
      this.markers = _.reverse(infos);
    });
  }

  //on page detached
  detached(){
    //unsubscribe from event aggregators
    _.forEach(this.subscriptions, (s)=>{
      s.dispose();
    });
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
            return infos;
          });
  }

  //edits the marker
  editMarker(marker){
    //make a copy of the marker
    let newObject = jQuery.extend({}, marker);
    this.currentMarker = newObject;
    $(this.editModal).find('.modal').modal();
  }

  //user clicked to save marker and uploaded files
  markerSaved(item){
    //add or replace merker in markers
    let originalMarker = _.find(this.markers, (m)=>{
      return m.data == item.data;
    });
    //if found, replace it with new
    if(originalMarker){
      let originalIndex = _.indexOf(this.markers, originalMarker);
      this.markers.splice(originalIndex, 0, item);
      // this.markers.insert(originalIndex, item);
      _.pull(this.markers, originalMarker);
    }

    //save markers json to index.json

    //reload the page
  }
}
