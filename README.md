# brick-component #
基于[brick-engine](https://github.com/kiba-zhao/brick-engine)的组件化工具包.提供简便的组件定义与组件依赖模块注入.

## Install ##

``` shell
npm install --save brick-component
```

## Usage ##

**Setup**

``` javascript

const {defineApplication} = require('brick-engine');
const {setupComponentPlugin} = require('brick-component');

const app = {};

setupComponentPlugin(app);
defineApplication(exports, app);
```

**Component**

``` javascript

const {defineComponent, defineComponentProperty} = require('brick-component');

class Component {

    getMethod(){
        return this.field1;
    }
    
}

/* 定义组件 */
defineComponent(Component);
/* 定义组件依赖属性 */
defineComponentProperty(Component, { name: 'field1', dep: { id: 'depId' } });

exports.Component = Component;
```

## Documentations ##
使用`jsdoc`生成注释文档

``` shell
git clone https://github.com/kiba-zhao/brick-component.git
cd brick-component
npm install
npm run docs
open docs/index.html
```

## License ##
[MIT](LICENSE)
