/**
 * KnowledgeCellComponent
 */
'use strict';

var React = require('react');
var Link = require('react-router').Link;

var KnowledgeActions = require('../../actions/KnowledgeActions');

var KnowledgeCell = React.createClass({

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
    KnowledgeActions.del(data);
    return;
  },

  render: function() {
    var trClassName = this.state.del ? "disabled": "";
    var btnClassName = this.state.del ? "ui disabled button": "ui button";
    var lkEdit = "/knowledge/edit/" + this.props.data.id;
    var type = this.props.typeDict[this.props.data.type];
    var dUrl = "knowledge/detail?id=" + this.props.data.id;
    return (
      <tr className={trClassName}>
        <td>{this.props.data.id}</td>
        <td>{type}</td>
        <td>{this.props.data.author}</td>
        <td>{this.props.data.title}</td>
        <td>
          <Link to={lkEdit} className="ui button" type="button">修改</Link>
          <input className={btnClassName} onClick={this._onDel} type="button" value="删除" />
          <a className="ui button" type="button" href={dUrl} target="_blank">预览</a>
        </td>
      </tr>
    );
  }

});

module.exports = KnowledgeCell;
