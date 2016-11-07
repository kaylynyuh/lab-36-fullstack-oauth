'use strict';

describe('testing create-gallery-controller', function() {

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $httpBackend, $componentController, authService) => {
      authService.setToken('1234');

      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing component controller', () => {
    let url = 'http://localhost:3000/api/gallery';
    let gallery = {
      name: 'mockName',
      desc: 'mockDesc',
    };
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer 1234`,
    };

    this.$httpBackend.expectPOST(url, gallery, headers)
    .respond(200);

    let galleryCtrl = this.$componentController('gallery');

    galleryCtrl.gallery = {name: 'mockName', desc: 'mockDesc'};

    galleryCtrl.createGallery();

    this.$httpBackend.flush();

    expect(galleryCtrl.gallery.name).toEqual(null);
    expect(galleryCtrl.gallery.desc).toEqual(null);
    this.$rootScope.$apply();
  });
});
