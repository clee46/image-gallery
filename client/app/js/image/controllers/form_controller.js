var angular = require('angular');

module.exports = function(ImageApp) {
  ImageApp.controller('FormController', ['$scope', '$http', 'imageResource', '$location', function($scope, $http, Resource, $location) {
    var imageService = Resource('/images');

    $scope.goHome = function() {
      $location.path('/home');
    }

    $scope.createImage = function(image) {
      imageService.create(image, function(err, res) {
        if (err) {
          return console.log(err);
        }
        $scope.image = null;
        $location.path('/home');
      });
    };

  }]);
}
