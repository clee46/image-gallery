var angular = require('angular');

module.exports = function(ImageApp) {
  ImageApp.controller('ImageController', ['$scope', '$http', '$location', 'imageResource', function($scope, $http, $location, Resource) {
    $scope.images = [];
    var imageService = Resource('/images');

    $scope.goForm = function() {
      $location.path('/form');
    }

    $scope.getAllImages = function() {
      imageService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.images = res;
      })
    };
  }]);
}
