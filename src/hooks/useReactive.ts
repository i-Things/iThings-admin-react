/**
 * 当我们开发组件或做功能复杂的页面时，会有大量的变量，再来看看 useState 的结构const [count, setCount] = useState<number>(0)，假设要设置 10 个变量，那么我们是不是要设置 10 个这样的结构？
 * 一种具备响应式的 useState，用法与 useState 类似，但可以动态地设置值
 * Reflect 与 Proxy: Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。详见 https://juejin.cn/post/6844904090116292616#heading-6
 *
 */

import useCreation from './useCreation';
import useLatest from './useLatest';
import useUpdate from './useUpdate';

const observer = <T extends Record<string, any>>(initialVal: T, cb: () => void): T => {
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
  });

  return proxy;
};

const useReactive = <T extends Record<string, any>>(initialState: T): T => {
  const ref = useLatest<T>(initialState);
  const update = useUpdate();

  const state = useCreation(() => {
    return observer(ref.current, () => {
      update();
    });
  }, []);

  return state;
};

export default useReactive;
