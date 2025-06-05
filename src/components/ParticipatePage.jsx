import React, { useState } from 'react'
import Header from './Header'

function ParticipatePage({ post, onBack, onNext }) {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [dept, setDept] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dorm, setDorm] = useState('')
  const [bank, setBank] = useState('')
  const [refundAccount, setRefundAccount] = useState('')

  const handleNext = () => {
    console.log('ParticipatePage.handleNext 호출됨, post.id =', post?.id)
    if (
      !name.trim() ||
      !studentId.trim() ||
      !dept.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !dorm.trim() ||
      !bank.trim() ||
      !refundAccount.trim()
    ) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    const participantInfo = {
      name,
      studentId,
      dept,
      phone,
      email,
      dorm,
      bank,
      refundAccount,
    }

    onNext(post.id, participantInfo)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header title="공동구매 참여하기" onBack={onBack} />
      <div style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5', overflowY: 'auto' }}>
        {/* 예시 폼 */}
        <p>이름</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>학번</p>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>학과</p>
        <input
          type="text"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>연락처</p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-1234-5678"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>이메일</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xxx@ajou.ac.kr"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>기숙사</p>
        <input
          type="text"
          value={dorm}
          onChange={(e) => setDorm(e.target.value)}
          placeholder="일신관"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>은행</p>
        <input
          type="text"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          placeholder="국민은행 등"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <p>환불 계좌</p>
        <input
          type="text"
          value={refundAccount}
          onChange={(e) => setRefundAccount(e.target.value)}
          placeholder="123-456-7890"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #ddd', backgroundColor: '#fff' }}>
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '12px 0',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: 16,
            fontWeight: 500,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default ParticipatePage
