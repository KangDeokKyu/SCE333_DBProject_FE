import Header from './Header'

function ProfilePage({ user, onBack, onLogout }) {
  return (
    <div>
      <Header title="프로필" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p><strong>이름:</strong> {user?.name}</p>
        <p><strong>이메일:</strong> {user?.ajou_email}</p>
        <button onClick={onLogout} style={{ marginTop: 24 }}>로그아웃</button>
      </div>
    </div>
  )
}


export default ProfilePage
