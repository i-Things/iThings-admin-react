/**
 * 强制刷新页面
 */

import { useState } from 'react';

const useUpdate = () => {
  const [, update] = useState({});
  return () => update({});
};
export default useUpdate;
