/**
 * AboutComponent
 */
'use strict';

var React = require('react');
var DocumentTitle = require("react-document-title");

var About = React.createClass({

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
      <DocumentTitle title='关于 · 控制台'>
        <h2 className="ui center aligned icon header maincpt">
          <p></p>
          <i className="settings icon" onClick={this._clickToplogo}></i>
          <div className="content">Handjob Man <div className="sub header">自豪地采用以下技术栈构建</div>
          </div>
          <div className="ui mini images">
            <a href="https://nodejs.org" target="_blank">
              <img className="ui image" src="/images/dashboard/node.png" />
            </a>
            <a href="http://www.sailsjs.org" target="_blank">
              <img className="ui image" src="/images/dashboard/sails.png" />
            </a>
            <a href="https://www.mongodb.org" target="_blank">
              <img className="ui image" src="/images/dashboard/mongodb.png" />
            </a>
            <a href="http://facebook.github.io/react" target="_blank">
              <img className="ui image" src="/images/dashboard/react.png" />
            </a>
            <a href="http://facebook.github.io/flux" target="_blank">
              <img className="ui image" src="/images/dashboard/flux.png" />
            </a>
            <a href="http://webpack.github.io" target="_blank">
              <img className="ui image" src="/images/dashboard/webpack.png" />
            </a>
            <a href="http://semantic-ui.com" target="_blank">
              <img className="ui image" src="/images/dashboard/semantic-ui.png" />
            </a>
          </div>
        </h2>
      </DocumentTitle>
    );
  }

});

module.exports = About;
