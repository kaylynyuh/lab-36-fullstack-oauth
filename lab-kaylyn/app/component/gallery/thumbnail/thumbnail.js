'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function ThumbnailController($log, picService){
  $log.debug('init ThumbnailController');

  this.deletePic = function(){
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(this.gallery, this.pic)
    .then( () => {
      $log.debug('deleteDone');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
}
