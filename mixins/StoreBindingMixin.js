/*jslint node: true*/
/*jslint nomen: true*/
"use strict";

module.exports = {
  
  componentWillMount: function () {
    var state = {};
    if (typeof this.bindStores === 'function') {
      this._storeBindListeners = [];
      this.bindStores();
      
      this._storeBindListeners.forEach(function (listener) {
        listener.properties.forEach(function (prop) {
          state[prop] = listener.store[prop]();
        });
      });
      this.setState(state);
      
    } else {
      console.warn("vuo-react store binding mixin is used without declaring bindStores");
    }
  },
  
  componentWillUnmount: function () {
    this._storeBindListeners.forEach(function (listener) {
      listener.store.removeChangeListener(listener.callback);
    });
  },
  
  bindStore: function (store, properties) {
    var self = this;
    
    if (!(properties instanceof Array)) {
      properties = [properties];
    }

    function onChange(payload) {
      var state = {};
      properties.forEach(function (name) {
        if (payload[name] !== undefined) {
          state[name] = payload[name];
        }
      });
      self.setState(state);
    }
    
    store.onChange(onChange);
    this._storeBindListeners.push({
      store: store,
      properties: properties,
      callback: onChange
    });
  }
  
};