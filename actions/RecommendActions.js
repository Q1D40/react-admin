/**
 * RecommendActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var RecommendConstants = require('../constants/RecommendConstants');

var RecommendActions = {

  apiURL: "/recommend",

  all: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {limit: 0, sort: 'id DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_ALL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  add: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_ADD,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_ADD,
          data: data,
          err: {title:'添加推荐位失败', list: ['key不能重复', ]}
        });
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  edit: function(data) {
    $.ajax({
      url: this.apiURL + '/' + data.id,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_EDT,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_EDT,
          data: data,
          err: {title:'修改推荐位失败', list: ['key不能重复', ]}
        });
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  del: function(data) {
    $.ajax({
      url: this.apiURL + '/' + data.id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: RecommendConstants.RCMD_DEL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = RecommendActions;
