/*jslint node: true*/
/*jslint nomen: true*/
"use strict";

var React = require('react');

module.exports = {
  
  callAction: function (value) {
    var obj = {};
    if (this.props.action) {
      if (this.props.dataKey) {
        obj[this.props.dataKey] = value;
        value = obj;
      }
      this.props.action(value);
    }
  },
  
  propTypes: {
    action: React.PropTypes.func.isRequired,
    dataKey: React.PropTypes.string
  }
  
};