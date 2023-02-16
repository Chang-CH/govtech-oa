import { Layout } from 'antd';
import { ReactComponent as Logo } from '_assets/l2dark.svg';

import styles from './s.module.scss';

const { Header, Content } = Layout;

type PageProps = { children: React.ReactNode };

const PageLayout = ({ children }: PageProps) => {
  return (
    <div className={styles.root}>
      <Layout>
        <Header
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Logo width="40px" height="40px" />
          <p style={{ color: 'white', fontSize: '1.25rem', marginLeft: '1rem' }}>Chang Chuan Hao</p>
        </Header>
        <Content className={styles.divContent}>{children}</Content>
      </Layout>
    </div>
  );
};

export default PageLayout;
