import { postSystemUserCaptcha, postSystemUserLogin } from '@/services/iThingsapi/yonghuguanli';
import { setToken, setUID } from '@/utils/utils';
import { FontColorsOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { Checkbox, Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import type { loginType } from './data';
import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [captchaURL, setCaptchaURL] = useState<string>('');
  const [codeID, setCodeID] = useState<string>('');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };
  const fetchCaptcha = async () => {
    const body = {
      type: 'sms',
      data: '',
      use: 'login',
    };

    postSystemUserCaptcha(body).then((res) => {
      setCodeID(res?.data?.codeID ?? '');
      setCaptchaURL(res?.data?.url ?? '');
    });
  };

  const handleSubmit = async (values: loginType) => {
    try {
      const body = {
        userID: values.userID,
        pwdType: 1,
        password: values.password,
        loginType: 'pwd',
        code: values.code,
        codeID: codeID,
      };

      // 登录
      const msg = await postSystemUserLogin(body);
      if (msg.data.token?.accessToken) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        setToken(msg.data.token.accessToken);
        setUID(msg?.data?.info?.uid ?? '');

        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
      await fetchCaptcha();
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <div className={styles.container}>
      <Row>
        <Col flex="auto">
          <div className={styles['content-wrap']}>
            <div className={styles.content}>
              <p className={styles.title}>iThings</p>
              <p className={styles['sub-title']}>欢迎使用</p>
              <LoginForm
                initialValues={{
                  userID: 'administrator',
                  password: 'iThings666',
                }}
                onFinish={async (values) => {
                  await handleSubmit(values as loginType);
                }}
              >
                <ProFormText
                  name="userID"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名: 17052709767'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码: yl'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  countDown={1}
                  fieldProps={{
                    size: 'large',
                    prefix: <FontColorsOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                    className: styles['code-input'],
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={() => {
                    return <img className={styles.captcha} src={captchaURL} alt="" />;
                  }}
                  name="code"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: '请输入验证码！',
                  //   },
                  // ]}
                  onGetCaptcha={async () => {
                    await fetchCaptcha();
                    message.success('刷新验证码成功！');
                  }}
                />
                <div className={styles.mrb24}>
                  <Checkbox onChange={() => {}}>记住密码</Checkbox>
                </div>
              </LoginForm>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
