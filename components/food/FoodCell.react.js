/**
 * FoodCellComponent
 */
'use strict';

var React = require('react');

var FoodActions = require('../../actions/FoodActions');

var FoodTag = require('./FoodTag.react');

var FoodCell = React.createClass({

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
    FoodActions.del(data);
    return;
  },

  render: function() {
    var trClassName = this.state.del ? "disabled": "";
    var btnClassName = this.state.del ? "ui disabled button": "ui button";
    return (
      <tr className={trClassName}>
        <td>{this.props.data.name}</td>
        <td>
          <FoodTag data={this.props.data}/>
        </td>
        <td><img className="ui tiny image" src={this.props.data.img} /></td>
        <td>{this.props.data.cCT}</td>
        <td>{this.props.data.fCT}</td>
        <td>{this.props.data.cHP}</td>
        <td>{this.props.data.hHP}</td>
        <td>
          <input className={btnClassName} onClick={this._onDel} type="button" value="删除" />
        </td>
      </tr>
    );
  }

});

module.exports = FoodCell;
