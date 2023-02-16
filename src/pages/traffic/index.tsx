import { DatePicker, Image, Space, Table, TimePicker } from 'antd'
import PageLayout from '_components/PageLayout';
import styles from './s.module.scss';

function App() {


  return (
    <PageLayout>
      <Space>
        <DatePicker/>
        <TimePicker/>
      </Space>
      <Space>
        <Table/>
        <div>
          weather
        </div>
      </Space>
      <Image/>
    </PageLayout>
  )
}

export default App
