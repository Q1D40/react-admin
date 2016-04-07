/**
 * KnowledgeComponent
 */
'use strict';

var React = require('react');
var Link = require('react-router').Link;
var DocumentTitle = require("react-document-title");

var KnowledgeStore = require('../../stores/KnowledgeStore');
var KnowledgeActions = require('../../actions/KnowledgeActions');

var KnowledgeList = require('./KnowledgeList.react');
var KnowledgeErr = require('./KnowledgeErr.react');

function getKnowledgeState() {
  var data = KnowledgeStore.all();
  if (!data) data = [];
  return {
    allKnowledge: data
  };
}

function initKnowledgeState() {
  var data = KnowledgeActions.all();
  if (!data) data = [];
  return {
    allKnowledge: data
  };
}

var Knowledge = React.createClass({

  getInitialState: function() {
    return initKnowledgeState();
  },

  componentDidMount: function() {
    KnowledgeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    KnowledgeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getKnowledgeState());
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
      <DocumentTitle title='知识文章 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular book icon" onClick={this._clickToplogo}></i> 知识文章 </h2>
          <KnowledgeErr/>
          <Link to="/knowledge/add" className="ui secondary button" type="button">+添加知识</Link>
          <p></p>
          <KnowledgeList data={this.state.allKnowledge} />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Knowledge;
