/**
 * TopicComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var TopicStore = require('../../stores/TopicStore');
var TopicActions = require('../../actions/TopicActions');

var TopicList = require('./TopicList.react');
var TopicAdd = require('./TopicAdd.react');

function getTopicState() {
  var data = TopicStore.all();
  if (!data) data = [];
  return {
    allTopic: data
  };
}

function initTopicState() {
  var data = TopicActions.all();
  if (!data) data = [];
  return {
    allTopic: data
  };
}

var Topic = React.createClass({

  getInitialState: function() {
    return initTopicState();
  },

  componentDidMount: function() {
    TopicStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TopicStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getTopicState());
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
      <DocumentTitle title='文章 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular wechat icon" onClick={this._clickToplogo}></i> 添加文章 </h2>
          <TopicAdd/>
          <p></p>
          <TopicList data={this.state.allTopic} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Topic;
