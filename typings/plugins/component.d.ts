/**
 * 组件元数据
 */
export type ComponentMetadata = {
    /**
     * 定义组件id
     */
    id?: any;
    /**
     * 组件构建依赖
     */
    deps?: Array<any>;
    /**
     * 组件构建工厂
     */
    factory?: any;
};
/**
 * 组件属性元数据
 */
export type ComponentPropertyMetadata = {
    /**
     * 定义组件id
     */
    id?: any;
    /**
     * 组件属性名
     */
    name: string | Symbol;
    /**
     * 组件属性依赖
     */
    dep: any;
};
export const MODULE_KEY: string;
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
export class ComponentPlugin {
    /**
     * 组件处理插件构造函数
     * @see {@link module:lib/component_manager~ComponentManager} 组件管理器类
     * @class
     * @param {ComponentManager} manager 组件管理器实例
     */
    constructor(manager: ComponentManager);
    /**
     *检查是否为匹配模块
     * @see {@link module:lib/engine~EngineModule} 引擎模块类型
     * @param {EngineModule} module 检查的模块
     * @return {boolean} true:匹配/false:不匹配
     */
    match(module: any): boolean;
    /**
     *使用模块方法
     * @see {@link module:lib/engine~EngineModule} 引擎模块类型
     * @param {EngineModule} module 使用的模块
     */
    use(module: any): Promise<void>;
    [COMPONENT_MANAGER]: ComponentManager;
}
/**
 * 定义组件
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentMetadata} 组件元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ComponentMetadata} metadatas 组件元数据
 * @return {EngineModule} 引擎模块对象
 */
export function defineComponent(target: any, ...metadatas: ComponentMetadata[]): any;
/**
 * 定义组件
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/component~ComponentPropertyMetadata} 组件属性元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ComponentPropertyMetadata} metadatas 组件属性元数据
 * @return {EngineModule} 引擎模块对象
 */
export function defineComponentProperty(target: any, ...metadatas: ComponentPropertyMetadata[]): any;
declare const COMPONENT_MANAGER: unique symbol;
import { ComponentManager } from "../lib/component_manager";
export {};
