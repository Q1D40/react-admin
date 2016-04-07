/**
 * DatemissComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var DatemissStore = require('../../stores/DatemissStore');
var DatemissActions = require('../../actions/DatemissActions');

var DatemissList = require('./DatemissList.react');

function getDatemissState() {
  var data = DatemissStore.all();
  if (!data) data = [];
  return {
    allDatemiss: data
  };
}

function initDatemissState() {
  var data = DatemissActions.all();
  if (!data) data = [];
  return {
    allDatemiss: data
  };
}

var Datemiss = React.createClass({

  getInitialState: function() {
    return initDatemissState();
  },

  componentDidMount: function() {
    DatemissStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DatemissStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getDatemissState());
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
      <DocumentTitle title='命中率 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular bullseye icon" onClick={this._clickToplogo}></i> 命中率 </h2>
          <p></p>
          <DatemissList data={this.state.allDatemiss} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Datemiss;
