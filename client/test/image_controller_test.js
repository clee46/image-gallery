var angular = require('angular');

describe('image controller', () => {

  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('ImageApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to create a Image controller', () => {
    var ImageController = $ControllerConstructor('ImageController', {$scope});
    expect(typeof ImageController).toBe('object');
    expect(Array.isArray($scope.images)).toBe(true);
    expect(typeof $scope.getAllImages).toBe('function');
  });

  describe('REST requests using Image Controller', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ImageController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should make a GET request to /api/images', () => {
      $httpBackend.expectGET('http://localhost:3000/api/images').respond(200, [{imageTitle: 'test Image'}]);
      $scope.getAllImages();
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.images[0].imageTitle).toBe('test Image');
    });
  });
});
