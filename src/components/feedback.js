
export class Feedback{

  //on activate, initialize comments for general project feedback
  activate(){
    this.initializeComments('lit_map_general_feedback');
  }

  //initialize comments section
  initializeComments(link){
    window.cackle_widget =  [];
    window.cackle_widget.push(
      {
        widget: 'Comment',
        id: 43259,
        channel: link
      });
      Cackle.bootstrap(true);
  }
}
