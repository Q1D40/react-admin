/**
 * MissListComponent
 */
'use strict';

var React = require('react');

var MissCell = require('./MissCell.react');

var MissList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <MissCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>名称</th>
            <th>次数</th>
            <th></th>
          </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
      </table>
    );
  }

});

module.exports = MissList;
