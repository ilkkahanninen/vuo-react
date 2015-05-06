/*jslint node: true*/
/*jslint nomen: true*/
"use strict";

var
  React = require('react'),
  ActionBindingMixin = require('../mixins/ActionBindingMixin');

module.exports = React.createClass({
  mixins: [ActionBindingMixin],
  
  render: function () {
    return React.createElement("input", React.__spread({}, this.props, {onChange: this.onChange}));
  },
  
  onChange: function (event) {
    this.callAction(event.target.value);
  }
});