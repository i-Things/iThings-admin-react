import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  return (
    <DefaultFooter
      copyright={`iThings`}
      links={[
        {
          key: 'frontend',
          title: 'fmcs',
          href: 'http://scm.enet51.com/fmcs/frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};
