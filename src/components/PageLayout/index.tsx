import { Layout } from 'antd';
import styles from './s.module.scss';

const { Header, Content } = Layout;

type PageProps = { children: React.ReactNode };

const PageLayout = ({ children }: PageProps) => {
  return (
    <div className={styles.root}>
      <Layout>
        <Header></Header>
        <Content className={styles.divContent}>{children}</Content>
      </Layout>
    </div>
  );
};

export default PageLayout;
