/* Components */
import { Layout } from 'antd';

/* Assets */
import { ReactComponent as Logo } from '_assets/l2dark.svg';

/* Styles */
import styles from './s.module.scss';

type PageProps = { children: React.ReactNode };

// Ant design recommended layout init
const { Header, Content } = Layout;

/**
 * Layout wrapper component for reusable layout
 */
const PageLayout = ({ children }: PageProps) => {
  return (
    <div className={styles.root}>
      <Layout className={styles.layout}>
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
