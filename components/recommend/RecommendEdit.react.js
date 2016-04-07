/**
 * RecommendEditComponent
 */
'use strict';

var React = require('react');

var RecommendActions = require('../../actions/RecommendActions');
var RecommendStore = require('../../stores/RecommendStore');

function initOneRecommendState(id) {
  var data = RecommendStore.one(id);
  if (!data) data = {};
  return {
    oneRecommend: data
  };
}

var RecommendEdit = React.createClass({

  getInitialState: function() {
    var id = this.props.params.id;
    return initOneRecommendState(id);
  },

  componentDidMount: function() {
    $('.ui.form')
    .form({
      inline : true,
      on: 'blur',
      fields: {
        type : {
          identifier: 'key',
          rules: [
            {
              type   : 'empty',
              prompt : 'key不能为空'
            }
          ]
        }
      },
      onSuccess : this._onEdit
    });
    RecommendStore.addErrListener(this._onEditDone);
  },

  componentWillUnmount: function() {
    RecommendStore.removeErrListener(this._onEditDone);
  },

  _onEditDone: function() {
    var err = RecommendStore.err();
    if (!err.title) {
      this.props.history.goBack();
    }
  },

  _onEdit: function() {
    var id = this.props.params.id;
    var key = this.refs.key.value.trim();
    var description = this.refs.description.value.trim();
    var config = this.refs.config.value.trim();
    RecommendActions.edit({id: id, key: key, description: description, config: config});
    return;
  },

  _onCls: function() {
    this.props.history.goBack();
  },

  render: function() {
    var data = this.state.oneRecommend;
    var modalCss = {
      top: '20%',
    };
    return (
      <div className="ui form active modal" style={modalCss}>
        <div className="header">修改</div>
        <div className="content">
            <div className="ui form" ref="addForm">
              <div className="fields">
                <div className="field">
                  <label>描述</label>
                  <input type="text" placeholder="用途" name="description" defaultValue={data.description} ref="description" />
                </div>
                <div className="field">
                  <label>key</label>
                  <input type="text" placeholder="标记位" name="key" defaultValue={data.key} ref="key" />
                </div>
              </div>
              <div className="field">
                <label>配置</label>
                <textarea placeholder="json" name="config" defaultValue={data.config} ref="config" />
              </div>
            </div>
        </div>
        <div className="actions">
          <div className="ui secondary submit button">保存</div>
          <div className="ui button" onClick={this._onCls}>关闭</div>
        </div>
      </div>
    );
  }

});

module.exports = RecommendEdit;
