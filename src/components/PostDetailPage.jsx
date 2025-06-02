import React from 'react'
import Header from './Header'

function PostDetailPage({ post, onBack, onParticipate }) {
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header title="게시글 상세" onBack={onBack} />
      <div style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: 16, backgroundColor: '#e6f0ff', height: 160, borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span role="img" aria-label="image" style={{ fontSize: 48 }}>🖼️</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: 20 }}>{post.title}</div>
        <div style={{ color: '#999', marginTop: 4 }}>{post.category}</div>
        <div style={{ marginTop: 8, fontWeight: 'bold', color: '#007bff' }}>{post.current}/{post.total}</div>
        <div style={{ marginTop: 24 }}>
          <p>댓글 목록</p>
          <div style={{ padding: 8, border: '1px solid #ddd', borderRadius: 8 }}>
            댓글 예시입니다.
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <textarea placeholder="댓글을 입력하세요" style={{ width: '100%', height: 80, padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
        </div>
      </div>

      {/* 하단 고정 참여하기 버튼 */}
      <div style={{ padding: 16, borderTop: '1px solid #ddd' }}>
        <button
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
          }}
          onClick={onParticipate}
        >
          참여하기
        </button>
      </div>
    </div>
  )
}

export default PostDetailPage
