/**
 * KnowledgeActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var KnowledgeConstants = require('../constants/KnowledgeConstants');

var KnowledgeActions = {

  apiURL: "/knowledge",

  all: function(data) {
    $.ajax({
      url: this.apiURL,
      dataType: 'json',
      type: 'GET',
      data: {limit: 0, sort: 'id DESC'},
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: KnowledgeConstants.KWG_ALL,
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
          actionType: KnowledgeConstants.KWG_ADD,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: KnowledgeConstants.KWG_ADD,
          data: data,
          err: {title:'添加知识失败', list: ['未知错误', ]}
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
          actionType: KnowledgeConstants.KWG_EDT,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        AppDispatcher.dispatch({
          actionType: KnowledgeConstants.KWG_EDT,
          data: data,
          err: {title:'修改知识失败', list: ['未知错误', ]}
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
          actionType: KnowledgeConstants.KWG_DEL,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.apiURL, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = KnowledgeActions;
