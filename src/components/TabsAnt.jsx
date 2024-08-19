import { Tabs } from 'antd'

export default function TabsAnt({ activeTab, setActiveTab }) {
  const tabs = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  return (
    <section className="main__tabs">
      <Tabs
        tabBarStyle={{
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        defaultActiveKey="1"
        items={tabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        size="large"
        centered
      />
    </section>
  )
}
