/**
 * KnowledgetypeListComponent
 */
'use strict';

var React = require('react');

var KnowledgetypeCell = require('./KnowledgetypeCell.react');

var KnowledgetypeList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <KnowledgetypeCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>类别</th>
            <th>名称</th>
            <th>副标题</th>
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

module.exports = KnowledgetypeList;
