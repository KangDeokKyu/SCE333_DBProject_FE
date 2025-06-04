// src/components/ChatRoomPage.jsx
import React, { useState, useRef, useEffect } from 'react'
import Header from './Header'

/**
 * ChatRoomPage 컴포넌트
 *
 * Props:
 *  - rooms: Array<{ id: number, name: string }>
 *      : 참여 중인 채팅방 목록
 *  - onBack: () => void
 *      : 헤더 뒤로가기(메인 화면으로 돌아가기) 콜백
 *  - onLeave: (roomId: number) => void
 *      : “나가기” 버튼 클릭 시 호출 (부모에서 joinedPosts에서 해당 ID를 제거)
 *
 * 내부 상태:
 *  - roomsState: rooms prop에 메시지 배열을 추가하여 [{ id, name, messages: [] }, …] 형태로 관리
 *  - selectedRoomId: null이면 목록 뷰, 숫자면 해당 채팅방 뷰
 *  - refundRoomId: 숫자면 환불 UI, null이면 환불 UI 아님
 *  - newMessage: 현재 입력 중인 채팅 메시지
 */
function ChatRoomPage({ rooms, onBack, onLeave }) {
  // rooms prop을 roomsState로 초기화 (각 방에 messages: [] 추가)
  const [roomsState, setRoomsState] = useState(
    rooms.map((room) => ({ id: room.id, name: room.name, messages: [] }))
  )
  // 환불 페이지를 띄워야 할 방 ID
  const [refundRoomId, setRefundRoomId] = useState(null)
  // 선택된 방 ID (null이면 목록, 숫자면 채팅 뷰)
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  // 입력 중인 메시지
  const [newMessage, setNewMessage] = useState('')
  // 자동 스크롤용 ref
  const messagesEndRef = useRef(null)

  // rooms prop이 바뀔 때 roomsState를 동일하게 업데이트하고, 뷰를 목록으로 리셋
  useEffect(() => {
    setRoomsState(rooms.map((room) => ({ id: room.id, name: room.name, messages: [] })))
    setSelectedRoomId(null)
    setRefundRoomId(null)
  }, [rooms])

  // 채팅방에 진입하거나 messages가 바뀔 때 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedRoomId, roomsState])

  // 선택된 방 객체 반환
  const getSelectedRoom = () => {
    return roomsState.find((room) => room.id === selectedRoomId)
  }

  /** ─ 목록 뷰: 방 클릭 시 채팅 뷰로 전환 */
  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId)
    setNewMessage('')
  }

  /** ─ 목록 뷰: 나가기 클릭 시 환불 UI로 전환 */
  const handleLeaveClick = (roomId) => {
    // 환불 요청 알림
    alert('환불 요청이 접수되었습니다.')
    // 부모 onLeave 호출하여 joinedPosts에서 제거
    onLeave(roomId)
    // 환불 UI를 표시하지 않고 바로 목록으로 돌아감
    // (onLeave가 App.jsx에서 실질적으로 방을 제거하므로 rooms prop이 바뀌며 목록 업데이트됨)
  }

  /** ─ 채팅 뷰: 메시지 전송 */
  const handleSendMessage = () => {
    const trimmed = newMessage.trim()
    if (trimmed === '' || selectedRoomId === null) return

    setRoomsState((prev) =>
      prev.map((room) => {
        if (room.id === selectedRoomId) {
          const nextMsgId =
            room.messages.length > 0
              ? room.messages[room.messages.length - 1].id + 1
              : 1
          const newMsgObj = {
            id: nextMsgId,
            author: '나', // 실제 로그인 유저명으로 대체 가능
            content: trimmed,
            timestamp: new Date(),
          }
          return {
            ...room,
            messages: [...room.messages, newMsgObj],
          }
        }
        return room
      })
    )
    setNewMessage('')
  }

  /** ─ 채팅 뷰: Enter 키 입력 시 전송 (Shift+Enter는 줄바꿈) */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // (A) 환불 UI는 필요 없으므로 제외
  // ─────────────────────────────────────────────────────────────────
  // (B) 목록 뷰: selectedRoomId가 null일 때
  if (selectedRoomId === null) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* 상단 헤더: 뒤로가기 + "채팅방 목록" */}
        <Header title="채팅방 목록" onBack={onBack} />

        {/* 채팅방 목록 */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#f5f5f5',
          }}
        >
          {roomsState.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: '#666',
                marginTop: '32px',
                fontSize: '16px',
              }}
            >
              참여 중인 채팅방이 없습니다.
            </div>
          ) : (
            roomsState.map((room) => (
              <div
                key={room.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  marginBottom: '12px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectRoom(room.id)}
              >
                {/* 채팅방 제목 */}
                <div style={{ fontSize: '16px', fontWeight: 500, color: '#333' }}>
                  {room.name}
                </div>

                {/* 나가기 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation() // 방 클릭 이벤트 무시
                    handleLeaveClick(room.id)
                  }}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  나가기
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────
  // (C) 채팅 뷰: selectedRoomId가 숫자일 때
  const currentRoom = getSelectedRoom()
  if (!currentRoom) {
    // 방이 삭제된 경우 (예: onLeave 호출 후)
    return (
      <div style={{ padding: 16, textAlign: 'center', color: '#666' }}>
        해당 채팅방이 존재하지 않습니다.
        <br />
        <button
          onClick={() => setSelectedRoomId(null)}
          style={{
            marginTop: 16,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더: ← 채팅방 이름 */}
      <Header
        title={currentRoom.name}
        onBack={() => {
          setSelectedRoomId(null)
          setNewMessage('')
        }}
      />

      {/* 메시지 목록 */}
      <div
        style={{
          flex: 1,
          padding: '12px 16px',
          overflowY: 'auto',
          backgroundColor: '#fafafa',
        }}
      >
        {currentRoom.messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>
            대화가 시작되지 않았습니다.
          </div>
        ) : (
          currentRoom.messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: msg.author === '나' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                marginBottom: 12,
              }}
            >
              {/* 작성자 · 시간 */}
              <div
                style={{
                  fontSize: 12,
                  color: '#666',
                  margin: msg.author === '나' ? '0 8px 0 0' : '0 0 0 8px',
                }}
              >
                {msg.author} ·{' '}
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {/* 말풍선 */}
              <div
                style={{
                  backgroundColor: msg.author === '나' ? '#007bff' : '#e0e0e0',
                  color: msg.author === '나' ? '#fff' : '#333',
                  padding: '8px 12px',
                  borderRadius: 16,
                  maxWidth: '70%',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {/* 스크롤 맨 아래 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력창 + 전송 버튼 */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: '#fff',
        }}
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요 (Enter: 전송, Shift+Enter: 줄바꿈)"
          style={{
            flex: 1,
            resize: 'none',
            borderRadius: 12,
            border: '1px solid #ccc',
            padding: 8,
            fontSize: 14,
            height: 40,
            overflowY: 'auto',
          }}
        />

        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatRoomPage
