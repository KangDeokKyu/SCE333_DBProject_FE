import React, { useState, useEffect } from 'react'
import PostCard from './PostCard'
import Header from './Header'

/**
 * SearchPage 컴포넌트
 *
 * Props:
 *  - posts: Array<{ id, title, category, current, total }>
 *      : 검색 대상이 되는 게시글 배열
 *  - onBack: () => void
 *      : 뒤로가기(←) 버튼 클릭 시 호출
 *  - onSelect: (post) => void
 *      : 검색 결과에서 게시글을 클릭했을 때 호출 (App.jsx가 선택된 post를 받고 상세 페이지로 전환)
 */
function SearchPage({ posts, onBack, onSelect }) {
  const [query, setQuery] = useState('')      // 검색어 상태
  const [filtered, setFiltered] = useState([]) // 필터링된 결과 배열

  // query가 바뀔 때마다 posts를 필터링해서 filtered에 저장
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (q === '') {
      setFiltered([])
    } else {
      const results = posts.filter((p) =>
        p.title.toLowerCase().includes(q)
      )
      setFiltered(results)
    }
  }, [query, posts])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더: 뒤로가기 + “게시글 검색” 타이틀 */}
      <Header title="게시글 검색" onBack={onBack} />

      {/* 검색 입력창 */}
      <div style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목을 입력하세요"
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* 검색 결과 목록 */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#ffffff', padding: '8px 16px' }}>
        {query.trim() === '' ? (
          <div
            style={{
              textAlign: 'center',
              color: '#888',
              marginTop: '32px',
              fontSize: '16px',
            }}
          >
            검색어를 입력하면 결과가 표시됩니다.
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#888',
              marginTop: '32px',
              fontSize: '16px',
            }}
          >
            "{query}"에 대한 검색 결과가 없습니다.
          </div>
        ) : (
          filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelect(post)}
              style={{ marginBottom: 12, cursor: 'pointer' }}
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
    </div>
  )
}

export default SearchPage
