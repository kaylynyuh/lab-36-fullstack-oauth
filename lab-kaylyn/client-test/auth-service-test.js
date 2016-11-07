'use strict';

describe('testing authService', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $q, authService, $window, $httpBackend) => {
      this. $q = $q;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });


  describe('testing #getToken()', () => {
    it('should return a token', () => {
      this.authService.token = 'helloworld token';

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('helloworld token');
      });
      // set a change up, apply the change
      this.$rootScope.$apply();
    });
  });

  describe('testing #getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'helloworld token');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('helloworld token');
      });
      // set a change up, apply the change
      this.$rootScope.$apply();
    });
  });



  describe('testing authService service.signup', () => {
    it('should return a user', () => {
      let user = {
        name: 'userName',
        email: 'userEmail',
        password: 'userPassword',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', user, headers)
      .respond(200, '666');

      this.authService.signup(user);
      this.$httpBackend.flush();
    });
  });

  describe('testing authService service.login', () => {
    it('should authorize a returning user', () => {
      let user = {
        username: 'userName',
        password: 'userPassword',
      };
      let base64 = this.$window.btoa(`${user.username}:${user.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, '666');

      this.authService.login(user)
      .then(token => {
        expect(token).toBe('666');
      });

      this.$httpBackend.flush();
    });
  });
});
