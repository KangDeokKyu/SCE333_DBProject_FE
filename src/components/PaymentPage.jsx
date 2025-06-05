import React from 'react'
import Header from './Header'

function PaymentPage({ post, onBack, onPaymentDone }) {
  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header title="서비스 계좌에 구매대금을 입금해주세요." onBack={onBack} />
      <div style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
        <p style={{ marginBottom: 16 }}>
          아래의 모이삼 공식 계좌에 <strong>{post.price.toLocaleString()}원</strong>을 입금해 주세요!
        </p>
        <p style={{ marginBottom: 8, color: '#555' }}>
          공동구매가 진행되지 않을 경우, 전액 환불해 드립니다.
        </p>

        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>국민은행</span>
          <span style={{ fontSize: 16 }}>1234-5678-9012 모이삼</span>
        </div>

        <button
          onClick={() => {
            console.log('PaymentPage: 입금 완료 버튼 클릭')
            onPaymentDone()
          }}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          입금 완료
        </button>
      </div>
    </div>
  )
}

export default PaymentPage
