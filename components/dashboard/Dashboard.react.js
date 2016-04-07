/**
 * DashboardComponent
 */
'use strict';

var React = require('react');
var Link = require('react-router').Link;
var DocumentTitle = require("react-document-title");

var Dashboard = React.createClass({

  render: function() {
    return (
      <DocumentTitle title='控制台'>
        <div className="ui grid">
          <div className="one wide column">
            <div className="ui left fixed vertical inverted labeled icon menu">
              <Link to="/about" className="item" activeClassName="active"><i className="settings icon"></i> 关于 </Link>
              <Link to="/topic" className="item" activeClassName="active"><i className="wechat icon"></i> 文章 </Link>
              <Link to="/doctor" className="item" activeClassName="active"><i className="doctor icon"></i> 医生 </Link>
              <Link to="/food" className="item" activeClassName="active"><i className="food icon"></i> 食物 </Link>
              <Link to="/miss" className="item" activeClassName="active"><i className="crosshairs icon"></i> 未命中 </Link>
              <Link to="/datemiss" className="item" activeClassName="active"><i className="bullseye icon"></i> 命中率 </Link>
              <Link to="/tnbfood" className="item" activeClassName="active"><i className="coffee icon"></i> 糖尿病食物 </Link>
              <Link to="/knowledgetype" className="item" activeClassName="active"><i className="grid layout icon"></i> 知识分类 </Link>
              <Link to="/knowledge" className="item" activeClassName="active"><i className="book icon"></i> 知识文章 </Link>
              <Link to="/recommend" className="item" activeClassName="active"><i className="flag icon"></i> 推荐位 </Link>
            </div>
          </div>
          <div className="fifteen wide stretched column">
            {this.props.children}
          </div>
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Dashboard;
