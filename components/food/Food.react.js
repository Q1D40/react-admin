/**
 * FoodComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var FoodStore = require('../../stores/FoodStore');
var FoodActions = require('../../actions/FoodActions');

var FoodList = require('./FoodList.react');
var FoodAdd = require('./FoodAdd.react');
var FoodSearch = require('./FoodSearch.react');

function getFoodState() {
  var data = FoodStore.all();
  if (!data) data = [];
  return {
    allFood: data
  };
}

function initFoodState() {
  var data = FoodActions.all();
  if (!data) data = [];
  return {
    allFood: data
  };
}

var Food = React.createClass({

  getInitialState: function() {
    return initFoodState();
  },

  componentDidMount: function() {
    FoodStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FoodStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getFoodState());
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
      <DocumentTitle title='食物 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular food icon" onClick={this._clickToplogo}></i> 添加食物 </h2>
          <FoodAdd/>
          <p></p>
          <FoodSearch/>
          <p></p>
          <FoodList data={this.state.allFood} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Food;
