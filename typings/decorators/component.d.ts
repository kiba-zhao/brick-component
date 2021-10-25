/**
 * 组件装饰器工厂方法
 * @param {...ComponentMetadata} metadatas 组件元数据
 * @return {function(EngineModule):void} 组件装饰器
 */
export function Component(...metadatas: ComponentMetadata[]): (arg0: any) => void;
import { ComponentMetadata } from "../plugins/component";
