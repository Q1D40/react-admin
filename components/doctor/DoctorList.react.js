/**
 * DoctorListComponent
 */
'use strict';

var React = require('react');

var DoctorCell = require('./DoctorCell.react');

var DoctorList = React.createClass({

  render: function() {
    var list = this.props.data.map(function (row, key) {
      return (
        <DoctorCell data={row} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>头像</th>
            <th>简介</th>
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

module.exports = DoctorList;
