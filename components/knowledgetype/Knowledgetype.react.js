/**
 * KnowledgetypeComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var KnowledgetypeStore = require('../../stores/KnowledgetypeStore');
var KnowledgetypeActions = require('../../actions/KnowledgetypeActions');

var KnowledgetypeList = require('./KnowledgetypeList.react');
var KnowledgetypeAdd = require('./KnowledgetypeAdd.react');

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

var Knowledgetype = React.createClass({

  getInitialState: function() {
    return initKnowledgetypeState();
  },

  componentDidMount: function() {
    KnowledgetypeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    KnowledgetypeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getKnowledgetypeState());
  },

  _clickToplogo: function() {
    var tranArr = ['flash', 'shake', 'tada', 'jiggle', 'bounce'];
    var i = Math.floor(Math.random() * 5);
    var tran = tranArr[i];
    $('.maincpt')
      .transition(tran)
    ;
  },

  render: function() {
    return (
      <DocumentTitle title='知识分类 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular grid layout icon" onClick={this._clickToplogo}></i> 知识分类 </h2>
          <KnowledgetypeAdd/>
          <p></p>
          <KnowledgetypeList data={this.state.allKnowledgetype} />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Knowledgetype;
