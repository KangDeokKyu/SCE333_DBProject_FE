// src/components/NotificationPage.jsx
import React, { useState } from 'react'
import Header from './Header'

function NotificationPage({ onBack }) {
  // 더미 알림 데이터 (나중에 서버에서 받아온 데이터로 대체 가능)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '정태선님이 게시글에 댓글을 달았습니다.',
      message: '“삼다수인가요?”',
      unreadCount: 1, // 1개 읽지 않은 알림
    },
    {
      id: 2,
      title: '공동구매 채팅방',
      message: '채팅방에 새로운 메시지가 있습니다.',
      unreadCount: 2, // 2개 읽지 않은 알림
    },
    {
      id: 3,
      title: '모이샘',
      message: '축하합니다! 첫번째 게시물을 작성하셨네요',
      unreadCount: 0, // 이미 읽은 상태
    },
  ])

  // 알림을 읽음 처리하는 함수 (unreadCount를 0으로 변경)
  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              unreadCount: 0,
            }
          : n
      )
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더: 뒤로가기 + 제목 */}
      <Header title="알림" onBack={onBack} />

      {/* 알림 리스트 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          backgroundColor: '#f5f5f5',
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#888',
              marginTop: '32px',
              fontSize: '16px',
            }}
          >
            새로운 알림이 없습니다.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              {/* 왼쪽 아이콘(프로필이나 서비스 아이콘 등) */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                  marginRight: 12,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                  color: '#aaa',
                }}
              >
                {/* 아이콘 예시: 기본 사람 모양 */}
                👤
              </div>

              {/* 중간 내용: 제목과 서브메시지 */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: '#666' }}>{item.message}</div>
              </div>

              {/* 오른쪽: 읽지 않은 개수가 있는 경우 원형 배지, 그렇지 않으면 “읽음” 텍스트 */}
              <div style={{ marginLeft: 12 }}>
                {item.unreadCount > 0 ? (
                  <div
                    onClick={() => handleMarkRead(item.id)}
                    style={{
                      minWidth: 24,
                      height: 24,
                      borderRadius: '12px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      padding: '0 6px',
                    }}
                    title="읽음 처리"
                  >
                    {item.unreadCount}
                  </div>
                ) : (
                  <div
                    onClick={() => handleMarkRead(item.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#e0e0e0',
                      color: '#555',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    title="이미 읽은 알림입니다"
                  >
                    읽음
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationPage
