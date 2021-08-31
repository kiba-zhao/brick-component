/**
 * @fileOverview 库目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ComponentManager } = require('./component_manager');
const { setupComponentPlugin } = require('./utils');

module.exports = { ComponentManager, setupComponentPlugin };
