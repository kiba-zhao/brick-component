/**
 * 组件数据
 */
export type ComponentData = {
    /**
     * 构建工厂依赖项
     */
    deps: any[];
    /**
     * 构建工厂函数
     */
    factory: any;
    /**
     * 属性注入字典
     */
    properties: Map<string | Symbol, any>;
};
export const MODULE_KEY: string;
/**
 * 组件数据
 *  @typedef {Object} ComponentData
 * @property {ProviderDependency[]} deps 构建工厂依赖项
 * @property {ProviderFactory} factory 构建工厂函数
 * @property {Map<string|Symbol,ProviderDependency>} properties 属性注入字典
 */
export class ComponentManager {
    /**
     * 依赖注入插件构造函数
     * @see {@link module:lib/provider~Provider} 提供器类
     * @class
     * @param {Provider} provider 提供器实例
     */
    constructor(provider: Provider);
    /**
     * 添加组件数据
     * @param {ProviderStoreKey} id 组件ID
     * @param {ProviderDependency[]} deps 组件构建依赖项
     * @param {ProviderFactory} factory 组件构建工厂
     */
    add(id: any, deps: any[], factory: any): void;
    /**
     * 定义属性方法
     * @param {ProviderStoreKey} id 组件Id
     * @param {string|Symbol} name 属性名
     * @param {ProviderDependency} dep 属性依赖
     */
    defineProperty(id: any, name: string | Symbol, dep: any): void;
    init(): void;
    [COMPONENT_PROVIDER]: Provider;
    [COMPONENT_STORE]: Map<any, any>;
}
declare const COMPONENT_PROVIDER: unique symbol;
import { Provider } from "brick-engine";
declare const COMPONENT_STORE: unique symbol;
export {};
