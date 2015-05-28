'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('State 1', function () {
  beforeEach(function() {
    browser.get('/');
  });

  it('should render all expected components', function () {
    expect(element.all(by.css('.starter-template h1')).first().getText()).to.eventually.equal('Bootstrap starter template');
    expect(element.all(by.css('.starter-template h2')).first().getText()).to.eventually.equal('Some documentation will come here');
  });
});
