/**
 * DoctorAddComponent
 */
'use strict';

var React = require('react');

var DoctorActions = require('../../actions/DoctorActions');

var DoctorAdd = React.createClass({

  componentDidMount: function() {
    $('.ui.form')
    .form({
      inline : true,
      on: 'blur',
      fields: {
        name : {
          identifier: 'name',
          rules: [
            {
              type   : 'empty',
              prompt : '医生姓名不能为空'
            }
          ]
        },
        avatar : {
          identifier: 'avatar',
          rules: [
            {
              type   : 'url',
              prompt : '头像URL格式错误'
            }
          ]
        },
        description : {
          identifier: 'description',
          rules: [
            {
              type   : 'empty',
              prompt : '头衔简介不能为空'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
  },

  _onAdd: function() {
    var name = this.refs.name.value.trim();
    var avatar = this.refs.avatar.value.trim();
    var description = this.refs.description.value.trim();
    DoctorActions.add({name: name, avatar: avatar, description: description});
    $('.ui.form').form('reset');
    return;
  },

  render: function() {
    return (
      <form>
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>医生姓名</label>
              <input type="text" placeholder="姓名" name="name" ref="name" />
            </div>
            <div className="field">
              <label>头像URL</label>
              <input type="text" placeholder="头像URL" name="avatar" ref="avatar" />
            </div>
            <div className="field">
              <label>头衔简介</label>
              <input type="text" placeholder="简介" name="description" ref="description" />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <div className="ui secondary submit button">+添加医生</div>
            </div>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = DoctorAdd;
