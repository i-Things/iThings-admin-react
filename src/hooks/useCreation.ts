/**
 * 强化 useMemo和useRef，一般用于性能优化
 *
 * 1，useMemo中，会缓存值，可能拿不到最新的值，useCreation可以拿到最新的值
 * 2, useRef在创建复杂常量的时候会出现性能隐患
 */

import type { DependencyList } from 'react';
import { useRef } from 'react';

const depsAreSame = (oldDeps: DependencyList, deps: DependencyList): boolean => {
  if (oldDeps === deps) return true;

  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
};

const useCreation = <T>(fn: () => T, deps: DependencyList): T => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T;
};

export default useCreation;
