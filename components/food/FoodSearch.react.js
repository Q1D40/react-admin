/**
 * FoodSearchComponent
 */
'use strict';

var React = require('react');

var FoodActions = require('../../actions/FoodActions');

var FoodSearch = React.createClass({

  _onSearch: function() {
    var wd = this.refs.wd.value.trim();
    FoodActions.search(wd);
  },

  render: function() {
    return (
      <div className="ui massive icon input">
        <input type="text" placeholder="搜索..." ref="wd" onChange={this._onSearch} />
        <i className="inverted circular search link icon"></i>
      </div>
    );
  }

});

module.exports = FoodSearch;
