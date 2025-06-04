// src/components/PostDetailPage.jsx
import React, { useState } from "react";
import Header from "./Header";

function PostDetailPage({ post, onBack, onParticipate }) {
  // 1) 댓글 데이터를 저장할 state
  //    replies: [] 배열을 추가하여 대댓글을 관리할 수 있도록 함
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "익명",
      content: "댓글 예시입니다.",
      replies: [], // 이 댓글에 딸린 대댓글을 저장할 배열
    },
  ]);

  // 2) 새로운 댓글 입력값
  const [newComment, setNewComment] = useState("");

  // 3) “지금 대댓글을 작성 중인(답글 달기) 댓글의 id”
  //    클릭한 댓글의 id를 저장해두면, 해당 댓글 밑에 textarea를 표시할 수 있음
  const [replyingId, setReplyingId] = useState(null);

  // 4) 대댓글 입력값 (textarea)
  const [replyContent, setReplyContent] = useState("");

  // 댓글 삭제 (휴지통 아이콘 클릭 시)
  const handleDeleteComment = (commentId) => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      // 만약 방금 삭제한 댓글이 답글 입력 중인 상태라면, 입력폼 닫기
      if (replyingId === commentId) {
        setReplyingId(null);
        setReplyContent("");
      }
    }
  };

  // 대댓글 삭제 (해당 댓글의 replies 배열에서 삭제)
  const handleDeleteReply = (commentId, replyId) => {
    if (window.confirm("정말 이 대댓글을 삭제하시겠습니까?")) {
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === commentId) {
            return {
              ...c,
              replies: c.replies.filter((r) => r.id !== replyId),
            };
          }
          return c;
        })
      );
    }
  };

  // 댓글(원댓글) 등록하기
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }
    const nextId =
      comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;
    const added = {
      id: nextId,
      author: "익명",
      content: newComment.trim(),
      replies: [],
    };
    setComments((prev) => [...prev, added]);
    setNewComment("");
  };

  // 대댓글(답글) 등록하기
  const handleAddReply = (commentId) => {
    if (replyContent.trim() === "") {
      alert("대댓글을 입력해주세요.");
      return;
    }
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          // 이 댓글에 이미 달린 대댓글이 있다면, 가장 큰 ID에 +1
          const nextReplyId =
            c.replies.length > 0
              ? Math.max(...c.replies.map((r) => r.id)) + 1
              : 1;
          const newReply = {
            id: nextReplyId,
            author: "익명",
            content: replyContent.trim(),
          };
          return {
            ...c,
            replies: [...c.replies, newReply],
          };
        }
        return c;
      })
    );
    // 대댓글 작성 후 입력폼 닫기 및 내용 초기화
    setReplyingId(null);
    setReplyContent("");
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* --- 상단 헤더: 뒤로가기 + 제목 --- */}
      <Header title="게시글 상세" onBack={onBack} />

      {/* --- 본문 영역: 게시글 정보 + 댓글 리스트 --- */}
      <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
        {/* 게시글 대표 이미지 (예시 영역) */}
        <div
          style={{
            marginBottom: 16,
            backgroundColor: "#e6f0ff",
            height: 160,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span role="img" aria-label="image" style={{ fontSize: 48 }}>
            🖼️
          </span>
        </div>

        {/* 게시글 제목, 카테고리, 참여 인원 */}
        <div style={{ fontWeight: "bold", fontSize: 20 }}>{post.title}</div>
        <div style={{ color: "#999", marginTop: 4 }}>{post.category}</div>
        <div style={{ marginTop: 8, fontWeight: "bold", color: "#007bff" }}>
          {post.current}/{post.total}
        </div>

        {/* ======================= 댓글 섹션 ======================= */}
        <div style={{ marginTop: 24 }}>
          <h3>댓글</h3>

          {/* 1) 실제 댓글 리스트 */}
          {comments.length === 0 ? (
            <div
              style={{
                padding: 8,
                border: "1px solid #ddd",
                borderRadius: 8,
                color: "#555",
              }}
            >
              등록된 댓글이 없습니다.
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} style={{ marginBottom: 16 }}>
                {/* 댓글 본문 카드 */}
                <div
                  style={{
                    padding: 12,
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    position: "relative",
                  }}
                >
                  {/* 댓글 작성자 */}
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      marginBottom: 4,
                    }}
                  >
                    {c.author}
                  </div>
                  {/* 댓글 내용 */}
                  <div style={{ fontSize: 14, color: "#222" }}>{c.content}</div>

                  {/* 댓글 우측 아이콘(답글 + 삭제) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    {/* 답글 아이콘(💬) 클릭 시 해당 댓글 id로 대댓글 입력폼 표시 */}
                    <span
                      onClick={() => {
                        // 이미 같은 댓글에서 대댓글 중이라면 토글(닫기) 처리
                        if (replyingId === c.id) {
                          setReplyingId(null);
                          setReplyContent("");
                        } else {
                          setReplyingId(c.id);
                          setReplyContent("");
                        }
                      }}
                      style={{ cursor: "pointer" }}
                      title="답글 달기"
                    >
                      💬
                    </span>

                    {/* 휴지통 아이콘(🗑️) 클릭 시 댓글 삭제 */}
                    <span
                      onClick={() => handleDeleteComment(c.id)}
                      style={{ cursor: "pointer" }}
                      title="댓글 삭제"
                    >
                      🗑️
                    </span>
                  </div>
                </div>

                {/* 2) 이 댓글에 달린 “대댓글” 리스트 (있다면 들여쓰기하여 표시) */}
                {c.replies &&
                  c.replies.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        display: "flex",
                        marginTop: 8,
                        padding: 8,
                        marginLeft: 20,
                        border: "1px solid #eee",
                        borderRadius: 8,
                        backgroundColor: "#fafafa",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{ fontSize: 13, color: "#555", marginRight: 8 }}
                      >
                        └ {r.author}
                      </div>
                      <div style={{ fontSize: 14, color: "#333", flex: 1 }}>
                        {r.content}
                      </div>
                      {/* 대댓글 우측 휴지통 아이콘 ONLY (답글은 지원하지 않음) */}
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <span
                          onClick={() => handleDeleteReply(c.id, r.id)}
                          style={{ cursor: "pointer" }}
                          title="대댓글 삭제"
                        >
                          🗑️
                        </span>
                      </div>
                    </div>
                  ))}

                {/* 3) “답글을 작성 중인” 댓글이라면, 대댓글 입력창을 표시 */}
                {replyingId === c.id && (
                  <div
                    style={{
                      marginTop: 12,
                      marginLeft: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="답글을 입력하세요"
                      style={{
                        width: "100%",
                        height: 60,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        resize: "vertical",
                        fontSize: 14,
                      }}
                    />
                    <div style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleAddReply(c.id)}
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "6px 12px",
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                      >
                        답글 등록
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* 4) 새로운 댓글 입력창(원댓글) */}
        <div style={{ marginTop: 24 }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            style={{
              width: "100%",
              height: 80,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
              resize: "vertical",
              fontSize: 14,
            }}
          />
          <div style={{ textAlign: "right", marginTop: 8 }}>
            <button
              onClick={handleAddComment}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 12px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 하단 고정 “참여하기” 버튼 ---------------- */}
      <div style={{ padding: 16, borderTop: "1px solid #ddd" }}>
        <button
          onClick={onParticipate}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "bold",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          참여하기
        </button>
      </div>
    </div>
  );
}

export default PostDetailPage;
