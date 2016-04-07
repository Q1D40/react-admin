/**
 * DatemissActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var DatemissConstants = require('../constants/DatemissConstants');

var DatemissActions = {

  apiURL: "/datemiss",

  all: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {limit: 0, sort: 'id DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: DatemissConstants.DATEMISS_ALL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = DatemissActions;
