'use strict';

describe('Service: authInterce', function () {

  // load the service's module
  beforeEach(module('jwtApp'));

  // instantiate service
  var authInterce;
  beforeEach(inject(function (_authInterce_) {
    authInterce = _authInterce_;
  }));

  it('should do something', function () {
    expect(!!authInterce).toBe(true);
  });

});
