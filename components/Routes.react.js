/**
 * RoutesComponent
 */
'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Dashboard = require('./dashboard/Dashboard.react');
var About = require('./about/About.react');
var Topic = require('./topic/Topic.react');
var Doctor = require('./doctor/Doctor.react');
var Food = require('./food/Food.react');
var Miss = require('./miss/Miss.react');
var Datemiss = require('./datemiss/Datemiss.react');
var Tnbfood = require('./tnbfood/Tnbfood.react');
var Knowledgetype = require('./knowledgetype/Knowledgetype.react');
var KnowledgetypeEdit = require('./knowledgetype/KnowledgetypeEdit.react');
var Knowledge = require('./knowledge/Knowledge.react');
var KnowledgeEdit = require('./knowledge/KnowledgeEdit.react');
var KnowledgeAdd = require('./knowledge/KnowledgeAdd.react');
var Recommend = require('./recommend/Recommend.react');
var RecommendEdit = require('./recommend/RecommendEdit.react');
var RecommendAdd = require('./recommend/RecommendAdd.react');

var Routes = React.createClass({

  render: function() {
    return (
      <Router>
        <Route path="/" component={Dashboard}>
          <IndexRoute component={About} />
          <Route path="about" component={About} />
          <Route path="topic" component={Topic} />
          <Route path="doctor" component={Doctor} />
          <Route path="food" component={Food} />
          <Route path="miss" component={Miss} />
          <Route path="datemiss" component={Datemiss} />
          <Route path="tnbfood" component={Tnbfood} />
          <Route path="knowledgetype" component={Knowledgetype}>
            <Route path="edit/:id" component={KnowledgetypeEdit}/>
          </Route>
          <Route path="knowledge" component={Knowledge}>
            <Route path="add" component={KnowledgeAdd}/>
            <Route path="edit/:id" component={KnowledgeEdit}/>
          </Route>
          <Route path="recommend" component={Recommend}>
            <Route path="add" component={RecommendAdd}/>
            <Route path="edit/:id" component={RecommendEdit}/>
          </Route>
        </Route>
      </Router>
    );
  }

});

module.exports = Routes;
