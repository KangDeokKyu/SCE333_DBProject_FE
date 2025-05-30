import { useState } from 'react'
import Header from './Header'

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
