/**
 * TnbfoodCategoryComponent
 */
'use strict';

var React = require('react');

var TnbfoodActions = require('../../actions/TnbfoodActions');
var TnbfoodcategoryConstants = require('../../constants/TnbfoodcategoryConstants');

var TnbfoodCategory = React.createClass({

  getInitialState: function() {
    return {category: '蔬菜'};
  },

  _onCategory: function(category) {
    this.setState({category: category});
    TnbfoodActions.category(category);
    return;
  },

  render: function() {
    var category = TnbfoodcategoryConstants;
    var current = this.state.category;
    var list = [];
    for (var key in category) {
      var clsName = (current == category[key]) ? 'item active' : 'item';
      list.push((<a className={clsName} key={key} onClick={this._onCategory.bind(this, category[key])}>{category[key]} </a>));
    }
    return (
      <div className="ui top attached tabular menu">
        {list}
      </div>
    );
  }

});

module.exports = TnbfoodCategory;
