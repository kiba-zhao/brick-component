/**
 * @fileOverview 组件管理类测试
 * @name component_manager.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { MODULE_KEY, ComponentManager } = require('../../lib/component_manager');
const { Provider } = require('brick-engine');
const faker = require('faker');

class TestModel {}

describe('lib/component_manager', () => {

  it('MODULE_KEY', () => {
    expect(MODULE_KEY).toBe('brick-component:lib:ComponentManager');
  });

  describe('ComponentManager', () => {

    /** @type {ComponentManager} **/
    let manager;

    /** @type {Provider} **/
    let provider;

    beforeEach(() => {
      provider = new Provider();
      manager = new ComponentManager(provider);
    });

    describe('add', () => {

      it('success', () => {

        manager.add(faker.datatype.string(), [], () => {});
        manager.add(Symbol(), [{ id: faker.datatype.string() }], () => {});
        manager.add(Symbol(), [{ id: faker.datatype.string() }], TestModel);

      });

      it('fatal', () => {

        const WRONG_ID =
          `[${MODULE_KEY}] add Error: wrong id`;

        expect(() => manager.add(null, [], () => {})).toThrow(WRONG_ID);
        expect(() => manager.add(undefined, [], () => {})).toThrow(WRONG_ID);

        const WRONG_DEPS =
          `[${MODULE_KEY}] add Error: wrong deps`;

        expect(() => manager.add(1, null, () => {})).toThrow(WRONG_DEPS);
        expect(() => manager.add(2, {}, () => {})).toThrow(WRONG_DEPS);
        expect(() => manager.add(2, [ 123 ], () => {})).toThrow(WRONG_DEPS);

        const WRONG_FACTORY =
              `[${MODULE_KEY}] add Error: wrong factory`;

        expect(() => manager.add(1, [], {})).toThrow(WRONG_FACTORY);
        expect(() => manager.add(2, [], 123)).toThrow(WRONG_FACTORY);

        const id = faker.datatype.uuid();
        const WRONG_DUPLICATE =
              `[${MODULE_KEY}] add Error: duplicate ${id}`;

        manager.add(id, [], () => {});
        expect(() => manager.add(id, [], () => {})).toThrow(WRONG_DUPLICATE);

      });

    });

    describe('defineProperty', () => {

      it('success', () => {

        const id = faker.datatype.uuid();
        manager.add(id, [], () => {});

        manager.defineProperty(id, faker.datatype.string(), { id: faker.datatype.string() });
        manager.defineProperty(id, Symbol(), { id: faker.datatype.string() });

      });

      it('fatal', () => {

        const WRONG_ID =
          `[${MODULE_KEY}] defineProperty Error: wrong id`;

        expect(() => manager.defineProperty(null, faker.datatype.string(), { id: faker.datatype.string() })).toThrow(WRONG_ID);
        expect(() => manager.defineProperty(undefined, faker.datatype.string(), { id: faker.datatype.string() })).toThrow(WRONG_ID);

        const WRONG_NAME =
          `[${MODULE_KEY}] defineProperty Error: wrong name`;

        expect(() => manager.defineProperty(Symbol(), null, { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), undefined, { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), faker.datatype.number(), { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), faker.datatype.boolean(), { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), faker.datatype.datetime(), { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), faker.datatype.array(), { id: faker.datatype.string() })).toThrow(WRONG_NAME);
        expect(() => manager.defineProperty(Symbol(), JSON.parse(faker.datatype.json()), { id: faker.datatype.string() })).toThrow(WRONG_NAME);

        const WRONG_DEP =
              `[${MODULE_KEY}] defineProperty Error: wrong dep`;

        expect(() => manager.defineProperty(Symbol(), Symbol(), null)).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), undefined)).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), faker.datatype.number())).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), faker.datatype.boolean())).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), faker.datatype.datetime())).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), JSON.parse(faker.datatype.json()))).toThrow(WRONG_DEP);
        expect(() => manager.defineProperty(Symbol(), Symbol(), [ faker.datatype.string() ])).toThrow(WRONG_DEP);

        const id = faker.datatype.uuid();
        const WRONG_NOT_FOUND =
              `[${MODULE_KEY}] defineProperty Error: not found ${id}`;

        expect(() => manager.defineProperty(id, faker.datatype.string(), { id: faker.datatype.string() })).toThrow(WRONG_NOT_FOUND);

        const name = faker.random.word();
        const WRONG_DUPLICATE =
          `[${MODULE_KEY}] defineProperty Error: duplicate ${name}`;

        manager.add(id, [], () => {});
        manager.defineProperty(id, name, { id: faker.datatype.string() });
        expect(() => manager.defineProperty(id, name, { id: faker.datatype.string() })).toThrow(WRONG_DUPLICATE);

      });

    });

    describe('init', () => {

      it('simple', async () => {

        const id = faker.datatype.uuid();
        const property = faker.random.word();
        const depID = faker.datatype.uuid();
        const depModule = Symbol();

        provider.define(depID, [], () => depModule);
        manager.add(id, [], TestModel);
        manager.defineProperty(id, property, { id: depID });
        manager.init();

        const [ instance ] = await provider.require({ id });
        expect(instance).toBeInstanceOf(TestModel);
        expect(instance[property]).toBe(depModule);

      });

    });

  });

});
