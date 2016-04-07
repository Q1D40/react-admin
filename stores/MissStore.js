/**
 * MissStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MissConstants = require('../constants/MissConstants');

var CHANGE_EVENT = 'change';

var _data = {};

function all(data) {
  _data = data;
}

function del(data) {
  var newData = _data.filter(function(row){
    return row.id != data.id;
  });
  _data = newData;
}

var MissStore = assign({}, EventEmitter.prototype, {

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
    case MissConstants.MISS_ALL:
      all(action.data);
      MissStore.emitChange();
      break;

    case MissConstants.MISS_DEL:
      del(action.data);
      MissStore.emitChange();
      break;

    default:
  }

});

module.exports = MissStore;
