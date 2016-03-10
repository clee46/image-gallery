var angular = require('angular');

describe('resource service', () => {

  var $httpBackend;
  var Resource;
  var testService;

  beforeEach(angular.mock.module('ImageApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, imageResource) {
    $httpBackend = _$httpBackend_;
    Resource = imageResource;
    testService = Resource('/test');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });

  it('should have a resource name', () => {
    expect(testService.resourceName).toBe('/test');
  });

  it('should handle success of the get function', () => {
    var err, res;
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, {name: 'test Image'});
    testService.getAll((_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.name).toBe('test Image');
  });

  it('should handle failure of the get function', () => {
    var err, res;
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'error');
    testService.getAll((_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });

  it('should handle success of the create function', () => {
    var newImage = {imageTitle: 'new Image'};
    var err, res;
    $httpBackend.expectPOST('http://localhost:3000/api/test').respond(200, newImage);
    testService.create(newImage, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.imageTitle).toBe(newImage.imageTitle);
  });

  it('should handle failure of the create function', () => {
    var newImage = {name: 'new Image'};
    var err, res;
    $httpBackend.expectPOST('http://localhost:3000/api/test').respond(404, 'error');
    testService.create(newImage, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });
});
