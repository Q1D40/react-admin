/**
 * RecommendErrComponent
 */
'use strict';

var React = require('react');

var RecommendStore = require('../../stores/RecommendStore');

function getRecommendErrState() {
  var err = RecommendStore.err();
  if (!err) err = {};
  return {
    err: err
  };
}

var RecommendErr = React.createClass({

  getInitialState: function() {
    return {err: {}};
  },

  componentDidMount: function() {
    RecommendStore.addErrListener(this._onErr);
  },

  componentWillUnmount: function() {
    RecommendStore.removeErrListener(this._onErr);
  },

  _onErr: function() {
    this.setState(getRecommendErrState());
  },

  _onClose: function() {
    this.setState({err: {}});
  },

  render: function() {
    var title = this.state.err.title ? this.state.err.title : '';
    var list = '';
    if (this.state.err.list) {
      list = this.state.err.list.map(function (row, key) {
        return (
          <li key={key}>{row}</li>
        );
      });
    }
    var msgClassName = this.state.err.list ? "ui error message": "ui error hidden message";
    return (
      <div className={msgClassName}>
        <i className="close icon" onClick={this._onClose}></i>
        <div className="header">{title}</div>
        <ul className="list">
          {list}
        </ul>
      </div>
    );
  }

});

module.exports = RecommendErr;
