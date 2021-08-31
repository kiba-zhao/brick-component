/**
 * @fileOverview 组件处理插件
 * @name component.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { isProviderStoreKey, isProviderFactory, isProviderDependency, createDefineFunction, createExtractFunction } = require('brick-engine');
const { ProviderStoreKey, ProviderFactory, ProviderDependency } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { ComponentManager } = require('../lib/component_manager');
const { PACKAGE_NAME } = require('../lib/constants');
const { isObject, isArray, isString, isSymbol } = require('lodash');

const MODULE_KEY = `${PACKAGE_NAME}:plugins:ComponentPlugin`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

const COMPONENT_MANAGER = Symbol('COMPONENT_MANAGER');
const COMPONENT_SCOPE = Symbol('COMPONENT_SCOPE');
const COMPONENT_PROPERTY_SCOPE = Symbol('COMPONENT_PROPERTY_SCOPE');

const getMetadataQueue = createExtractFunction('extractComponent', { scope: COMPONENT_SCOPE });
const getPropertyMetadataQueue = createExtractFunction('extractComponentProperty', { scope: COMPONENT_PROPERTY_SCOPE });

/**
 * 组件元数据
 * @see {@link module:lib/provider~ProviderStoreKey} 提供器唯一标识符类型
 * @see {@link module:lib/provider~ProviderDependency} 提供器依赖项类型
 *  @typedef {Object} ComponentMetadata
 * @property {ProviderStoreKey} [id] 定义组件id
 * @property {Array<ProviderDependency>} [deps] 组件构建依赖
 * @property {ProviderFactory} [factory] 组件构建工厂
 *
 */

/**
 * 组件属性元数据
 * @see {@link module:lib/provider~ProviderStoreKey} 提供器唯一标识符类型
 * @see {@link module:lib/provider~ProviderDependency} 提供器依赖项类型
 *  @typedef {Object} ComponentPropertyMetadata
 * @property {ProviderStoreKey} [id] 定义组件id
 * @property {String | Symbol} name 组件属性名
 * @property {ProviderDependency} dep 组件属性依赖
 *
 */

class ComponentPlugin {

  /**
   * 组件处理插件构造函数
   * @see {@link module:lib/component_manager~ComponentManager} 组件管理器类
   * @class
   * @param {ComponentManager} manager 组件管理器实例
   */
  constructor(manager) {

    debug('constructor %s', manager);

    assert(
      manager instanceof ComponentManager,
      `[${MODULE_KEY}] constructor Error: wrong manager`
    );

    this[COMPONENT_MANAGER] = manager;
  }

  /**
   *检查是否为匹配模块
   * @see {@link module:lib/engine~EngineModule} 引擎模块类型
   * @param {EngineModule} module 检查的模块
   * @return {boolean} true:匹配/false:不匹配
   */
  match(module) {

    debug('match %s', module);

    const metadataQueue = getMetadataQueue(module);
    if (metadataQueue.length > 0) {
      return metadataQueue.every(isMetadata);
    }
    const propertyMetadataQueue = getPropertyMetadataQueue(module);
    if (propertyMetadataQueue.length > 0) {
      return propertyMetadataQueue.every(isPropertyMetadata);
    }
    return false;

  }

  /**
   *使用模块方法
   * @see {@link module:lib/engine~EngineModule} 引擎模块类型
   * @param {EngineModule} module 使用的模块
   */
  async use(module) {

    debug('use %s', module);

    const manager = this[COMPONENT_MANAGER];
    const metadataQueue = getMetadataQueue(module);
    for (const metadata of metadataQueue) {
      manager.add(metadata.id || module, metadata.deps || [], metadata.factory || module);
    }
    const propertyMetadataQueue = getPropertyMetadataQueue(module);
    for (const metadata of propertyMetadataQueue) {
      manager.defineProperty(metadata.id || module, metadata.name, metadata.dep);
    }

  }

}

exports.ComponentPlugin = ComponentPlugin;

/**
 * 是否为组件元数据
 * @see {@link module:plugins/component~ComponentMetadata} 组件元数据类型
 * @param {ComponentMetadata} metadata 元数据对象
 * @return {boolean} true:是/false:否
 */
function isMetadata(metadata) {
  if (!isObject(metadata)) {
    return false;
  }
  if (metadata.id && !isProviderStoreKey(metadata.id)) {
    return false;
  }
  if (metadata.deps && (!isArray(metadata.deps) || !metadata.deps.every(isProviderDependency))) {
    return false;
  }
  if (metadata.factory && !isProviderFactory(metadata.factory)) {
    return false;
  }
  return true;
}

/**
 * 是否为组件属性元数据
 * @see {@link module:plugins/component~ComponentPropertyMetadata} 组件属性元数据类型
 * @param {ComponentPropertyMetadata} metadata 元数据对象
 * @return {boolean} true:是/false:否
 */
function isPropertyMetadata(metadata) {
  if (!isObject(metadata)) {
    return false;
  }
  if (metadata.id && !isProviderStoreKey(metadata.id)) {
    return false;
  }
  if (metadata.name && (!isString(metadata.name) && !isSymbol(metadata.name))) {
    return false;
  }
  if (metadata.dep && !isProviderDependency(metadata.dep)) {
    return false;
  }
  return true;
}

/**
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentMetadata} 组件元数据类型
 * @type {function(EngineModule,ComponentMetadata):EngineModule}
 */
const _defineComponent = createDefineFunction('defineComponent', { scope: COMPONENT_SCOPE });

/**
 * 定义组件
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentMetadata} 组件元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ComponentMetadata} metadatas 组件元数据
 * @return {EngineModule} 引擎模块对象
 */
function defineComponent(target, ...metadatas) {

  debug('defineComponent: %s, %s', target, metadatas);

  assert(
    metadatas.every(isMetadata),
    `[${MODULE_KEY}] defineComponent Error:  wrong metadata args`
  );

  const args = metadatas.length > 0 ? metadatas : [{}];
  return _defineComponent(target, ...args);
}

exports.defineComponent = defineComponent;

/**
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentPropertyMetadata} 组件元数据类型
 * @type {function(EngineModule,ComponentPropertyMetadata):EngineModule}
 */
const _defineComponentProperty = createDefineFunction('defineComponentProperty', { scope: COMPONENT_PROPERTY_SCOPE });

/**
 * 定义组件
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentPropertyMetadata} 组件属性元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ComponentPropertyMetadata} metadatas 组件属性元数据
 * @return {EngineModule} 引擎模块对象
 */
function defineComponentProperty(target, ...metadatas) {

  debug('defineComponentProperty: %s, %s', target, metadatas);

  assert(
    metadatas.every(isPropertyMetadata) && metadatas.length > 0,
    `[${MODULE_KEY}] defineComponentProperty Error:  wrong metadata args`
  );

  return _defineComponentProperty(target, ...metadatas);
}

exports.defineComponentProperty = defineComponentProperty;
