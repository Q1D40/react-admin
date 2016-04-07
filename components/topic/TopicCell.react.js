/**
 * TopicCellComponent
 */
'use strict';

var React = require('react');

var TopicActions = require('../../actions/TopicActions');

var TopicCell = React.createClass({

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
    TopicActions.del(data);
    return;
  },

  render: function() {
    var trClassName = this.state.del ? "disabled": "";
    var btnClassName = this.state.del ? "ui disabled button": "ui button";
    return (
      <tr className={trClassName}>
        <td>{this.props.data.doctorId}</td>
        <td>{this.props.data.description}</td>
        <td><img className="ui tiny image" src={this.props.data.thumb} /></td>
        <td>{this.props.data.url}</td>
        <td>
          <input className={btnClassName} onClick={this._onDel} type="button" value="删除" />
        </td>
      </tr>
    );
  }

});

module.exports = TopicCell;
