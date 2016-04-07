/**
 * FoodActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var FoodConstants = require('../constants/FoodConstants');

var FoodActions = {

  apiURL: "/food",
  foodTagURL: "/foodtag",

  all: function(data) {
    $.ajax({
      url: this.apiURL + '/dashboard-list',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: FoodConstants.FOOD_ALL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  search: function(wd) {
    $.ajax({
      url: this.apiURL + '/dashboard-list?wd=' + wd,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: FoodConstants.FOOD_SEARCH,
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
          actionType: FoodConstants.FOOD_ADD,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: FoodConstants.FOOD_ADD,
          data: data,
          err: {title:'添加食物失败', list: ['食物名称不能重复', ]}
        });
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  addTag: function(data) {
    $.ajax({
      url: this.foodTagURL,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: FoodConstants.FOOD_ADD_TAG,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.foodTagURL, status, err.toString());
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
          actionType: FoodConstants.FOOD_DEL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  },

  delTag: function(data) {
    $.ajax({
      url: this.foodTagURL + '/del',
      dataType: 'json',
      type: 'GET',
      data: data,
      success: function(resData) {
        AppDispatcher.dispatch({
          actionType: FoodConstants.FOOD_DEL_TAG,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.foodTagURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = FoodActions;
