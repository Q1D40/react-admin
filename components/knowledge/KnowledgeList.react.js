/**
 * KnowledgeListComponent
 */
'use strict';

var React = require('react');

var KnowledgetypeActions = require('../../actions/KnowledgetypeActions');
var KnowledgetypeStore = require('../../stores/KnowledgetypeStore');
var KnowledgeCell = require('./KnowledgeCell.react');

function getKnowledgetypeState() {
  var data = KnowledgetypeStore.all();
  if (!data) data = [];
  return {
    allKnowledgetype: data
  };
}

function initKnowledgetypeState() {
  var data = KnowledgetypeActions.all();
  if (!data) data = [];
  return {
    allKnowledgetype: data
  };
}

var KnowledgeList = React.createClass({

  getInitialState: function() {
    return initKnowledgetypeState();
  },

  componentDidMount: function() {
    KnowledgetypeStore.addChangeListener(this._onTypeChange);
  },

  componentWillUnmount: function() {
    KnowledgetypeStore.removeChangeListener(this._onTypeChange);
  },

  _onTypeChange: function() {
    this.setState(getKnowledgetypeState());
  },

  render: function() {
    var type = this.state.allKnowledgetype;
    var typeDict = {};
    for (var key in type) {
      typeDict[type[key].id] = type[key].name;
    }
    var list = this.props.data.map(function (row, key) {
      return (
        <KnowledgeCell data={row} typeDict={typeDict} key={key} />
      );
    });
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>ID</th>
            <th>分类</th>
            <th>作者</th>
            <th>标题</th>
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

module.exports = KnowledgeList;
