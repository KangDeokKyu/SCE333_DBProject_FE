import { useState } from 'react'
import Header from './Header'

function WritePage({ onBack }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [maxParticipants, setMaxParticipants] = useState(1)

  const increment = () => setMaxParticipants(prev => prev + 1)
  const decrement = () => setMaxParticipants(prev => Math.max(1, prev - 1))

  const handleSubmit = () => {
    // 여기에 게시글 저장 로직 추가 가능
    onBack() // 메인화면으로 돌아감
  }

  return (
    <div>
      <Header title="게시글 작성" onBack={onBack} />

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <label>게시글 제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={5}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              resize: 'none'
            }}
          />
        </div>

        <div>
          <label>최대 참여자</label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 12 }}>
            <button onClick={decrement} style={buttonStyle}>-</button>
            <span>{maxParticipants}</span>
            <button onClick={increment} style={buttonStyle}>+</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: 40 }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          작성 완료
        </button>
      </div>
    </div>
  )
}

const buttonStyle = {
  width: 32,
  height: 32,
  fontSize: 20,
  fontWeight: 'bold',
  borderRadius: '50%',
  border: '1px solid #007bff',
  backgroundColor: '#fff',
  color: '#007bff',
  cursor: 'pointer'
}

export default WritePage
