/**
 * @fileOverview 组件示例代码
 * @name component.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineComponent, defineComponentProperty } = require('../../../..');

class Component {
}

exports.Component = Component;
defineComponent(Component);
defineComponentProperty(Component, { name: 'p1', dep: { id: 'depId' } });
