import { useState } from 'react'
import Header from './Header'

function RegisterPage({ onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    if (name && email && password) {
      alert('회원가입이 완료되었습니다.')
      onBack()
    } else {
      alert('모든 정보를 입력해주세요.')
    }
  }

  return (
    <div>
      <Header title="" onBack={onBack} />
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <button onClick={handleRegister}>회원가입</button>
    </div>
  )
}

export default RegisterPage
