/**
 * @fileOverview 组件装饰器
 * @name component.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { EngineModule } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { ComponentMetadata } = require('../plugins/component'); // eslint-disable-line no-unused-vars
const { defineComponent } = require('../plugins');
const { PACKAGE_NAME } = require('../lib/constants');

const MODULE_KEY = `${PACKAGE_NAME}:decorators:Component`;
const debug = require('debug')(MODULE_KEY);

/**
 * 组件装饰器工厂方法
 * @param {...ComponentMetadata} metadatas 组件元数据
 * @return {function(EngineModule):void} 组件装饰器
 */
function Component(...metadatas) {

  debug('Component %s', metadatas);

  return function(target) {
    defineComponent(target, ...metadatas);
  };

}

exports.Component = Component;
