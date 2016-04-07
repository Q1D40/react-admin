/**
 * DatemissStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DatemissConstants = require('../constants/DatemissConstants');

var CHANGE_EVENT = 'change';

var _data = {};

function all(data) {
  _data = data;
}

var DatemissStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return _data;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case DatemissConstants.DATEMISS_ALL:
      all(action.data);
      DatemissStore.emitChange();
      break;

    default:
  }

});

module.exports = DatemissStore;
