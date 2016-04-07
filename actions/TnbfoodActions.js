/**
 * TnbfoodActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TnbfoodConstants = require('../constants/TnbfoodConstants');

var TnbfoodActions = {

  apiURL: "/tnbfood",

  all: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {limit: 0, sort: 'id DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: TnbfoodConstants.TNBFOOD_ALL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  category: function(category) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {where: { category: category }, limit: 0, sort: 'id DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: TnbfoodConstants.TNBFOOD_CATEGORY,
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
          actionType: TnbfoodConstants.TNBFOOD_ADD,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: TnbfoodConstants.TNBFOOD_ADD,
          data: data,
          err: {title:'添加食物失败', list: ['食物名称不能重复', ]}
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
          actionType: TnbfoodConstants.TNBFOOD_DEL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = TnbfoodActions;
