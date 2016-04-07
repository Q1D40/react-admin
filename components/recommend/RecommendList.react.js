/**
 * RecommendListComponent
 */
'use strict';

var React = require('react');

var RecommendCell = require('./RecommendCell.react');

var RecommendList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <RecommendCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>描述</th>
            <th>key</th>
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

module.exports = RecommendList;
