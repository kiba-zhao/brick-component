/**
 * @fileOverview 简单示例测试代码
 * @name simple.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { createEngine, setup, ReadyPlugin, Provider } = require('brick-engine');


describe('simple', () => {

  it('simple', async () => {

    const app = require('./fixtures/apps/simple');
    const provider = new Provider();
    const engine = await createEngine(provider);
    await setup(engine, app);
    await engine.mount(ReadyPlugin, { deps: [{ id: Provider }] });

    const [ component ] = await provider.require({ id: app.Component });

    expect(component).toBeInstanceOf(app.Component);
    expect(component.p1).toBe(app.depProperty);
  });

});
