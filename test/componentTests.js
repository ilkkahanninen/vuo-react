/*jslint node: true*/
/*global describe, it, document, window, afterEach*/
"use strict";

var
  jsdom = require("jsdom"),
  assert = require("assert"),
    
  React = require("react/addons"),
  TestUtils = React.addons.TestUtils,
    
  Dispatcher = require("vuo").Dispatcher,
  TestActions = require("vuo").ActionCreator.create("Test").action("setValue").publicAPI(),
  TestStore = require("vuo").Store.create({
    
    state: function (define) {
      define("value");
    },
    
    listeners: function (on, setState) {
      on(TestActions.SET_VALUE, function (payload) {
        setState({value: payload.value});
      });
    }    
    
  }),
  
  listenerID;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;



describe("Input", function () {

  afterEach(function () {
    try { Dispatcher.unregister(listenerID); } catch(e) {}
  });

  it("input field calls action when it is changed", function (done) {
    var
      Input = require('../components/input'),
      component = TestUtils.renderIntoDocument(React.createElement(Input, {action: TestActions.setValue}));
    
    function testPayload(payload) {
    }
    
    listenerID = Dispatcher.register(function (payload) {
      assert.equal(payload.type, TestActions.SET_VALUE);
      assert.equal(payload.value, "Test 1");
      done();
    });
    
    TestUtils.Simulate.change(React.findDOMNode(component), {target: {value: "Test 1"}});
  });

  it("form calls action when it submitted", function (done) {
    var
      Form = require('../components/form'),
      component = TestUtils.renderIntoDocument(
        React.createElement(Form, {action: TestActions.setValue}, [
          React.createElement('input', {key: 'a', name: 'name', defaultValue: 'Dolan'}),
          React.createElement('input', {key: 'b', name: 'password', defaultValue: 'secret123'}),
          React.createElement('input', {key: 'c', type: 'submit', className: 'submit'})
        ]));
    
    listenerID = Dispatcher.register(function (payload) {
      assert.equal(payload.type, TestActions.SET_VALUE);
      assert(payload.value.name, 'Dolan');
      assert(payload.value.password, 'secret123');
      done();
    });
    
    TestUtils.Simulate.submit(React.findDOMNode(component));
  });

  it("updates itself when store changes", function () {
    TestActions.setValue("initial");
    
    var
      StoreBindingMixin = require('../mixins/StoreBindingMixin'),
        
      ListeningDiv = React.createClass({
        mixins: [StoreBindingMixin],
        render: function () {
          return React.createElement('div', {});
        },
        bindStores: function () {
          this.bindStore(TestStore, "value");
        }
      }),
        
      component = TestUtils.renderIntoDocument(React.createElement(ListeningDiv, {
        action: TestActions.setValue
      }));
    
    assert.equal(component.state.value, "initial");
    TestActions.setValue("Test 2");
    assert.equal(component.state.value, "Test 2");
  });
});