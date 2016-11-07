'use strict';

// inject authService to get the tokens in order to make authenticated requests
module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery()');
    //set up url and config then make request
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`; // going to make a POST req to this url
      let config = {
        headers: {
          Accept: 'application/json', // what is being sent back from server
          'Content-Type': 'application/json', // what is being sent to the server
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config); // returns a Promise
    })
    .then( res => {
      $log.log('create gallery success');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery; // returning something in a Promise automatically resolves the value being return
    })
    .catch( err => {
      $log.error(err.message); // pass error to next catch block
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID){
    $log.debug('galleryService.deleteGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then( () => {
      for(var i = 0; i < service.galleries.length; i++){
        if(galleryID === service.galleries[i]._id){
          service.galleries.splice(i, 1);
        }
      }
      return service.galleries;
    })
    .catch( err => {
      $log.err(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, gallery){
    $log.debug('galleryService.updateGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, gallery, config);
    })
    .then( res => {
      let gallery = res.data;
      for(var i = 0; i < service.galleries.length; i++){
        if(galleryID === service.galleries[i]._id){
          service.galleries[i] = gallery;
        }
      }
      return gallery;
    })
    .catch( err => {
      $log.err(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/?sort=dsc`; // going to make a POST req to this url
      let config = {
        headers: {
          Accept: 'application/json', // what is being sent back from server
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then(res => {
      $log.log('fetch user galleries successful');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
