/**
 * KnowledgetypeAddComponent
 */
'use strict';

var React = require('react');

var KnowledgetypeActions = require('../../actions/KnowledgetypeActions');
var KnowledgetypeStore = require('../../stores/KnowledgetypeStore');

var KnowledgetypeErr = require('./KnowledgetypeErr.react');

var KnowledgetypecategoryConstants = require('../../constants/KnowledgetypecategoryConstants');

var KnowledgetypeAdd = React.createClass({

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
              prompt : '分类名称不能为空'
            }
          ]
        },
        video : {
          identifier: 'video',
          optional : true,
          rules: [
            {
              type   : 'url',
              prompt : '视频URl格式错误'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
    KnowledgetypeStore.addErrListener(this._onAddDone);
  },

  componentWillUnmount: function() {
    KnowledgetypeStore.removeErrListener(this._onAddDone);
  },

  _onAddDone: function() {
    var err = KnowledgetypeStore.err();
    if (!err.title) {
      $('.ui.form').form('reset');
    }
  },

  _onAdd: function() {
    var category = this.refs.category.value.trim();
    var name = this.refs.name.value.trim();
    var subtitle = this.refs.subtitle.value.trim();
    var video = this.refs.video.value.trim();
    KnowledgetypeActions.add({category: category, name: name, subtitle: subtitle, video: video});
    return;
  },

  render: function() {
    var category = KnowledgetypecategoryConstants;
    var categoryOpt = [];
    for (var key in category) {
      categoryOpt.push((<option value={category[key]} key={key}>{category[key]}</option>));
    }
    return (
      <form>
        <KnowledgetypeErr/>
        <div className="ui form" ref="addForm">
          <div className="fields">
            <div className="field">
              <label>类别</label>
              <select className="ui fluid dropdown" ref="category" >
                {categoryOpt}
              </select>
            </div>
            <div className="field">
              <label>分类名称</label>
              <input type="text" placeholder="分类名称" name="name" ref="name" />
            </div>
            <div className="field">
              <label>副标题</label>
              <input type="text" placeholder="副标题" name="subtitle" ref="subtitle" />
            </div>
            <div className="field">
              <label>视频地址</label>
              <input type="text" placeholder="视频地址" name="video" ref="video" />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <div className="ui secondary submit button">+添加分类</div>
            </div>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = KnowledgetypeAdd;
