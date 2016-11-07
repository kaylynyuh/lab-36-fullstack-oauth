'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];
// ng file upload gives us the ability to do multipart header uploads

function picService($q, $log, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      });
    })
    //upon successful request
    .then(res => {
      galleryData.pics.unshift(res.data);
      console.log('res.data', res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleryPic = function(galleryData, picData){
    $log.debug('picService.deleteGalleryPic()');

    return authService.getToken()
    .then (token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('delete pic successful');
      console.log('GALLERY DATA', galleryData);
      for(var i = 0;  i < galleryData.pics.length; i++){
        if(galleryData.pics[i]._id === picData._id){
          galleryData.pics.splice(i, 1);
        }
      }
      return;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
