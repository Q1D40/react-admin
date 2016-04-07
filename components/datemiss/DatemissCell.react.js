/**
 * DatemissCellComponent
 */
'use strict';

var React = require('react');

var DatemissCell = React.createClass({

  render: function() {
    var hitRate = (this.props.data.all - this.props.data.miss) / this.props.data.all * 100;
    hitRate = hitRate.toFixed(2);
    return (
      <tr>
        <td>{this.props.data.date}</td>
        <td>{this.props.data.all}</td>
        <td>{this.props.data.miss}</td>
        <td>{hitRate}%</td>
      </tr>
    );
  }

});

module.exports = DatemissCell;
