var angular = require('angular');

describe('form controller', () => {

  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('ImageApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to create a Form controller', () => {
    var FormController = $ControllerConstructor('FormController', {$scope});
    expect(typeof FormController).toBe('object');
    expect(typeof $scope.createImage).toBe('function');
  });

  describe('REST requests using Form Controller', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('FormController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should make a POST request to /api/images', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/images', {imageTitle: 'sent Image'}).respond(200, {imageTitle: 'response Image'});
      $scope.newImage = {imageTitle: 'new Image'};
      $scope.createImage({imageTitle: 'sent Image'});
      $httpBackend.flush();
      expect(typeof $scope.createImage).toBe('function');
    });
  });
});
