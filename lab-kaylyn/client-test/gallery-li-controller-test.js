'use strict';

describe('testing gallery-li controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, authService, $httpBackend) => {
      authService.setToken('secrettoken');
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '1234FIVE',
          name: 'mockName',
          desc: 'mockDesc',
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('1234FIVE');
        },
      };

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLiCtrl.deleteDone({galleryData: galleryLiCtrl.gallery});
    });
  });

  it('should call deleteDone with gallery after galleryDelete', () => {
    let url = 'http://localhost:3000/api/gallery/1234FIVE';
    let headers = {
      Authorization: 'Bearer secrettoken',
      Accept: 'application/json, text/plain, */*',
    };

    let mockBindings = {
      gallery: {
        _id: '1234FIVE',
        name: 'mockName',
        desc: 'mockDesc',
        pics: [],
      },
      deleteDone: function(data){
        console.log('HERE. FUQ');
        expect(data.galleryData._id).toEqual('1234FIVE');
      },
    };

    this.$httpBackend.expectDELETE(url, headers).respond(204);

    let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);
    galleryLiCtrl.deleteGallery();

    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });
});
