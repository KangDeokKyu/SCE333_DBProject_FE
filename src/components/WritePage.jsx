// src/components/WritePage.jsx
import { useState, useRef } from 'react'
import Header from './Header'

/**
 * WritePage 컴포넌트
 *
 * Props:
 *  - onBack: () => void
 *  - onCreatePost: (newPostData: {
 *        title: string,
 *        content: string,
 *        category: string,        // 새로 추가된 카테고리
 *        maxParticipants: number,
 *        deadline: string,        // YYYY-MM-DD
 *        images: File[],
 *        price: number
 *      }) => void
 */
function WritePage({ onBack, onCreatePost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // (추가) 카테고리 입력
  const [category, setCategory] = useState('')

  const [maxParticipants, setMaxParticipants] = useState(1)
  const [price, setPrice] = useState(0)
  const [deadline, setDeadline] = useState('')
  const [images, setImages] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])

  const fileInputRef = useRef(null)

  const increment = () => setMaxParticipants((prev) => prev + 1)
  const decrement = () => setMaxParticipants((prev) => Math.max(1, prev - 1))

  // 이미지 첨부 버튼 클릭 → 숨겨둔 input 클릭
  const handleClickImageButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // file input에서 파일 선택 시
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setImages(files)
    // 이전에 만든 URL 해제
    previewUrls.forEach((url) => URL.revokeObjectURL(url))
    const newUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newUrls)
  }

  // “작성하기” 버튼 클릭
  const handleSubmit = () => {
    // 필수 입력 체크
    if (
      !title.trim() ||
      !content.trim() ||
      !category.trim() ||    // 카테고리도 필수로 체크
      price <= 0 ||
      !deadline
    ) {
      alert('제목, 내용, 카테고리, 가격, 마감일을 모두 입력해주세요.')
      return
    }

    // 새 게시물 데이터 객체
    const newPostData = {
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),          // 추가
      maxParticipants,
      deadline,                           // YYYY-MM-DD
      images,                             // File 배열 (나중에 백엔드 업로드 시 사용)
      price,                              // price
    }

    // 상위 App.jsx로 전달
    onCreatePost(newPostData)

    // 선택 사항: 입력 필드 초기화
    setTitle('')
    setContent('')
    setCategory('')
    setMaxParticipants(1)
    setPrice(0)
    setDeadline('')
    setImages([])
    previewUrls.forEach((url) => URL.revokeObjectURL(url))
    setPreviewUrls([])

    // 뒤로가기 → 메인 화면으로
    onBack()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더 */}
      <Header title="게시글 작성" onBack={onBack} />

      {/* 본문 스크롤 영역 */}
      <div
        style={{
          padding: 16,
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* 1. 제목 */}
        <div>
          <label>게시글 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={{
              width: '100%',
              padding: 8,
              marginTop: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        {/* 2. 내용 */}
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={5}
            style={{
              width: '100%',
              padding: 8,
              marginTop: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              resize: 'vertical',
              fontSize: 16,
            }}
          />
        </div>

        {/* 3. 카테고리 (추가) */}
        <div>
          <label>카테고리</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="예시: 생수, 음식, 생활용품"
            style={{
              width: '100%',
              padding: 8,
              marginTop: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        {/* 4. 가격 */}
        <div>
          <label>가격 (원)</label>
          <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="금액을 입력하세요"
            style={{
              width: '100%',
              padding: 8,
              marginTop: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        {/* 5. 최대 참여자 */}
        <div>
          <label>최대 참여자</label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 8,
              gap: 12,
            }}
          >
            <button onClick={decrement} style={buttonStyle}>
              -
            </button>
            <span style={{ fontSize: 16 }}>{maxParticipants}</span>
            <button onClick={increment} style={buttonStyle}>
              +
            </button>
          </div>
        </div>

        {/* 6. 마감일 */}
        <div>
          <label>마감일</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              marginTop: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        {/* 7. 사진 첨부 */}
        <div>
          <label>사진 첨부하기</label>
          <button
            onClick={handleClickImageButton}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #28a745',
              backgroundColor: '#fff',
              color: '#28a745',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <span role="img" aria-label="camera">
              📷
            </span>
            사진 선택하기
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImagesChange}
          />
        </div>

        {/* 8. 이미지 미리보기 */}
        {previewUrls.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 8,
            }}
          >
            {previewUrls.map((url, idx) => (
              <div
                key={idx}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  backgroundColor: '#f0f0f0',
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 하단: 작성하기 버튼 */}
      <div style={{ padding: 16, borderTop: '1px solid #ddd' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#28a745',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          작성하기
        </button>
      </div>
    </div>
  )
}

// + / - 버튼 스타일
const buttonStyle = {
  width: 32,
  height: 32,
  fontSize: 20,
  fontWeight: 'bold',
  borderRadius: '50%',
  border: '1px solid #007bff',
  backgroundColor: '#fff',
  color: '#007bff',
  cursor: 'pointer',
}

export default WritePage
