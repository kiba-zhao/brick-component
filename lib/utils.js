/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ComponentManager } = require('./component_manager');
const { ComponentPlugin } = require('../plugins');
const { definePlugin, defineProviderFactory, defineReady, Provider } = require('brick-engine');
const { PACKAGE_NAME } = require('../lib/constants');

const MODULE_KEY = `${PACKAGE_NAME}:lib:utils`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

const READY_METHOD = 'init';

/**
 * 安装组件化插件
 * @param {EngineModule} module
 */
function setupComponentPlugin(module) {

  debug('setupComponentPlugin %s', module);

  defineProviderFactory(module, { id: ComponentManager, deps: [{ id: Provider }], factory: ComponentManager });
  definePlugin(module, { deps: [{ id: ComponentManager }], factory: ComponentPlugin });
  defineReady(module, { id: ComponentManager, method: READY_METHOD });
}

exports.setupComponentPlugin = setupComponentPlugin;
