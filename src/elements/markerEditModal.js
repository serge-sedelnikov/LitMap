import $ from "jquery";
import {bindable} from "aurelia-framework";

export class MarkerEditModal{

  //marker to be bind
  @bindable item;

  //show the modal
  show(){
    $(this.modal).modal();
  }
}
