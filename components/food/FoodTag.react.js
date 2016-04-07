/**
 * FoodTagComponent
 */
'use strict';

var React = require('react');

var FoodActions = require('../../actions/FoodActions');

var FoodTag = React.createClass({

  componentDidMount: function() {
    $('#' + this.props.data.id)
      .dropdown({
        allowAdditions: true,
        apiSettings: {
          url: '/tag/search?wd={query}'
        },
        message: {
          addResult: '添加 <b>{term}</b>'
        },
        onAdd: this._addTag,
        onRemove: this._delTag,
        onLabelCreate: function($label){
          return false;
        }
      })
    ;
  },

  _addTag: function(addedValue, addedText, addedChoice) {
    var food = this.props.data.name;
    var tag = addedValue;
    FoodActions.addTag({food: food, tag: tag});
  },

  _delTag: function(removedValue, removedText, removedChoice) {
    var food = this.props.data.name;
    var tag = removedValue;
    FoodActions.delTag({food: food, tag: tag});
  },

  render: function() {
    var tag = this.props.data.tag.map(function (row, key) {
      return (
        <a className="ui label" data-value={row} key={key}>{row}<i className="delete icon"></i></a>
      );
    });
    return (
      <div id={this.props.data.id} className=" ui fluid multiple search selection dropdown">
        <input name="tags" type="hidden" />
        <i className="dropdown icon"></i>
        {tag}
        <div className="default text">添加标签</div>
      </div>
    );
  }

});

module.exports = FoodTag;
