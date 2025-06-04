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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRoomId, roomsState]);

  const getSelectedRoom = () => {
    return roomsState.find((room) => room.id === selectedRoomId);
  };

  const handleLeaveRoom = (roomId) => {
    if (window.confirm("정말 이 채팅방에서 나가시겠습니까?")) {
      setRoomsState((prev) => prev.filter((r) => r.id !== roomId));
      if (selectedRoomId === roomId) {
        setSelectedRoomId(null);
      }
    }
  };

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setNewMessage("");
  };

  // ───────────────────────────────────────────────────────────────────────────────
  // ■ 개별 채팅(chat) 화면에서 “메시지 전송” 버튼 혹은 Enter 키 입력 시 호출
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
            author: "나", // 실제 로그인 사용자명으로 대체 가능
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

  // ■ Enter 키 누르면 handleSendMessage 호출 (Shift+Enter는 줄바꿈 허용)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // ───────────────────────────────────────────────────────────────────────────────

  // -------------- 렌더링 --------------
  // (A) selectedRoomId가 null → “채팅방 목록” 화면
  if (selectedRoomId === null) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {/* 상단 헤더: 뒤로가기 + “채팅방 목록” 제목 */}
        <Header title="채팅방 목록" onBack={onBack} />

        {/* 방 목록 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          {roomsState.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#666",
                marginTop: "32px",
                fontSize: "16px",
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
                  marginBottom: "12px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectRoom(room.id)}
              >
                {/* 방 이름(게시글 제목) */}
                <div
                  style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
                >
                  {room.name}
                </div>

                {/* “나가기” 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 클릭(방 선택)을 막기 위해
                    handleLeaveRoom(room.id);
                  }}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    fontSize: "14px",
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

  // (B) selectedRoomId가 숫자 → “개별 채팅방” 화면
  const currentRoom = getSelectedRoom();
  if (!currentRoom) {
    // 방이 목록에서 제거된 경우
    return (
      <div style={{ padding: "16px", textAlign: "center", color: "#666" }}>
        해당 채팅방이 존재하지 않습니다.
        <br />
        <button
          onClick={() => setSelectedRoomId(null)}
          style={{
            marginTop: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 상단 헤더: 뒤로가기(→목록) + 방 이름 */}
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
          <div
            style={{ textAlign: "center", color: "#888", marginTop: "32px" }}
          >
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
                marginBottom: "12px",
              }}
            >
              {/* 작성자 · 시간 */}
              <div
                style={{
                  fontSize: "12px",
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
                  borderRadius: "16px",
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

        {/* 스크롤 맨 아래로 이동시키기 위한 빈 div */}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: "8px",
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
            borderRadius: "12px",
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            height: "40px",
            overflowY: "auto",
          }}
        />

        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
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
