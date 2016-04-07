/**
 * EntryComponent
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Routes = require('./components/Routes.react');

ReactDOM.render(
  <Routes/>,
  document.getElementById('content')
);
