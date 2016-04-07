/**
 * TnbfoodListComponent
 */
'use strict';

var React = require('react');

var TnbfoodCell = require('./TnbfoodCell.react');

var TnbfoodList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <TnbfoodCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>名称</th>
            <th>图片</th>
            <th>一份量</th>
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

module.exports = TnbfoodList;
