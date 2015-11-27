'use strict';

describe('Service: bars', function () {

  // instantiate service
  var bars,
    init = function () {
      inject(function (_bars_) {
        bars = _bars_;
      });
    };

  // load the service's module
  beforeEach(module('graphApp'));

  it('should do something', function () {
    init();

    expect(!!bars).toBe(true);
  });

  it('should be configurable', function () {
    module(function (barsProvider) {
      barsProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(bars.greet()).toEqual('Lorem ipsum');
  });

});
