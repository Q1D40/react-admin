/**
 * TopicListComponent
 */
'use strict';

var React = require('react');

var TopicCell = require('./TopicCell.react');

var TopicList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <TopicCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>医生ID</th>
            <th>描述</th>
            <th>缩略图</th>
            <th>文章URL</th>
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

module.exports = TopicList;
