// src/App.jsx
import React, { useState } from "react";
import SearchPage from "./components/SearchPage";
import NotificationPage from "./components/NotificationPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import RegisterPage from "./components/RegisterPage";
import WritePage from "./components/WritePage";
import PostCard from "./components/PostCard";
import PostDetailPage from "./components/PostDetailPage";
import ParticipatePage from "./components/ParticipatePage";
import PaymentPage from "./components/PaymentPage";
import WaitingPage from "./components/WaitingPage";
import ChattingPage from "./components/ChattingPage";
import ChatRoomPage from "./components/ChatRoomPage";

// ─────────────────────────────────────────────────────────────────────────────
// (예시) 현재 로그인한 사용자 정보
// 실제 로그인 로직을 구현하셨다면 이 예시는 필요에 따라 대체하세요.
const DUMMY_USER = {
  id: "user123",
  name: "홍길동",
};

// ─────────────────────────────────────────────────────────────────────────────
// 초기 더미 게시물 데이터
let NEXT_POST_ID = 4;
const INITIAL_POSTS = [
  {
    id: 1,
    authorId: "user123",
    authorName: "홍길동",
    title: "생수 2L 인당 2개씩 공동구매할 분 구합니다",
    category: "생수",
    content: "공동구매 합니다.",
    current: 2,
    total: 3,
    price: 99999,
    deadline: "2025-07-01",
  },
  {
    id: 2,
    authorId: "other456",
    authorName: "정태선",
    title: "햇반 18개 공동구매 구합니다!",
    category: "음식",
    content: "18개 필요하신 분 연락주세요.",
    current: 3,
    total: 6,
    price: 55000,
    deadline: "2025-06-20",
  },
  {
    id: 3,
    authorId: "user123",
    authorName: "홍길동",
    title: "기숙사에 사는 사람 중 다우니 공구할 사람",
    category: "생활용품",
    content: "함께 주문하실 분 찾습니다.",
    current: 0,
    total: 2,
    price: 15000,
    deadline: "2025-07-15",
  },
];

function App() {
  // ────────────────────────────────────────────────────────────────────────────
  // 1) 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 2) 전체 게시물(posts) 상태
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // 3) 입금 확인되어 채팅방에 실제 참여된 게시물 ID 목록
  const [joinedPosts, setJoinedPosts] = useState([]);

  // 4) 현재 보여줄 페이지 분기(state)
  //     'main', 'search', 'notification', 'profile', 'register',
  //     'write', 'detail', 'participate', 'payment', 'waiting',
  //     'chatroom', 'chatting', 'login'
  const [page, setPage] = useState("main");

  // 5) 상세보기 및 흐름에서 선택된 게시물 객체
  const [selectedPost, setSelectedPost] = useState(null);

  // ────────────────────────────────────────────────────────────────────────────
  // (A) SearchPage → 게시물 클릭 → 상세 페이지로 이동
  const handleSearchSelect = (post) => {
    setSelectedPost(post);
    setPage("detail");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (B) PostDetailPage → “참여하기” 클릭 → ParticipatePage 이동
  const handleClickParticipate = (post) => {
    setSelectedPost(post);
    setPage("participate");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (C) ParticipatePage → “다음(입금 안내)” 클릭 → PaymentPage 이동
  //     participantInfo: { name, studentId, dept, phone, email, dorm, bank, refundAccount }
  const handleGoToPayment = (postId, participantInfo) => {
    setSelectedPost((prev) => ({ ...prev, participantInfo }));
    setPage("payment");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (D) PaymentPage → “입금 완료” 클릭 → WaitingPage 이동
  const handlePaymentDone = () => {
    setPage("waiting");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (E) WaitingPage → “입금 확인 완료” 클릭 → 실제 채팅방 참여 처리 후 ChattingPage 이동
  const handleDepositConfirmed = () => {
    if (selectedPost && selectedPost.id) {
      setJoinedPosts((prev) => {
        if (!prev.includes(selectedPost.id)) {
          return [...prev, selectedPost.id];
        }
        return prev;
      });
    }
    setPage("chatting");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (F) ChatRoomPage → “나가기” 클릭 → joinedPosts에서 해당 게시물 ID 제거 → 메인 화면으로 이동
  const handleChatLeave = (roomId) => {
    setJoinedPosts((prev) => prev.filter((id) => id !== roomId));
    setPage("main");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (G) WritePage → “작성하기” 클릭 시 호출되는 콜백
  //     newPostData: { title, content, category, maxParticipants, deadline, images, price }
  const handleCreatePost = (newPostData) => {
    const newId = NEXT_POST_ID++;
    const newPost = {
      id: newId,
      authorId: currentUser ? currentUser.id : null,
      authorName: currentUser ? currentUser.name : "익명",
      title: newPostData.title,
      content: newPostData.content,
      category: newPostData.category,
      current: 0,
      total: newPostData.maxParticipants,
      price: newPostData.price,
      deadline: newPostData.deadline,
      // images: newPostData.images, // 필요한 경우 백엔드로 업로드 처리
    };
    setPosts((prev) => [...prev, newPost]);
    setPage("main");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (H) 로그인 처리: LoginPage → “로그인” 버튼 클릭 시 호출
  //     dummy 예시로 아이디/비밀번호 입력 없이 즉시 로그인 처리
  const handleLogin = (userInfo) => {
    // 실제 구현 시 백엔드 인증 로직 필요
    // credentials: { username, password }
    setIsLoggedIn(true);
    setCurrentUser(userInfo);
    setPage("main");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // (I) 로그아웃 처리: ProfilePage → “로그아웃” 버튼 클릭 시 호출
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPage("main");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 페이지 렌더링 분기
  const renderPage = () => {
    switch (page) {
      // ──────────────────────────────────────────────────────────────────────────
      case "login":
        return <LoginPage onLogin={handleLogin} onBack={() => setPage("main")} />;

      // ──────────────────────────────────────────────────────────────────────────
      case "search":
        return (
          <SearchPage
            posts={posts.filter((p) => !joinedPosts.includes(p.id))}
            onBack={() => setPage("main")}
            onSelect={handleSearchSelect}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "notification":
        return <NotificationPage onBack={() => setPage("main")} />;

      // ──────────────────────────────────────────────────────────────────────────
      case "profile":
        return isLoggedIn ? (
          <ProfilePage user={currentUser} onBack={() => setPage("main")} onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} onBack={() => setPage("main")} onRegister={() => setPage("register")} />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "register":
        return <RegisterPage onBack={() => setPage("profile")} />;

      // ──────────────────────────────────────────────────────────────────────────
      case "write":
        return (
          <WritePage
            onBack={() => setPage("main")}
            onCreatePost={handleCreatePost}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "detail":
        if (!selectedPost) {
          return <div style={{ padding: 16 }}>게시물을 찾을 수 없습니다.</div>;
        }
        return (
          <PostDetailPage
            post={selectedPost}
            onBack={() => setPage("main")}
            onParticipate={() => {
              if (!isLoggedIn) {
                // 로그인 상태가 아니면 먼저 로그인 페이지로 유도
                setPage("login");
              } else {
                handleClickParticipate(selectedPost);
              }
            }}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "participate":
        return (
          <ParticipatePage
            post={selectedPost}
            onBack={() => setPage("detail")}
            onNext={handleGoToPayment}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "payment":
        return (
          <PaymentPage
            post={selectedPost}
            onBack={() => setPage("participate")}
            onPaymentDone={handlePaymentDone}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "waiting":
        return (
          <WaitingPage
            post={selectedPost}
            onBack={() => setPage("payment")}
            onDepositConfirmed={handleDepositConfirmed}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      case "chatroom": {
        const rooms = posts
          .filter((p) => joinedPosts.includes(p.id))
          .map((p) => ({ id: p.id, name: p.title }));
        return (
          <ChatRoomPage
            rooms={rooms}
            onBack={() => setPage("main")}
            onLeave={handleChatLeave}
          />
        );
      }

      // ──────────────────────────────────────────────────────────────────────────
      case "chatting":
        return (
          <ChattingPage
            onBack={() => {
              if (selectedPost && joinedPosts.includes(selectedPost.id)) {
                setPage("chatroom");
              } else {
                setPage("main");
              }
            }}
          />
        );

      // ──────────────────────────────────────────────────────────────────────────
      default:
        // 메인 화면: 아직 참여(입금)하지 않은 게시물만 노출
        const visiblePosts = posts.filter((post) => !joinedPosts.includes(post.id));

        return (
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* 상단 헤더: 검색, 채팅룸, 알림, 프로필 버튼 */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 16,
                gap: 12,
                borderBottom: "1px solid #ddd",
              }}
            >
              <button
                onClick={() => setPage("search")}
                style={{ fontSize: 18 }}
                title="검색"
              >
                🔍
              </button>
              <button
                onClick={() => setPage("chatroom")}
                style={{ fontSize: 18 }}
                title="채팅룸"
              >
                💬
              </button>
              <button
                onClick={() => setPage("notification")}
                style={{ fontSize: 18 }}
                title="알림"
              >
                🔔
              </button>
              <button
                onClick={() => setPage("profile")}
                style={{ fontSize: 18 }}
                title="프로필"
              >
                👤
              </button>
            </div>

            {/* 게시물 목록 (스크롤 가능) */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {visiblePosts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#666",
                    marginTop: 32,
                    fontSize: 16,
                  }}
                >
                  참여 가능한 게시물이 없습니다.
                </div>
              ) : (
                visiblePosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedPost(post);
                      setPage("detail");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <PostCard
                      title={post.title}
                      category={post.category}
                      current={post.current}
                      total={post.total}
                    />
                  </div>
                ))
              )}
            </div>

            {/* 하단 고정: 게시글 작성 버튼 */}
            <div
              style={{
                borderTop: "1px solid #ddd",
                padding: 12,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!isLoggedIn) {
                  setPage("login");
                } else {
                  setPage("write");
                }
              }}
            >
              <span style={{ fontSize: 20 }}>✏️ 게시글 작성</span>
            </div>
          </div>
        );
    }
  };

  return <>{renderPage()}</>;
}

export default App;
