/**
 * MissComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var MissStore = require('../../stores/MissStore');
var MissActions = require('../../actions/MissActions');

var MissList = require('./MissList.react');

function getMissState() {
  var data = MissStore.all();
  if (!data) data = [];
  return {
    allMiss: data
  };
}

function initMissState() {
  var data = MissActions.all();
  if (!data) data = [];
  return {
    allMiss: data
  };
}

var Miss = React.createClass({

  getInitialState: function() {
    return initMissState();
  },

  componentDidMount: function() {
    MissStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MissStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getMissState());
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
      <DocumentTitle title='未命中 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular crosshairs icon" onClick={this._clickToplogo}></i> 未命中词语 </h2>
          <p></p>
          <MissList data={this.state.allMiss} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Miss;
