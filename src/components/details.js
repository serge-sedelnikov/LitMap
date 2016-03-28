import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import m from 'markdown';
import {I18N} from 'aurelia-i18n';
import $ from 'jquery';

@inject(I18N, HttpClient)
export class Details{

    //constructor
    constructor(i18n, http){
      this.http = http;
      this.i18n = i18n;
      this.data = '';
    }

    //on activate, get link to the param
    activate(params){
      this.link = params.data;

      //start fetching data about user
      return this.fetchData(this.link);
    }

    //fetching data about given link
    fetchData(link){
      return this.http.fetch('data/full/' + link + '.md')
      .then(response=>{
        return response.text();
      })
      .then(data=>{
        let html = m.markdown.toHTML(data);
        this.data = html;
      });
    }

    dataChanged(newValue, oldValue){
      console.log('data changed');
      $('img').addClass('img-responsive')
    }
}
