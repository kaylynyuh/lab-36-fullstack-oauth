'use strict';

'use strict';

describe('testing signup-controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $location, $httpBackend, $componentController, authService) => {
      authService.setToken('1234');

      this.$location = $location;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing signup controller', () => {
    let user = {
      username: 'mockUserName',
      email: 'mockEmail',
      password: 'mockPassword',
    };
    let url = 'http://localhost:3000/api/signup';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.$httpBackend.expectPOST(url, user, headers)
    .respond(200, {_id: '1234FIVE', username: 'mockUserName', email: 'mockEmail', password: 'mockPassword'});

    let signupCtrl = this.$componentController('signup');

    signupCtrl.signup(user);

    this.$httpBackend.flush();

    expect(this.$location.path()).toBe('/home');

    this.$rootScope.$apply();
  });
});
