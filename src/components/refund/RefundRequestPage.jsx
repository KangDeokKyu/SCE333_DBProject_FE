// src/components/refund/RefundRequestPage.jsx
import React, { useState } from 'react'
import Header from '../Header' // 상대 경로 주의

/**
 * 환불 요청 화면
 * 
 * Props:
 *  - bankName: string (은행명, 예: '국민은행')
 *  - accountNumber: string (계좌번호, 예: '987654321')
 *  - refundAmount: number (원 단위 환불금액, 예: 99999)
 *  - onRequest: () => void (환불 요청 버튼 클릭 시 호출)
 */
function RefundRequestPage({
  bankName = '국민은행',
  accountNumber = '0000000000',
  refundAmount = 0,
  onRequest,
  onBack,
}) {
  // (선택) 외부에서 금액을 동적으로 받아올 수도 있고,
  // 여기서는 props로 받은 숫자(refundAmount)를 화면에 “9,999원” 형태로 표시합니다.
  const formatNumberWithComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더 */}
      <Header title="환불계좌와 금액을 확인해주세요" onBack={onBack} />

      {/* 본문 */}
      <div style={{ flex: 1, padding: '16px', backgroundColor: '#f5f5f5' }}>
        {/* ─ 환불 계좌(은행명 + 계좌번호) 카드 ─ */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <span style={{ fontSize: '16px', color: '#333' }}>{bankName}</span>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
            {accountNumber}
          </span>
        </div>

        {/* ─ 환불 금액 카드 ─ */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <span style={{ fontSize: '16px', color: '#333' }}>환불금액</span>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
            {formatNumberWithComma(refundAmount)}원
          </span>
        </div>
      </div>

      {/* 하단 고정 버튼: 환불 요청하기 */}
      <div style={{ padding: '16px', borderTop: '1px solid #ddd', backgroundColor: '#fff' }}>
        <button
          onClick={onRequest}
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          환불 요청하기
        </button>
      </div>
    </div>
  )
}

export default RefundRequestPage
