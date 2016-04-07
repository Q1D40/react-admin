/**
 * FoodStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FoodConstants = require('../constants/FoodConstants');

var CHANGE_EVENT = 'change';
var ERR_EVENT = 'err';

var _data = [];
var _err = {};

function all(data) {
  _data = data;
}

function search(data) {
  _data = data;
}

function err(err) {
  _err = err;
}

function add(data) {
  data.tag = [];
  _data.unshift(data);
}

function del(data) {
  var newData = _data.filter(function(row){
    return row.id != data.id;
  });
  _data = newData;
}

function addTag(data) {
  for (var key in _data) {
    if (_data[key].name == data.food) {
      _data[key].tag.push(data.tag);
      break;
    }
  }
}

function delTag(data) {
  for (var key in _data) {
    if (_data[key].name == data.food) {
      _data[key].tag.push(data.tag);
      var newTag = _data[key].tag.filter(function(row){
        return row != data.tag;
      });
      _data[key].tag = newTag;
      break;
    }
  }
}

var FoodStore = assign({}, EventEmitter.prototype, {

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
    case FoodConstants.FOOD_ALL:
      all(action.data);
      FoodStore.emitChange();
      break;

    case FoodConstants.FOOD_SEARCH:
      search(action.data);
      FoodStore.emitChange();
      break;

    case FoodConstants.FOOD_ADD:
      var errData = {};
      if (action.err) {
        errData = action.err;
      } else {
        add(action.data);
        FoodStore.emitChange();
      }
      err(errData);
      FoodStore.emitErr();
      break;

    case FoodConstants.FOOD_DEL:
      del(action.data);
      FoodStore.emitChange();
      break;

    case FoodConstants.FOOD_ADD_TAG:
      addTag(action.data);
      FoodStore.emitChange();
      break;

    case FoodConstants.FOOD_DEL_TAG:
      delTag(action.data);
      FoodStore.emitChange();
      break;

    default:
  }

});

module.exports = FoodStore;
