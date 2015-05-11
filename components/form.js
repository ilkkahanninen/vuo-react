/*jslint node: true*/
/*jslint nomen: true*/
"use strict";

var
  React = require('react'),
  ActionBindingMixin = require('../mixins/ActionBindingMixin'),
  serialize = require('form-serialize');

module.exports = React.createClass({
  mixins: [ActionBindingMixin],
  
  render: function () {
    return React.createElement("form", React.__spread({}, this.props, {onSubmit: this.onSubmit}), this.props.children);
  },
  
  onSubmit: function (event) {
    event.preventDefault();
    this.callAction(serialize(event.target, {
      hash: !this.props.urlEncoding
    }));
  }
});