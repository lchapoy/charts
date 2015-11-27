'use strict';

describe('Controller: BarsgraphCtrl', function () {

  // load the controller's module
  beforeEach(module('graphApp'));

  var BarsgraphCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BarsgraphCtrl = $controller('BarsgraphCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BarsgraphCtrl.awesomeThings.length).toBe(3);
  });
});
