/*jslint node: true*/
/*jslint nomen: true*/
"use strict";

var
  React = require('react'),
  ActionBindingMixin = require('../mixins/ActionBindingMixin');

module.exports = React.createClass({
  mixins: [ActionBindingMixin],
  
  render: function () {
    return React.createElement("form", React.__spread({}, this.props, {onSubmit: this.onSubmit}), this.props.children);
  },
  
  onSubmit: function (event) {
    this.callAction(event.target.value);
  }
});