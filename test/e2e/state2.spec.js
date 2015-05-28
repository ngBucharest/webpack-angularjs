'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('State 1', function () {
  beforeEach(function() {
    browser.get('/state2');
  });

  it('should render all expected components', function () {
    expect(element.all(by.css('.starter-template-alt h1')).first().getText()).to.eventually.equal('Another state');
    expect(element.all(by.css('.starter-template-alt p.lead')).first().getText()).to.eventually.equal('Some new information here.');
  });
});
