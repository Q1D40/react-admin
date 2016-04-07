/**
 * KnowledgeAddComponent
 */
'use strict';

var React = require('react');

var KnowledgeActions = require('../../actions/KnowledgeActions');
var KnowledgeStore = require('../../stores/KnowledgeStore');
var KnowledgetypeActions = require('../../actions/KnowledgetypeActions');
var KnowledgetypeStore = require('../../stores/KnowledgetypeStore');

function getKnowledgetypeState() {
  var data = KnowledgetypeStore.all();
  if (!data) data = [];
  return {
    allKnowledgetype: data
  };
}

function initKnowledgetypeState() {
  var data = KnowledgetypeActions.all();
  if (!data) data = [];
  return {
    allKnowledgetype: data
  };
}

var KnowledgeAdd = React.createClass({

  getInitialState: function() {
    return initKnowledgetypeState();
  },

  componentDidMount: function() {
    $('.ui.form')
    .form({
      inline : true,
      on: 'blur',
      fields: {
        title : {
          identifier: 'title',
          rules: [
            {
              type   : 'empty',
              prompt : '标题不能为空'
            }
          ]
        },
        author : {
          identifier: 'author',
          rules: [
            {
              type   : 'empty',
              prompt : '作者不能为空'
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
        },
        content : {
          identifier: 'content',
          rules: [
            {
              type   : 'empty',
              prompt : '内容不能为空'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
    KnowledgeStore.addErrListener(this._onAddDone);
    KnowledgetypeStore.addChangeListener(this._onTypeChange);
  },

  componentWillUnmount: function() {
    KnowledgeStore.removeErrListener(this._onAddDone);
    KnowledgetypeStore.removeChangeListener(this._onTypeChange);
  },

  _onTypeChange: function() {
    this.setState(getKnowledgetypeState());
  },

  _onAddDone: function() {
    var err = KnowledgeStore.err();
    if (!err.title) {
      $('.ui.form').form('reset');
      this.props.history.goBack();
    }
  },

  _onAdd: function() {
    var type = this.refs.type.value.trim();
    var title = this.refs.title.value.trim();
    var author = this.refs.author.value.trim();
    var video = this.refs.video.value.trim();
    var content = this.refs.content.value.trim();
    KnowledgeActions.add({type: type, title: title, author: author, video: video, content: content});
    return;
  },

  _onCls: function() {
    this.props.history.goBack();
  },

  render: function() {
    var modalCss = {
      top: '20%',
    };
    var type = this.state.allKnowledgetype;
    var typeOpt = [];
    for (var key in type) {
      typeOpt.push((<option value={type[key].id} key={key}>{type[key].name}</option>));
    }
    return (
      <div className="ui form active modal" style={modalCss}>
        <div className="header">添加</div>
        <div className="content">
            <div className="ui form" ref="addForm">
              <div className="fields">
                <div className="field">
                  <label>分类</label>
                  <select name="type" ref="type">
                    {typeOpt}
                  </select>
                </div>
                <div className="field">
                  <label>作者</label>
                  <input type="text" placeholder="作者名字" name="author" ref="author" />
                </div>
              </div>
              <div className="field">
                <label>视频地址</label>
                <input type="text" placeholder="视频地址" name="video" ref="video" />
              </div>
              <div className="field">
                <label>标题</label>
                <input type="text" placeholder="文章标题" name="title" ref="title" />
              </div>
              <div className="field">
                <label>内容</label>
                <textarea placeholder="markdown" name="content" ref="content" />
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

module.exports = KnowledgeAdd;
