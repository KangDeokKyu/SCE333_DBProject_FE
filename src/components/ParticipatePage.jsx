import React from 'react'
import Header from './Header'

function ParticipatePage({ onBack, onChatting }) {
  return (
    <div>
      <Header title="공동구매 참여하기" onBack={onBack} />
      <p style={{ marginTop: 16 }}>
        이름
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        학번
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        학과
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        연락처
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="010-0000-0000"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        아주대 이메일 주소
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="email"
          placeholder="xxx@ajou.ac.kr"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        기숙사
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="일신관"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        은행
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <p style={{ marginTop: 16 }}>
        환불 계좌
      </p>
      <div style={{ marginBottom: 12 }}>
        <input
          type="num"
          placeholder="계좌번호"
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #ddd' }}>
        <button
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
          }}
          onClick={onChatting}
        >
          참여하기
        </button>
      </div>
    </div>
  )
}

export default ParticipatePage
