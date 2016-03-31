class MediaAdjuster{
  //adjusts media in thumbnails of the markers.
  adjustMedia(html){
    //adjust images
    let thumbs = $('<div>' + html + '</div>');
    thumbs.find('img').addClass('img-responsive img-thumbnail');
    //adjust video
    thumbs.find('iframe').addClass('embed-responsive-item iframe-thumbnail');
    //wrap it into responsive div
    thumbs.find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');

    return thumbs.html();
  }
}

export default new MediaAdjuster();
