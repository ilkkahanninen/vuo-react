/*jslint node: true*/
/*global describe, it*/
"use strict";

var
  React = require("react/addons"),
  TestUtils = React.addons.TestUtils,
  Dispatcher = require("vuo").Dispatcher,
  TestActions = require("vuo").ActionCreator.create("Test").action("setValue").publicAPI();

describe("Input", function () {
  it("is", function (done) {
    var
      Input = require('../components/input'),
      rendered = TestUtils.renderIntoDocument(React.createElement(Input, {action: TestActions.setValue}));
    
    Dispatcher.register(done);
    
    TestActions.setValue(123);
    
  });
});