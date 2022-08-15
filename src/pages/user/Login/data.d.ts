export type logigetCaptchaImgType = {
  type: string;
  use: login;
};

export type getCaptchaImgResponse = {
  codeID: string;
  url: string;
  expire: number;
};

export type loginType = {
  userID: string;
  pwdtype: number;
  password: string;
  loginType: string;
  code: string;
  codeID: string;
};

export type loginUserInfoType = {
  info?: {
    uid: string;
    userName: string;
    nickName: string;
    inviterUid: string;
    inviterId: string;
    sex: number;
    city: string;
    country: string;
    province: string;
    language: string;
    headImgUrl: string;
    createTime: string;
  };
  token?: {
    accessToken: string;
    accessExpire: string;
    refreshAfter: string;
  };
};
