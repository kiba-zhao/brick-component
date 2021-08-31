/**
 * @fileOverview 组件化插件测试代码
 * @name component.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { MODULE_KEY, ComponentPlugin, defineComponent, defineComponentProperty } = require('../../plugins/component');
const { ComponentManager } = require('../../lib');
const { Provider } = require('brick-engine');
const faker = require('faker');

describe('plugins/component', () => {

  it('MODULE_KEY', () => {
    expect(MODULE_KEY).toBe('brick-component:plugins:ComponentPlugin');
  });

  describe('ComponentPlugin', () => {

    /** @type {ComponentPlugin} **/
    let plugin;

    /** @type {ComponentManager} **/
    let manager;

    beforeEach(() => {
      const provider = new Provider();
      manager = new ComponentManager(provider);
      plugin = new ComponentPlugin(manager);
    });

    describe('match', () => {

      it('simple', () => {

        let target = () => { };

        let res = plugin.match(target);
        expect(res).toBeFalsy();

        defineComponent(target, { id: faker.datatype.uuid(), factory: () => {} });
        res = plugin.match(target);
        expect(res).toBeTruthy();

        target = () => { };
        defineComponentProperty(target, { id: faker.datatype.uuid(), name: faker.random.word(), dep: { id: Symbol() } });
        res = plugin.match(target);
        expect(res).toBeTruthy();

      });

    });

    describe('use', () => {

      it('simple', async () => {

        const addFn = jest.spyOn(manager, 'add');
        const definePropertyFn = jest.spyOn(manager, 'defineProperty');

        const target = {};
        const id = Symbol('id');
        const deps = [{ id: Symbol() }];
        const factory = () => {};
        defineComponent(target, { id, deps, factory });

        const name = Symbol('name');
        const dep = { id };
        defineComponentProperty(target, { id, name, dep });

        await plugin.use(target);

        expect(addFn).toBeCalledTimes(1);
        expect(addFn).toHaveBeenCalledWith(id, deps, factory);
        expect(definePropertyFn).toBeCalledTimes(1);
        expect(definePropertyFn).toHaveBeenCalledWith(id, name, dep);

      });

    });

  });

});
