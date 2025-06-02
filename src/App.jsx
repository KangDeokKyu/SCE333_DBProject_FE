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

const dummyPosts = [
  { id: 1, title: '생수 2L 인당 2개씩 공동구매할 분 구합니다', category: '생수', current: 2, total: 3 },
  { id: 2, title: '햇반 18개 공동구매 구합니다!', category: '음식', current: 3, total: 6 },
  { id: 3, title: '기숙사에 사는 사람 중 다우니 공구할 사람', category: '생활용품', current: 0, total: 2 },
]

function App() {
  const [page, setPage] = useState('main')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const renderPage = () => {
    switch (page) {
      case 'search':
        return <SearchPage onBack={() => setPage('main')} />
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
      case 'detail':
        return (
          <PostDetailPage
            post={selectedPost}
            onBack={() => setPage('main')}
            onParticipate={() => setPage('participate')}
          />
        )
      case 'participate':
        return <ParticipatePage 
          onBack={() => setPage('detail')} 
          onChatting={() => setPage('chatting')}
          />
      case 'chatting':
        return <ChattingPage onBack={() => setPage('participate')} />
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 16,
                gap: 12,
                borderBottom: '1px solid #ddd',
              }}
            >
              <button onClick={() => setPage('search')} style={{ fontSize: 18 }}>🔍</button>
              <button onClick={() => setPage('notification')} style={{ fontSize: 18 }}>💬</button>
              <button onClick={() => setPage('profile')} style={{ fontSize: 18 }}>👤</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {dummyPosts.map((post) => (
                <div key={post.id} onClick={() => {
                  setSelectedPost(post);
                  setPage('detail');
                }}>
                  <PostCard
                    title={post.title}
                    category={post.category}
                    current={post.current}
                    total={post.total}
                  />
                </div>
              ))}
            </div>

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
