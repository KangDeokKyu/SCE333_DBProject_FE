import Header from './Header'

function NotificationPage({ onBack }) {
  return (
    <div>
      <Header title="알림" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p>알림 구성은 생략됨 (테스트용)</p>
      </div>
    </div>
  )
}

export default NotificationPage
