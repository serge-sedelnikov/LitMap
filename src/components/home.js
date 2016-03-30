import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';
import Bricks from 'bricks.js';

@inject(I18N, HttpClient, Element)
export class Home{

  //constructor
  constructor(I18N, HttpClient, Element){
    this.http = HttpClient;
    this.i18n = I18N;
    this.element = Element;
    this.infos = [];
  }

  //executes on activate
  activate(){
    return this.fetchIndex();
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

        //filter for closest by 10km distance
        this.infos = infos;

      });
  }

  //on DOM attached
  attached(){
    const sizes = [
            { columns: 4, gutter: 15 },
          ];
    let br = Bricks({
          container: '#wall-container',
          packed: 'data-info',
          sizes: sizes
        });

    br.pack();
    br.resize(true);
  }
}
