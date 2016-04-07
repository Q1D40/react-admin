/**
 * DoctorComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var DoctorStore = require('../../stores/DoctorStore');
var DoctorActions = require('../../actions/DoctorActions');

var DoctorList = require('./DoctorList.react');
var DoctorAdd = require('./DoctorAdd.react');

function getDoctorState() {
  var data = DoctorStore.all();
  if (!data) data = [];
  return {
    allDoctor: data
  };
}

function initDoctorState() {
  var data = DoctorActions.all();
  if (!data) data = [];
  return {
    allDoctor: data
  };
}

var Doctor = React.createClass({

  getInitialState: function() {
    return initDoctorState();
  },

  componentDidMount: function() {
    DoctorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DoctorStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getDoctorState());
  },

  _clickToplogo: function() {
    var tranArr = ['flash', 'shake', 'tada', 'jiggle', 'bounce'];
    var i = Math.floor(Math.random() * 5);
    var tran = tranArr[i];
    $('.maincpt')
      .transition(tran)
    ;
  },

  render: function() {
    return (
      <DocumentTitle title='医生 · 控制台'>
        <div className="maincpt">
          <h2 className="ui center aligned icon header"><i className="circular doctor icon" onClick={this._clickToplogo}></i> 添加医生 </h2>
          <DoctorAdd/>
          <p></p>
          <DoctorList data={this.state.allDoctor} />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Doctor;
