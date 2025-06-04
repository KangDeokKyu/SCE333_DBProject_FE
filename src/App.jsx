// src/App.jsx
import React, { useState } from 'react'
import SearchPage from './components/SearchPage'
import NotificationPage from './components/NotificationPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import WritePage from './components/WritePage'
import PostCard from './components/PostCard'
import PostDetailPage from './components/PostDetailPage'
import ParticipatePage from './components/ParticipatePage'
import ChattingPage from './components/ChattingPage'
import ChatRoomPage from './components/ChatRoomPage'

const dummyPosts = [
  { id: 1, title: '생수 2L 인당 2개씩 공동구매할 분 구합니다', category: '생수', current: 2, total: 3 },
  { id: 2, title: '햇반 18개 공동구매 구합니다!', category: '음식', current: 3, total: 6 },
  { id: 3, title: '기숙사에 사는 사람 중 다우니 공구할 사람', category: '생활용품', current: 0, total: 2 },
]

function App() {
  const [page, setPage] = useState('main')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // (1) 참여한 게시물 ID 목록을 관리
  const [joinedPosts, setJoinedPosts] = useState([])

  // (2) SearchPage에서 선택된 게시물로 상세 페이지를 여는 핸들러
  const handleSearchSelect = (post) => {
    setSelectedPost(post)
    setPage('detail')
  }

  // (3) 참여한 게시물만 ChatRoomPage로 전달하기 위해 객체 배열 형태로 변환
  const chatRooms = dummyPosts
    .filter((p) => joinedPosts.includes(p.id))
    .map((p) => ({ id: p.id, name: p.title }))

  const renderPage = () => {
    switch (page) {
      // ─────────────────────────────────────────────────────────────────
      case 'search':
        return (
          <SearchPage
            posts={dummyPosts.filter((p) => !joinedPosts.includes(p.id))}
            onBack={() => setPage('main')}
            onSelect={handleSearchSelect}
          />
        )

      case 'notification':
        return <NotificationPage onBack={() => setPage('main')} />

      case 'profile':
        return isLoggedIn ? (
          <ProfilePage
            onBack={() => setPage('main')}
            onLogout={() => {
              const confirmLogout = window.confirm('로그아웃 하시겠습니까?')
              if (confirmLogout) {
                setIsLoggedIn(false)
                setPage('main')
              }
            }}
          />
        ) : (
          <LoginPage
            onLogin={() => {
              setIsLoggedIn(true)
              setPage('main')
            }}
            onBack={() => setPage('main')}
            onRegister={() => setPage('register')}
          />
        )

      case 'register':
        return <RegisterPage onBack={() => setPage('profile')} />

      case 'write':
        return <WritePage onBack={() => setPage('main')} />

      // ─────────────────────────────────────────────────────────────────
      case 'detail':
        return (
          <PostDetailPage
            post={selectedPost}
            onBack={() => setPage('main')}
            onParticipate={() => {
              // 참여하기 누르면 joinedPosts에 ID를 추가
              if (!joinedPosts.includes(selectedPost.id)) {
                setJoinedPosts((prev) => [...prev, selectedPost.id])
              }
              setPage('participate')
            }}
          />
        )

      case 'participate':
        return (
          <ParticipatePage
            onBack={() => setPage('detail')}
            onChatting={() => setPage('chatroom')}
            onLeave={() => {
              // 이 부분을 “나가기” → ChatRoomPage에서 보던 방식 → 이제 메인으로 복귀
              setPage('main')
            }}
          />
        )

      case 'chatting':
        return <ChattingPage onBack={() => setPage('participate')} />

      // ─────────────────────────────────────────────────────────────────
      case 'chatroom':
        return (
          <ChatRoomPage
            rooms={chatRooms}
            onBack={() => setPage('main')}
            onLeave={(roomId) => {
              // “나가기” 클릭 시 해당 roomId를 joinedPosts에서 제거
              setJoinedPosts((prev) => prev.filter((id) => id !== roomId))
              // 채팅방 목록 화면 → 메인 화면으로 돌아가기
              setPage('main')
            }}
          />
        )
      // ─────────────────────────────────────────────────────────────────

      default:
        // 메인 화면: joinedPosts에 포함되지 않는 게시물만 보이도록 필터링
        const visiblePosts = dummyPosts.filter((post) => !joinedPosts.includes(post.id))

        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* 상단 헤더: 검색, 채팅룸, 알림, 프로필 버튼 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 16,
                gap: 12,
                borderBottom: '1px solid #ddd',
              }}
            >
              {/* 검색 버튼 */}
              <button
                onClick={() => setPage('search')}
                style={{ fontSize: 18 }}
                title="검색"
              >
                🔍
              </button>

              {/* 채팅룸 버튼 */}
              <button
                onClick={() => setPage('chatroom')}
                style={{ fontSize: 18 }}
                title="채팅룸"
              >
                💬
              </button>

              {/* 알림 버튼 */}
              <button
                onClick={() => setPage('notification')}
                style={{ fontSize: 18 }}
                title="알림"
              >
                🔔
              </button>

              {/* 프로필 버튼 */}
              <button
                onClick={() => setPage('profile')}
                style={{ fontSize: 18 }}
                title="프로필"
              >
                👤
              </button>
            </div>

            {/* 게시글 목록 (스크롤 가능) */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {visiblePosts.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#666',
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
                      setSelectedPost(post)
                      setPage('detail')
                    }}
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
                borderTop: '1px solid #ddd',
                padding: 12,
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setPage('write')}
            >
              <span style={{ fontSize: 20 }}>✏️ 게시글 작성</span>
            </div>
          </div>
        )
    }
  }

  return <>{renderPage()}</>
}

export default App
