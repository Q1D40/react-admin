/**
 * DatemissListComponent
 */
'use strict';

var React = require('react');

var DatemissCell = require('./DatemissCell.react');

var DatemissList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <DatemissCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>日期</th>
            <th>查询次数</th>
            <th>未命中</th>
            <th>命中率</th>
          </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
      </table>
    );
  }

});

module.exports = DatemissList;
