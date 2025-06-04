// src/components/refund/RefundProcessingPage.jsx
import React, { useState, useEffect } from 'react'
import Header from '../Header'

/**
 * 환불 진행 중 화면 + 완료 모달
 * 
 * Props:
 *  - onComplete: () => void
 *      : "확인하기" 버튼 클릭 시 호출 (예: 메인 화면으로 이동)
 *  - onBack: () => void
 *      : 헤더 뒤로가기(←) 클릭 시 환불 요청 페이지로 되돌아가기
 */
function RefundProcessingPage({ onBack, onComplete }) {
  // 모달 표시 여부
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 후 2초(2000ms) 뒤에 모달 띄우기
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더 */}
      <Header title="잠시만 기다려 주세요..." onBack={onBack} />

      {/* 본문: 로고와 진행 안내 문구 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '16px',
        }}
      >
        {/* 모이삼 로고 (예시 이미지 또는 텍스트) */}
        <div
          style={{
            width: '150px',
            height: '150px',
            backgroundImage: 'url("/logo192.png")', // 실제 프로젝트 로고 경로로 변경
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom: '24px',
          }}
        />

        {/* 환불 진행 중 안내 텍스트 */}
        <div style={{ fontSize: '16px', color: '#28a745', fontWeight: '500' }}>
          환불이 진행 중입니다
        </div>
      </div>

      {/* 완료 모달 */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '80%',
              maxWidth: '300px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
              환불이 완료됐습니다!
            </div>
            <button
              onClick={onComplete}
              style={{
                width: '100%',
                padding: '10px 0',
                backgroundColor: '#28a745',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '500',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              확인하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RefundProcessingPage
