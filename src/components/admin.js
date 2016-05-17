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
  }

  //executes on activate
  activate(){

    //subscribe for events
    this.subscription = this.ea.subscribe('admin-marker-edit', (item)=>{
      this.editMarker(item);
    });

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
    this.subscription.dispose();
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
    this.currentMarker = marker;
    $(this.editModal).find('.modal').modal();
  }

}
