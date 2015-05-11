/*jslint node: true*/
/*global describe, it, document, window*/
"use strict";

var
  assert = require("assert");

describe("Entry file", function () {
  it("has everything set up", function () {
    var VuoReact = require('..');
    
    assert(typeof VuoReact.mixins.BindStore, 'object');
    assert(typeof VuoReact.mixins.BindAction, 'object');
    assert(typeof VuoReact.mixins.Input, 'object');
    assert(typeof VuoReact.mixins.Form, 'object');
  });
});