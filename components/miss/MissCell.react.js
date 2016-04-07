/**
 * MissCellComponent
 */
'use strict';

var React = require('react');

var MissActions = require('../../actions/MissActions');

var MissCell = React.createClass({

  getInitialState: function() {
    return {del: false};
  },

  componentWillReceiveProps: function() {
    var del = false;
    this.setState({del: del});
  },

  _onDel: function() {
    var del = true;
    this.setState({del: del});
    var data = this.props.data;
    MissActions.del(data);
    return;
  },

  render: function() {
    var trClassName = this.state.del ? "disabled": "";
    var btnClassName = this.state.del ? "ui disabled button": "ui button";
    return (
      <tr className={trClassName}>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.count}</td>
        <td>
          <input className={btnClassName} onClick={this._onDel} type="button" value="删除" />
        </td>
      </tr>
    );
  }

});

module.exports = MissCell;
