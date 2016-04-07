/**
 * FoodAddComponent
 */
'use strict';

var React = require('react');

var FoodActions = require('../../actions/FoodActions');
var FoodStore = require('../../stores/FoodStore');

var FoodErr = require('./FoodErr.react');

var FoodAdd = React.createClass({

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
        img : {
          identifier: 'img',
          optional : true,
          rules: [
            {
              type   : 'url',
              prompt : '图片URl格式错误'
            }
          ]
        },
        cCT : {
          identifier: 'cCT',
          optional : true,
          rules: [
            {
              type   : 'number',
              prompt : '胆固醇含量必须是数字'
            },
            {
              type   : 'doesntContain[-]',
              prompt : '胆固醇含量不能是负数'
            }
          ]
        },
        fCT : {
          identifier: 'fCT',
          optional : true,
          rules: [
            {
              type   : 'number',
              prompt : '脂肪含量必须是数字'
            },
            {
              type   : 'doesntContain[-]',
              prompt : '脂肪含量不能是负数'
            }
          ]
        }
      },
      onSuccess : this._onAdd
    });
    $('select.dropdown').dropdown();
    FoodStore.addErrListener(this._onAddDone);
  },

  componentWillUnmount: function() {
    FoodStore.removeErrListener(this._onAddDone);
  },

  _onAddDone: function() {
    var err = FoodStore.err();
    if (!err.title) {
      $('.ui.form').form('reset');
    }
  },

  _onAdd: function() {
    var name = this.refs.name.value.trim();
    var img = this.refs.img.value.trim();
    var cCT = this.refs.cCT.value.trim();
    cCT = cCT ? cCT : 0;
    var fCT = this.refs.fCT.value.trim();
    fCT = fCT ? fCT : 0;
    var cHP = this.refs.cHP.value.trim();
    var hHP = this.refs.hHP.value.trim();
    FoodActions.add({name: name, img: img, cCT: cCT, fCT: fCT, cHP: cHP, hHP: hHP});
    return;
  },

  render: function() {
    return (
      <form>
        <FoodErr/>
        <div className="ui form" ref="addForm">
          <div className="fields">
            <div className="field">
              <label>食物名称</label>
              <input type="text" placeholder="食物名称" name="name" ref="name" />
            </div>
            <div className="field">
              <label>图片</label>
              <input type="text" placeholder="图片URL" name="img" ref="img" />
            </div>
            <div className="field">
              <label>胆固醇含量</label>
              <input type="text" placeholder="每百克含 XX 毫克" name="cCT" ref="cCT" />
            </div>
            <div className="field">
              <label>脂肪含量</label>
              <input type="text" placeholder="每百克含 XX 克" name="fCT" ref="fCT" />
            </div>
            <div className="field">
              <label>胆固醇偏高人群</label>
              <select className="ui fluid dropdown" ref="cHP" >
                <option value="未收录">未收录</option>
                <option value="能吃">能吃</option>
                <option value="不能吃">不能吃</option>
              </select>
            </div>
            <div className="field">
              <label>高血脂人群</label>
              <select className="ui fluid dropdown" ref="hHP" >
                <option value="未收录">未收录</option>
                <option value="能吃">能吃</option>
                <option value="不能吃">不能吃</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <div className="ui secondary submit button">+添加食物</div>
            </div>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = FoodAdd;
