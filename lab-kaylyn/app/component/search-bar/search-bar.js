'use strict';

module.exports = {
  template: require('./search-bar.html'),
  controllerAs: 'searchBarCtrl',
  bindings: {
    searchTerm: '=',
  },
};
