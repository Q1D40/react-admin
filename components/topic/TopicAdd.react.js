/**
 * TopicAddComponent
 */
'use strict';

var React = require('react');

var TopicActions = require('../../actions/TopicActions');

var TopicAdd = React.createClass({

  componentDidMount: function() {
    $('.ui.form')
    .form({
      inline : true,
      on: 'blur',
      fields: {
        doctorId : {
          identifier: 'doctorId',
          rules: [
            {
              type   : 'empty',
              prompt : '医生ID不能为空'
            }
          ]
        },
        description : {
          identifier: 'description',
          rules: [
            {
              type   : 'empty',
              prompt : '内容摘要不能为空'
            }
          ]
        },
        thumb : {
          identifier: 'thumb',
          rules: [
            {
              type   : 'url',
              prompt : '缩略图URL格式错误'
            }
          ]
        },
        url : {
          identifier: 'url',
          rules: [
            {
              type   : 'url',
              prompt : '文章URL格式错误'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
  },

  _onAdd: function() {
    var doctorId = this.refs.doctorId.value.trim();
    var description = this.refs.description.value.trim();
    var thumb = this.refs.thumb.value.trim();
    var url = this.refs.url.value.trim();
    TopicActions.add({doctorId: doctorId, description: description, thumb: thumb, url: url});
    $('.ui.form').form('reset');
    return;
  },

  render: function() {
    return (
      <form>
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>医生ID</label>
              <input type="text" placeholder="医生ID" name="doctorId" ref="doctorId" />
            </div>
            <div className="field">
              <label>内容摘要</label>
              <input type="text" placeholder="描述" name="description" ref="description" />
            </div>
            <div className="field">
              <label>文章缩略图</label>
              <input type="text" placeholder="缩略图URL" name="thumb" ref="thumb" />
            </div>
            <div className="field">
              <label>文章URL</label>
              <input type="text" placeholder="文章URL" name="url" ref="url" />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <div className="ui secondary submit button">+添加文章</div>
            </div>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = TopicAdd;
