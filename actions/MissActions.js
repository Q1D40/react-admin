/**
 * MissActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MissConstants = require('../constants/MissConstants');

var MissActions = {

  apiURL: "/miss",

  all: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {limit: 0, sort: 'count DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: MissConstants.MISS_ALL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
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
          actionType: MissConstants.MISS_DEL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = MissActions;
