'use strict';

module.exports = {
  template: require('./gallery.html'),
  controller: ['$log', 'galleryService', GalleryController],
  controllerAs: 'galleryCtrl',
};

function GalleryController($log, galleryService){
  $log.debug('init GalleryController');

  this.gallery = {};

  this.createGallery = function(){
    galleryService.createGallery(this.gallery)
    .then( () => {
      // upon success, reset the form
      // clear the inputs after they have been assigned values via ng-model from gallery.html
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
}
