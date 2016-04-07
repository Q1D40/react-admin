/**
 * KnowledgetypeEditComponent
 */
'use strict';

var React = require('react');

var KnowledgetypeActions = require('../../actions/KnowledgetypeActions');
var KnowledgetypeStore = require('../../stores/KnowledgetypeStore');

var KnowledgetypecategoryConstants = require('../../constants/KnowledgetypecategoryConstants');

function initOneKnowledgetypeState(id) {
  var data = KnowledgetypeStore.one(id);
  if (!data) data = {};
  return {
    oneKnowledgetype: data
  };
}

var KnowledgetypeEdit = React.createClass({

  getInitialState: function() {
    var id = this.props.params.id;
    return initOneKnowledgetypeState(id);
  },

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
      onSuccess : this._onEdit
    });
    KnowledgetypeStore.addErrListener(this._onEditDone);
  },

  componentWillUnmount: function() {
    KnowledgetypeStore.removeErrListener(this._onEditDone);
  },

  _onEditDone: function() {
    var err = KnowledgetypeStore.err();
    if (!err.title) {
      this.props.history.goBack();
    }
  },

  _onEdit: function() {
    var id = this.props.params.id;
    var category = this.refs.category.value.trim();
    var name = this.refs.name.value.trim();
    var subtitle = this.refs.subtitle.value.trim();
    var video = this.refs.video.value.trim();
    KnowledgetypeActions.edit({id: id, category: category, name: name, subtitle: subtitle, video: video});
    return;
  },

  _onCls: function() {
    this.props.history.goBack();
  },

  render: function() {
    var data = this.state.oneKnowledgetype;
    var modalCss = {
      top: '20%',
    };
    var category = KnowledgetypecategoryConstants;
    var categoryOpt = [];
    for (var key in category) {
      categoryOpt.push((<option value={category[key]} key={key}>{category[key]}</option>));
    }
    return (
      <div className="ui form active modal" style={modalCss}>
        <div className="header">修改</div>
        <div className="content">
            <div className="ui form" ref="editForm">
              <div className="fields">
                <div className="field">
                  <label>类别</label>
                  <select className="ui fluid dropdown" defaultValue={data.category} ref="category" >
                    {categoryOpt}
                  </select>
                </div>
                <div className="field">
                  <label>分类名称</label>
                  <input type="text" placeholder="分类名称" name="name" defaultValue={data.name} ref="name" />
                </div>
                <div className="field">
                  <label>副标题</label>
                  <input type="text" placeholder="副标题" name="subtitle" defaultValue={data.subtitle} ref="subtitle" />
                </div>
                <div className="field">
                  <label>视频地址</label>
                  <input type="text" placeholder="视频地址" name="video" defaultValue={data.video} ref="video" />
                </div>
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

module.exports = KnowledgetypeEdit;
