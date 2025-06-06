import { useState } from 'react'
import Header from './Header'
import { GoogleLogin } from '@react-oauth/google'

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Invalid JWT:', e)
    return {}
  }
}

function RegisterPage({ onBack, onLogin }) {
  const [googleData, setGoogleData] = useState(null)

  // 수동 입력 폼 상태
  const [studentId, setStudentId] = useState('')
  const [major, setMajor] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [dormName, setDormName] = useState('')
  const [dormRoom, setDormRoom] = useState('')

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = parseJwt(credentialResponse.credential)
    setGoogleData({
      google_id: decoded.sub,
      ajou_email: decoded.email,
      name: decoded.name || ''
    })
  }

  const handleRegister = async () => {
    if (!googleData) {
      alert('Google 로그인을 먼저 진행해주세요.')
      return
    }

    if (!studentId || !major || !phoneNum || !dormName || !dormRoom) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    const body = {
      ...googleData,
      student_id: studentId,
      major,
      phone_num: phoneNum,
      dorm_name: dormName,
      dorm_room: dormRoom
    }

    try {
      const res = await fetch('http://192.168.200.110:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (res.ok && data.status === 'success') {
        alert('회원가입 성공!')
        const userInfo = {
          ...googleData,
          student_id: studentId,
          major,
          phone_num: phoneNum,
          dorm_name: dormName,
          dorm_room: dormRoom
        }
        onLogin(userInfo)
      } else {
        alert('회원가입 실패: ' + (data?.message || '서버 오류'))
      }
    } catch (err) {
      console.error(err)
      alert('서버 통신 오류가 발생했습니다.')
    }
  }

  return (
    <div>
      <Header title="회원가입" onBack={onBack} />
      {!googleData ? (
        <div>
          <p>Google 계정으로 로그인하여 기본 정보를 가져오세요.</p>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('Google 로그인 실패')} />
        </div>
      ) : (
        <div>
          <p>Google 계정으로 로그인 완료됨: <strong>{googleData.name} ({googleData.ajou_email})</strong></p>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="학번"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="전공"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="기숙사 이름 (예: 국제학사)"
              value={dormName}
              onChange={(e) => setDormName(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="기숙사 방 번호 (예: 101)"
              value={dormRoom}
              onChange={(e) => setDormRoom(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <button onClick={handleRegister}>회원가입</button>
        </div>
      )}
    </div>
  )
}

export default RegisterPage
