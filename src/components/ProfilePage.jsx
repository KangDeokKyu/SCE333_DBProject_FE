import Header from './Header'

function ProfilePage({ onBack, onLogout }) {
  return (
    <div>
      <Header title="프로필" onBack={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        <button>내 정보</button>
        <button>거래 기록</button>
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </div>
  )
}

export default ProfilePage
