/**
 * @fileOverview 注入装饰器
 * @name inject.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { EngineModule, ProviderStoreKey } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { defineComponentProperty } = require('../plugins');
const { PACKAGE_NAME } = require('../lib/constants');

const MODULE_KEY = `${PACKAGE_NAME}:decorators:Inject`;
const debug = require('debug')(MODULE_KEY);

/**
 * 注入装饰器工厂方法
 * @param {ProviderStoreKey} id 提供器id
 * @param {boolean} [required] 是否为必选
 * @param {ProviderStoreKey} [targetId] 目标提供器Id
 * @return {function(EngineModule,String):void}
 */
function Inject(id, required, targetId) {

  debug('Inject %s %s %s', id, required);

  return function(target, propertyKey) {
    defineComponentProperty(target, { id: targetId, name: propertyKey, dep: { id, required } });
  };

}

exports.Inject = Inject;
