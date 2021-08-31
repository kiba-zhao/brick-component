/**
 * @fileOverview 简单示例目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineApplication, defineModule, defineProviderFactory } = require('brick-engine');
const { setupComponentPlugin } = require('../../../..');
const { Component } = require('./component');

exports.Component = Component;

const depProperty = Symbol('depProperty');
exports.depProperty = depProperty;

const app = {};

defineApplication(exports, app);
defineProviderFactory(app, { id: 'depId', factory: () => depProperty });

setupComponentPlugin(app);
defineModule(app, Component);

