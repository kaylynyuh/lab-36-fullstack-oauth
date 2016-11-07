'use strict';

describe('testing edit-gallery controller', function(){

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

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'mockName',
        desc: 'mockDesc',
      },
    };
    // mock the gallery
    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    console.log('editGalleryCtrl', editGalleryCtrl);
    expect(editGalleryCtrl.gallery.name).toEqual('mockName');
    expect(editGalleryCtrl.gallery.desc).toEqual('mockDesc');
    this.$rootScope.$apply();
  });

  describe('testing #updateGallery', () => {

    it('should make a valid PUT request', () => {
      let url = 'http://localhost:3000/api/gallery/12345';
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer 1234`,
      };
      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'newName', desc: 'mockDesc'}, headers)
      .respond(200);

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'mockName',
          desc: 'mockDesc',
        },
      };
      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'newName';

      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
