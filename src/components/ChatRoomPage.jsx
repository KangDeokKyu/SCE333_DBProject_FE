// src/components/ChatRoomPage.jsx
import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";

function ChatRoomPage({ rooms: initialRooms, onBack }) {
  const [roomsState, setRoomsState] = useState(
    initialRooms.map((p) => ({
      id: p.id,
      name: p.title,
      messages: [],
    }))
  );

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [refundRoomId, setRefundRoomId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRoomId, roomsState]);

  /** 선택된 방을 roomsState에서 찾아 반환 */
  const getSelectedRoom = () => {
    return roomsState.find((room) => room.id === selectedRoomId);
  };

  /** ─────────────────────────────────────────────────────────────────
   * 목록 뷰: “나가기(환불)” 클릭하면 refundRoomId에 해당 ID를 세팅 → 환불 페이지로 전환
   * 실제 목록에서 제거는 환불 요청 완료 후 handleRequestRefund에서 처리
   */
  const handleLeaveRoom = (roomId) => {
    setRefundRoomId(roomId);
    setSelectedRoomId(null); // 혹시 채팅 중이었다면 목록으로 복귀
  };

  /** ─────────────────────────────────────────────────────────────────
   * 목록 뷰: 채팅방을 클릭하면 해당 채팅방 뷰로 전환
   */
  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setNewMessage("");
  };

  /** ─────────────────────────────────────────────────────────────────
   * 채팅 뷰: 메시지 전송 핸들러
   */
  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (trimmed === "" || selectedRoomId === null) return;

    setRoomsState((prev) =>
      prev.map((room) => {
        if (room.id === selectedRoomId) {
          const nextMsgId =
            room.messages.length > 0
              ? room.messages[room.messages.length - 1].id + 1
              : 1;
          const newMsgObj = {
            id: nextMsgId,
            author: "나",
            content: trimmed,
            timestamp: new Date(),
          };
          return {
            ...room,
            messages: [...room.messages, newMsgObj],
          };
        }
        return room;
      })
    );
    setNewMessage("");
  };

  /** ─────────────────────────────────────────────────────────────────
   * 채팅 뷰: Enter 키 입력 시 handleSendMessage 실행 (Shift+Enter는 줄바꿈 허용)
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /** ─────────────────────────────────────────────────────────────────
   * 환불 페이지에서 “환불 요청하기” 버튼 클릭 시 호출
   *  - alert를 띄운 뒤, 해당 채팅방을 roomsState에서 제거하여 목록에서 삭제
   *  - refundRoomId와 selectedRoomId를 null로 초기화
   */
  const handleRequestRefund = () => {
    alert("환불 요청이 접수되었습니다."); // 실제 API 호출 로직으로 대체 가능

    setRoomsState((prev) => prev.filter((room) => room.id !== refundRoomId));
    setRefundRoomId(null);
    setSelectedRoomId(null);
  };

  /** ─────────────────────────────────────────────────────────────────
   * 환불 페이지에서 헤더의 ← 버튼 클릭 시:
   *  - 목록 화면(환불 취소)으로 돌아가기
   */
  const handleRefundBack = () => {
    setRefundRoomId(null);
  };

  // ─────────────────────────────────────────────────────────────────
  // (A) refundRoomId가 null이 아니면 “환불 요청 페이지”를 렌더
  if (refundRoomId !== null) {
    // 환불 대상 방 정보 (나중에 API로부터 실제 환불정보를 받아오기 위해 사용)
    const refundRoom = roomsState.find((r) => r.id === refundRoomId);
    // 예시로 하드코딩된 은행명/계좌번호/금액
    const bankName = "국민은행";
    const accountNumber = "987654321";
    const refundAmount = 99999; // 예: 99,999원

    // 숫자에 콤마 찍어주는 함수
    const formatNumberWithComma = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* 상단 헤더: ← 환불 요청 페이지 제목 */}
        <Header
          title="환불계좌와 금액을 확인해주세요"
          onBack={handleRefundBack}
        />

        {/* 본문: 은행명 + 계좌번호, 환불금액 */}
        <div style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
          {/* 은행명 + 계좌번호 카드 */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: 16, color: "#333" }}>{bankName}</span>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>
              {accountNumber}
            </span>
          </div>

          {/* 환불금액 카드 */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: 16, color: "#333" }}>환불금액</span>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>
              {formatNumberWithComma(refundAmount)}원
            </span>
          </div>
        </div>

        {/* 하단 고정: 환불 요청하기 버튼 */}
        <div
          style={{
            padding: 16,
            borderTop: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <button
            onClick={handleRequestRefund}
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: "#28a745",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            환불 요청하기
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // (B) refundRoomId가 null이면서 selectedRoomId도 null → “채팅방 목록” 화면
  if (selectedRoomId === null) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* 상단 헤더: 뒤로가기 + 채팅방 목록 */}
        <Header title="채팅방 목록" onBack={onBack} />

        {/* 채팅방 목록 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            backgroundColor: "#f5f5f5",
          }}
        >
          {roomsState.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#666",
                marginTop: 32,
                fontSize: 16,
              }}
            >
              참여 중인 채팅방이 없습니다.
            </div>
          ) : (
            roomsState.map((room) => (
              <div
                key={room.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  marginBottom: 12,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectRoom(room.id)}
              >
                {/* 채팅방 이름(게시글 제목) */}
                <div style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>
                  {room.name}
                </div>

                {/* 나가기(환불) 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 방 클릭 이벤트 무시
                    handleLeaveRoom(room.id);
                  }}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "6px 12px",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  나가기
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // (C) refundRoomId가 null이지만 selectedRoomId가 숫자 → “개별 채팅방” 화면
  const currentRoom = getSelectedRoom();
  if (!currentRoom) {
    // 방이 목록에서 제거된 경우
    return (
      <div style={{ padding: 16, textAlign: "center", color: "#666" }}>
        해당 채팅방이 존재하지 않습니다.
        <br />
        <button
          onClick={() => setSelectedRoomId(null)}
          style={{
            marginTop: 16,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // (D) 개별 채팅방 화면: 메시지 UI
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 상단 헤더: ← 채팅방 이름 */}
      <Header
        title={currentRoom.name}
        onBack={() => {
          setSelectedRoomId(null);
          setNewMessage("");
        }}
      />

      {/* 메시지 목록 영역 */}
      <div
        style={{
          flex: 1,
          padding: "12px 16px",
          overflowY: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        {currentRoom.messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: 32 }}>
            대화가 시작되지 않았습니다.
          </div>
        ) : (
          currentRoom.messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: msg.author === "나" ? "row-reverse" : "row",
                alignItems: "flex-end",
                marginBottom: 12,
              }}
            >
              {/* 작성자 & 시간 */}
              <div
                style={{
                  fontSize: 12,
                  color: "#666",
                  margin: msg.author === "나" ? "0 8px 0 0" : "0 0 0 8px",
                }}
              >
                {msg.author} ·{" "}
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* 말풍선 */}
              <div
                style={{
                  backgroundColor: msg.author === "나" ? "#007bff" : "#e0e0e0",
                  color: msg.author === "나" ? "#fff" : "#333",
                  padding: "8px 12px",
                  borderRadius: 16,
                  maxWidth: "70%",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {/* 스크롤 맨 아래를 위한 빈 div */}
        <div ref={messagesEndRef} />
      </div>

      {/* 글 입력창 + 전송 버튼 */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#fff",
        }}
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요 (Enter: 전송, Shift+Enter: 줄바꿈)"
          style={{
            flex: 1,
            resize: "none",
            borderRadius: 12,
            border: "1px solid #ccc",
            padding: 8,
            fontSize: 14,
            height: 40,
            overflowY: "auto",
          }}
        />

        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatRoomPage;
