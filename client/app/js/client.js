const angular = require('angular');
require('angular-route');
const ImageApp = angular.module('ImageApp', ['ngRoute']);
require('./services')(ImageApp);
require('./image/controllers')(ImageApp);


ImageApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'ImageController',
      templateUrl: '/views/images_view.html'
    })
    .when('/form', {
      controller: 'FormController',
      templateUrl: '/views/image_form.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
