/**
 * @fileOverview 组件化插件模块目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';


const { ComponentManager, setupComponentPlugin } = require('./lib');
const { ComponentPlugin, defineComponent, defineComponentProperty } = require('./plugins');

module.exports = { ComponentManager, setupComponentPlugin, ComponentPlugin, defineComponent, defineComponentProperty };
