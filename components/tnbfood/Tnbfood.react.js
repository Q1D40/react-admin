/**
 * TnbfoodComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var TnbfoodStore = require('../../stores/TnbfoodStore');
var TnbfoodActions = require('../../actions/TnbfoodActions');

var TnbfoodList = require('./TnbfoodList.react');
var TnbfoodAdd = require('./TnbfoodAdd.react');
var TnbfoodCategory = require('./TnbfoodCategory.react');

function getTnbfoodState() {
  var data = TnbfoodStore.all();
  if (!data) data = [];
  return {
    allFood: data
  };
}

function initTnbfoodState() {
  //var data = TnbfoodActions.all();
  var data = TnbfoodActions.category('蔬菜');
  if (!data) data = [];
  return {
    allFood: data
  };
}

var Tnbfood = React.createClass({

  getInitialState: function() {
    return initTnbfoodState();
  },

  componentDidMount: function() {
    TnbfoodStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TnbfoodStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getTnbfoodState());
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
      <DocumentTitle title='糖尿病食物 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular coffee icon" onClick={this._clickToplogo}></i> 添加糖尿病食物 </h2>
          <TnbfoodAdd/>
          <p></p>
          <TnbfoodCategory/>
          <p></p>
          <TnbfoodList data={this.state.allFood} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Tnbfood;
