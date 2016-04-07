/**
 * DoctorStore
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DoctorConstants = require('../constants/DoctorConstants');

var CHANGE_EVENT = 'change';

var _data = {};

function all(data) {
  _data = data;
}

function add(data) {
  _data.unshift(data);
}

function del(data) {
  var newData = _data.filter(function(row){
    return row.id != data.id;
  });
  _data = newData;
}

var DoctorStore = assign({}, EventEmitter.prototype, {

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
    case DoctorConstants.DOCTOR_ALL:
      all(action.data);
      DoctorStore.emitChange();
      break;

    case DoctorConstants.DOCTOR_ADD:
      add(action.data);
      DoctorStore.emitChange();
      break;

    case DoctorConstants.DOCTOR_DEL:
      del(action.data);
      DoctorStore.emitChange();
      break;

    default:
  }

});

module.exports = DoctorStore;
