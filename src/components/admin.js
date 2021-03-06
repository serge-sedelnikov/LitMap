import {inject} from "aurelia-framework";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from "aurelia-event-aggregator";
import $ from "jquery";
import _ from "lodash";

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
    this.subscriptions.push(this.ea.subscribe('admin-marker-delete', (item)=>{
      this.markerDelete(item);
    }));

    return this.refreshIndex();
  }

  //on page detached
  detached(){
    //unsubscribe from event aggregators
    _.forEach(this.subscriptions, (s)=>{
      s.dispose();
    });
  }

  //refreshes the index data
  refreshIndex(){
    let p1 = this.fetchIndex();
    return p1.then((infos)=>{
      //get the most interesting this week
      //meaning get last 8 articles
      this.markers = _.reverse(infos);
    });
  }

  //fetching index file and show data on screen
  fetchIndex(){
    return this.http.fetch('data/index.json?t=' + new Date().getTime())
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

  //adds new marker to the markers
  addMarker(){
    this.currentMarker = {
      marker: '',
      pos: [57.180707,65.517749],
      color: '#EF6C00',
      data: 'название файла'
    };
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
      //marker updated
      let originalIndex = _.indexOf(this.markers, originalMarker);
      this.markers.splice(originalIndex, 0, item);
      _.pull(this.markers, originalMarker);
    }
    else{
      //new marker added
      this.markers.splice(0, 0, item);
    }
  }

  //delete marker from the marker list
  markerDelete(item){
    //add or replace merker in markers
    let originalMarker = _.find(this.markers, (m)=>{
      return m.data == item.data;
    });
    //if found, replace it with new
    if(originalMarker){
      //marker updated
      let originalIndex = _.indexOf(this.markers, originalMarker);
      _.pull(this.markers, originalMarker);
    }
  }

  //upload file
  uploadFile(data){
    if(!data)
      return null;

    let formData = new FormData();
    formData.append('data', data);
    formData.append('targetFileName', "index.json");

    return this.http.fetch('textupload.php', {
      method: 'POST',
      body: formData
    });
  }

  //saves the index file into the server
  saveIndex(){
    //get json text from markers
    var jsonData = JSON.stringify(this.markers);
    this.uploadFile(jsonData);
  }
}
