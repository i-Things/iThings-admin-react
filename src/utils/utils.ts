// 判断是否为移动端
export const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

export const TOKEN_PREFIX = "fmcs-";

export const setToken = (token: string) => {
  localStorage.setItem(`${TOKEN_PREFIX}-token`, token);
};

export const getToken = () => {
  return localStorage.getItem(`${TOKEN_PREFIX}-token`) ?? "";
};

export const setUID = (uid: string) => {
  return localStorage.setItem(`${TOKEN_PREFIX}-UID`, uid);
};

export const getUID = () => {
  return localStorage.getItem(`${TOKEN_PREFIX}-UID`) ?? "";
};

// 获取当前的时间戳，单位为 毫秒
export const getTimestamp = () => {
  return new Date().getTime();
};

export const apiParamsGUID = () => {
  return {
    "fmcs-guid": new Date().getTime() + "",
  };
};

export const apiParams = () => {
  return {
    "fmcs-guid": new Date().getTime() + "",
    "fmcs-token": getToken(),
  };
};
