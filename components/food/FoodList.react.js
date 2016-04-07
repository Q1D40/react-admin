/**
 * FoodListComponent
 */
'use strict';

var React = require('react');

var FoodCell = require('./FoodCell.react');

var FoodList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <FoodCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>名称</th>
            <th>标签</th>
            <th>图片</th>
            <th>胆固醇含量</th>
            <th>脂肪含量</th>
            <th>胆固醇偏高人群</th>
            <th>高血脂人群</th>
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

module.exports = FoodList;
