/**
 * @fileOverview 组件管理器
 * @name component_manager.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

/**
 * @module
 */

const assert = require('assert');
const { Provider, isProviderStoreKey, isProviderFactory, isProviderDependency } = require('brick-engine');
const { ProviderStoreKey, ProviderFactory, ProviderDependency } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { PACKAGE_NAME } = require('../lib/constants');
const { isArray, isString, isSymbol } = require('lodash');
const isClass = require('is-class');

const MODULE_KEY = `${PACKAGE_NAME}:lib:ComponentManager`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

const COMPONENT_PROVIDER = Symbol('COMPONENT_PROVIDER');
const COMPONENT_STORE = Symbol('COMPONENT_STORE');

/**
 * 组件数据
 *  @typedef {Object} ComponentData
 * @property {ProviderDependency[]} deps 构建工厂依赖项
 * @property {ProviderFactory} factory 构建工厂函数
 * @property {Map<string|Symbol,ProviderDependency>} properties 属性注入字典
 */

class ComponentManager {

  /**
   * 依赖注入插件构造函数
   * @see {@link module:lib/provider~Provider} 提供器类
   * @class
   * @param {Provider} provider 提供器实例
   */
  constructor(provider) {

    debug('constructor %s', provider);

    assert(
      provider instanceof Provider,
      `[${MODULE_KEY}] constructor Error: wrong provider`
    );

    this[COMPONENT_PROVIDER] = provider;
    this[COMPONENT_STORE] = new Map();
  }

  /**
   * 添加组件数据
   * @param {ProviderStoreKey} id 组件ID
   * @param {ProviderDependency[]} deps 组件构建依赖项
   * @param {ProviderFactory} factory 组件构建工厂
   */
  add(id, deps, factory) {

    debug('add %s %s %s', id, deps, factory);

    assert(
      isProviderStoreKey(id),
      `[${MODULE_KEY}] add Error: wrong id`
    );

    assert(
      isArray(deps) && deps.every(isProviderDependency),
      `[${MODULE_KEY}] add Error: wrong deps`
    );

    assert(
      isProviderFactory(factory),
      `[${MODULE_KEY}] add Error: wrong factory`
    );

    /** @type {Map<ProviderStoreKey,ComponentData>} **/
    const store = this[COMPONENT_STORE];

    assert(
      !store.has(id),
      `[${MODULE_KEY}] add Error: duplicate ${id.toString()}`
    );

    store.set(id, { deps, factory, properties: new Map() });
  }

  /**
   * 定义属性方法
   * @param {ProviderStoreKey} id 组件Id
   * @param {string|Symbol} name 属性名
   * @param {ProviderDependency} dep 属性依赖
   */
  defineProperty(id, name, dep) {

    debug('defineProperty %s %s %s', id, name, dep);

    assert(
      isProviderStoreKey(id),
      `[${MODULE_KEY}] defineProperty Error: wrong id`
    );

    assert(
      isString(name) || isSymbol(name),
      `[${MODULE_KEY}] defineProperty Error: wrong name`
    );

    assert(
      isProviderDependency(dep),
      `[${MODULE_KEY}] defineProperty Error: wrong dep`
    );

    /** @type {Map<ProviderStoreKey,ComponentData>} **/
    const store = this[COMPONENT_STORE];

    assert(
      store.has(id),
      `[${MODULE_KEY}] defineProperty Error: not found ${id.toString()}`
    );

    const data = store.get(id);

    assert(
      !data.properties.has(name),
      `[${MODULE_KEY}] defineProperty Error: duplicate ${name.toString()}`
    );

    data.properties.set(name, dep);
  }

  init() {

    debug('init');

    /** @type {Map<ProviderStoreKey,ComponentData>} **/
    const store = this[COMPONENT_STORE];
    /** @type {Provider} **/
    const provider = this[COMPONENT_PROVIDER];

    for (const [ id, data ] of store.entries()) {
      const deps = data.deps;
      const values = Array.from(data.properties.values());
      provider.define(id, [ ...deps, ...values ], buildComponent.bind(this, data));
    }

  }

}

exports.ComponentManager = ComponentManager;

/**
 * 构建组件函数
 * @param {ComponentData} data 组件数据
 * @param {...any} args 构建参数
 * @return {any} 构建的组件实例
 */
function buildComponent(data, ...args) {

  debug('buildComponent %s %s', data, args);

  let index = data.deps.length;
  const deps = args.slice(0, index);
  const instance = isClass(data.factory) ? new data.factory(...deps) : data.factory(...deps);

  for (const name of data.properties.keys()) {
    Object.defineProperty(instance, name, {
      configrable: false,
      get: getter.bind(this, args[index]),
    });
    index++;
  }

  return instance;
}

/**
 * 获取方法
 * @param {any} value 获取值
 * @return {any} 获取值
 */
function getter(value) {

  debug('getter %s', value);

  return value;
}
