import {inject} from "aurelia-framework";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Admin{

  constructor(http){
    this.http = http;
  }

  //executes on activate
  activate(){
    let p1 = this.fetchIndex();
    p1.then((infos)=>{
      //get the most interesting this week
      //meaning get last 8 articles
      this.markers = infos;
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

}
