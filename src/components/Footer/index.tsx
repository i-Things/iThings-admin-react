import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  return (
    <DefaultFooter
      copyright={`厂务系统`}
      links={[
        {
          key: 'frontend',
          title: 'fmcs',
          href: 'http://scm.enet51.com/fmcs/frontend',
          blankTarget: true,
        }
      ]}
    />
  );
};
