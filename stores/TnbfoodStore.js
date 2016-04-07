/**
 * TnbfoodStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TnbfoodConstants = require('../constants/TnbfoodConstants');

var CHANGE_EVENT = 'change';
var ERR_EVENT = 'err';

var _data = [];
var _err = {};

function all(data) {
  _data = data;
}

function category(data) {
  _data = data;
}

function err(err) {
  _err = err;
}

function add(data) {
  if (_data.length > 0){
    if (_data[0].category != data.category) return;
  }
  data.tag = [];
  _data.unshift(data);
}

function del(data) {
  var newData = _data.filter(function(row){
    return row.id != data.id;
  });
  _data = newData;
}

var TnbfoodStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return _data;
  },

  err: function() {
    return _err;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitErr: function() {
    this.emit(ERR_EVENT);
  },

  addErrListener: function(callback) {
    this.on(ERR_EVENT, callback);
  },

  removeErrListener: function(callback) {
    this.removeListener(ERR_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case TnbfoodConstants.TNBFOOD_ALL:
      all(action.data);
      TnbfoodStore.emitChange();
      break;

    case TnbfoodConstants.TNBFOOD_CATEGORY:
      category(action.data);
      TnbfoodStore.emitChange();
      break;

    case TnbfoodConstants.TNBFOOD_ADD:
      var errData = {};
      if (action.err) {
        errData = action.err;
      } else {
        add(action.data);
        TnbfoodStore.emitChange();
      }
      err(errData);
      TnbfoodStore.emitErr();
      break;

    case TnbfoodConstants.TNBFOOD_DEL:
      del(action.data);
      TnbfoodStore.emitChange();
      break;

    default:
  }

});

module.exports = TnbfoodStore;
