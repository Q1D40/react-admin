/**
 * TnbfoodAddComponent
 */
'use strict';

var React = require('react');

var TnbfoodActions = require('../../actions/TnbfoodActions');
var TnbfoodStore = require('../../stores/TnbfoodStore');
var TnbfoodcategoryConstants = require('../../constants/TnbfoodcategoryConstants');

var TnbfoodErr = require('./TnbfoodErr.react');

var TnbfoodAdd = React.createClass({

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
              prompt : '食物名称不能为空'
            }
          ]
        },
        portion : {
          identifier: 'portion',
          rules: [
            {
              type   : 'empty',
              prompt : '一份量不能为空'
            },
            {
              type   : 'number',
              prompt : '一份量必须是数字'
            },
            {
              type   : 'doesntContain[-]',
              prompt : '一份量不能是负数'
            }
          ]
        },
        img : {
          identifier: 'img',
          rules: [
            {
              type   : 'url',
              prompt : '图片URl格式错误'
            }
          ]
        },
        unit : {
          identifier: 'unit',
          rules: [
            {
              type   : 'empty',
              prompt : '单位不能为空'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
    $('select.dropdown').dropdown();
    TnbfoodStore.addErrListener(this._onAddDone);
  },

  componentWillUnmount: function() {
    TnbfoodStore.removeErrListener(this._onAddDone);
  },

  _onAddDone: function() {
    var err = TnbfoodStore.err();
    if (!err.title) {
      $('.ui.form').form('reset');
    }
  },

  _onAdd: function() {
    var name = this.refs.name.value.trim();
    var img = this.refs.img.value.trim();
    var portion = this.refs.portion.value.trim();
    var unit = this.refs.unit.value.trim();
    var category = this.refs.category.value.trim();
    TnbfoodActions.add({name: name, img: img, portion: portion, unit: unit, category: category});
    return;
  },

  render: function() {
    var category = TnbfoodcategoryConstants;
    var categoryOpt = [];
    for (var key in category) {
      categoryOpt.push((<option value={category[key]} key={key}>{category[key]}</option>));
    }
    return (
      <form>
        <TnbfoodErr/>
        <div className="ui form" ref="addForm">
          <div className="fields">
            <div className="field">
              <label>食物名称</label>
              <input type="text" placeholder="食物名称" name="name" ref="name" />
            </div>
            <div className="field">
              <label>一份量</label>
              <input type="text" placeholder="填数字" name="portion" ref="portion" />
            </div>
            <div className="field">
              <label>单位</label>
              <input type="text" placeholder="单位名称" name="unit" ref="unit" />
            </div>
            <div className="field">
              <label>图片</label>
              <input type="text" placeholder="图片URL" name="img" ref="img" />
            </div>
            <div className="field">
              <label>分类</label>
              <select className="ui fluid dropdown" ref="category" >
                {categoryOpt}
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <div className="ui secondary submit button">+添加糖尿病食物</div>
            </div>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = TnbfoodAdd;
