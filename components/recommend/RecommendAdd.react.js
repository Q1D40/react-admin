/**
 * RecommendAddComponent
 */
'use strict';

var React = require('react');

var RecommendActions = require('../../actions/RecommendActions');
var RecommendStore = require('../../stores/RecommendStore');

var RecommendAdd = React.createClass({

  componentDidMount: function() {
    $('.ui.form')
    .form({
      inline : true,
      on: 'blur',
      fields: {
        title : {
          identifier: 'key',
          rules: [
            {
              type   : 'empty',
              prompt : 'key不能为空'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
    RecommendStore.addErrListener(this._onAddDone);
  },

  componentWillUnmount: function() {
    RecommendStore.removeErrListener(this._onAddDone);
  },

  _onAddDone: function() {
    var err = RecommendStore.err();
    if (!err.title) {
      $('.ui.form').form('reset');
      this.props.history.goBack();
    }
  },

  _onAdd: function() {
    var key = this.refs.key.value.trim();
    var description = this.refs.description.value.trim();
    var config = this.refs.config.value.trim();
    RecommendActions.add({key: key, description: description, config: config});
    return;
  },

  _onCls: function() {
    this.props.history.goBack();
  },

  render: function() {
    var modalCss = {
      top: '20%',
    };
    return (
      <div className="ui form active modal" style={modalCss}>
        <div className="header">添加</div>
        <div className="content">
            <div className="ui form" ref="addForm">
              <div className="fields">
                <div className="field">
                  <label>描述</label>
                  <input type="text" placeholder="用途" name="description" ref="description" />
                </div>
                <div className="field">
                  <label>key</label>
                  <input type="text" placeholder="标记位" name="key" ref="key" />
                </div>
              </div>
              <div className="field">
                <label>配置</label>
                <textarea placeholder="json" name="config" ref="config" />
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

module.exports = RecommendAdd;
