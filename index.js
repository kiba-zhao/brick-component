/**
 * @fileOverview 组件化插件模块目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';


const { ComponentManager, componentSetup } = require('./lib');
const { ComponentPlugin, defineComponent, defineComponentProperty } = require('./plugins');
const { Component, Inject } = require('./decorators');

module.exports = { ComponentManager, componentSetup, ComponentPlugin, defineComponent, defineComponentProperty, Component, Inject };
