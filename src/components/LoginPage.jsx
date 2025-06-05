import { useState } from 'react'
import Header from './Header'
import { GoogleLogin } from '@react-oauth/google'

function LoginPage({ onLogin, onBack, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (email && password) {
      onLogin()
    } else {
      alert('이메일과 비밀번호를 입력해주세요.')
    }
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('http://localhost:5000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        onLogin()  // 로그인 성공 시 페이지 전환
      } else {
        alert('구글 로그인 실패: ' + data.message)
      }
    } catch (err) {
      console.error(err)
      alert('서버 통신 오류가 발생했습니다.')
    }
  }

  return (
    <div>
      <Header title="" onBack={onBack} />
      <p style={{ marginTop: 16 }}>
        Welcome to 모이삼!
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px',
          border: 'none',
          borderRadius: '6px',
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 24
        }}
      >
        Login
      </button>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            alert('Google 로그인에 실패했습니다.')
          }}
        />
      </div>

      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Not a member?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={onRegister}
        >
          Register now
        </span>
      </p>
    </div>
  )
}

export default LoginPage
