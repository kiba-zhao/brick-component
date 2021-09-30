/**
 * @fileOverview 组件化插件模块目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';


const { ComponentManager, componentSetup } = require('./lib');
const { ComponentPlugin, defineComponent, defineComponentProperty } = require('./plugins');

module.exports = { ComponentManager, componentSetup, ComponentPlugin, defineComponent, defineComponentProperty };
