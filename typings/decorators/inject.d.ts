/**
 * 注入装饰器工厂方法
 * @param {ProviderStoreKey} id 提供器id
 * @param {boolean} [required] 是否为必选
 * @param {ProviderStoreKey} [targetId] 目标提供器Id
 * @return {function(EngineModule,String):void}
 */
export function Inject(id: any, required?: boolean, targetId?: any): (arg0: any, arg1: string) => void;
