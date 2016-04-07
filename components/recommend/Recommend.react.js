/**
 * RecommendComponent
 */
'use strict';

var React = require('react');
var Link = require('react-router').Link;
var DocumentTitle = require("react-document-title");

var RecommendStore = require('../../stores/RecommendStore');
var RecommendActions = require('../../actions/RecommendActions');

var RecommendList = require('./RecommendList.react');
var RecommendErr = require('./RecommendErr.react');

function getRecommendState() {
  var data = RecommendStore.all();
  if (!data) data = [];
  return {
    allRecommend: data
  };
}

function initRecommendState() {
  var data = RecommendActions.all();
  if (!data) data = [];
  return {
    allRecommend: data
  };
}

var Recommend = React.createClass({

  getInitialState: function() {
    return initRecommendState();
  },

  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getRecommendState());
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
      <DocumentTitle title='推荐位 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular flag icon" onClick={this._clickToplogo}></i> 推荐位 </h2>
          <RecommendErr/>
          <Link to="/recommend/add" className="ui secondary button" type="button">+添加推荐位</Link>
          <p></p>
          <RecommendList data={this.state.allRecommend} />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Recommend;
