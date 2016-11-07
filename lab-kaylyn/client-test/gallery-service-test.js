'use strict';

describe('testing galleryService', function(){

  // beforeEach mocks the demoApp module
  //            mocks the service

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, galleryService, $httpBackend) => {
      this.authService = authService;
      authService.setToken('1234');

      this.$window = $window;

      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing galleryService.createGallery', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'exampleDesc',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte',  name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it('should successfully delete a gallery', () => {
      // mock the request
      let galleryID = 'helloworld';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json, text/plain, */*',
      };
      // mock the server route
      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);
      // make the reuset
      this.galleryService.deleteGallery(galleryID);
      // flush the server mock
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.upDateGallery(galleryID)', () => {
    it('should successfully update a gallery', () => {
      let galleryID = 'helloworld';
      let galleryData = {
        name: 'updatedName',
        desc: 'updatedDesc',
      };
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };
      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/helloworld', galleryData, headers)
      .respond(200, {_id: 'helloworld', name: 'updatedName', desc: 'updatedDesc', pics: []});

      this.galleryService.updateGallery(galleryID, galleryData)
      .then( gallery => {
        expect(gallery._id).toBe(galleryID);
        expect(gallery.name).toBe(galleryData.name);
        expect(gallery.desc).toBe(galleryData.desc);
      });

      this.$httpBackend.flush();

    });
  });

  describe('testing galleryService.fetchGalleries', () => {
    it('should successfully fetch a gallery', () => {
      let galleriesArray =[
        {
          name: 'gallery1',
          desc: 'desc1',
        },
        {
          name: 'gallery2',
          desc: 'desc2',
        },
      ];
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };
      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=dsc', headers)
      .respond(200, galleriesArray);

      this.galleryService.fetchGalleries()
      .then(galleries => {
        expect(galleries.length).toEqual(2);
        expect(galleries[0]).toEqual({name: 'gallery1', desc: 'desc1'});
      });

      this.$httpBackend.flush();

    });
  });

});
