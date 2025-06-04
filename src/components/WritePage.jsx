// src/components/WritePage.jsx
import { useState, useRef } from 'react'
import Header from './Header'

function WritePage({ onBack }) {
  // 기존 필드
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [maxParticipants, setMaxParticipants] = useState(1)

  // 새로 추가된 필드
  // 1) 마감일을 저장할 state (string, 형식: YYYY-MM-DD)
  const [deadline, setDeadline] = useState('')
  // 2) 첨부된 이미지 파일 목록을 저장할 state (File 객체 배열)
  const [images, setImages] = useState([])
  // 3) 이미지 미리보기를 위해 URL.createObjectURL()로 생성된 URL들을 저장할 state (string 배열)
  const [previewUrls, setPreviewUrls] = useState([])

  // 숨겨진 file input을 클릭하기 위한 ref
  const fileInputRef = useRef(null)

  const increment = () => setMaxParticipants((prev) => prev + 1)
  const decrement = () => setMaxParticipants((prev) => Math.max(1, prev - 1))

  // --------------------------------------------
  // 이미지 첨부 버튼 클릭 시 숨겨둔 file input을 클릭하도록
  const handleClickImageButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // file input에서 이미지가 선택되었을 때 실행
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files) // FileList를 배열로 변환
    if (files.length === 0) return

    // 1) state에 File 객체 저장
    setImages(files)

    // 2) 기존에 있던 미리보기 URL 해제(메모리 누수 방지)
    previewUrls.forEach((url) => URL.revokeObjectURL(url))

    // 3) 각 File마다 URL.createObjectURL을 통해 미리보기용 URL 생성
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  // --------------------------------------------
  // 최종 “작성하기” 버튼 클릭 시 호출
  const handleSubmit = () => {
    // 1) 빈 값 체크 (예: 제목, 내용, 마감일 등 필수 항목)
    if (!title.trim() || !content.trim() || !deadline) {
      alert('제목, 내용, 마감일을 모두 입력해주세요.')
      return
    }

    // 2) 서버에 보낼 폼데이터(FormData) 생성 예시
    // 실제 API가 없으시면 이 부분을 주석 처리하거나 mock 로직으로 교체하세요.
    /*
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('maxParticipants', maxParticipants)
    formData.append('deadline', deadline)
    // images 배열에 담긴 File 객체를 모두 전송
    images.forEach((file, idx) => {
      formData.append(`images`, file)
    })

    fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // 저장 성공 후 메인 화면으로 돌아가기
        onBack()
      })
      .catch((err) => {
        console.error(err)
        alert('게시글 작성 중 오류가 발생했습니다.')
      })
    */

    // 3) 현재는 실제 API 호출 없이 바로 뒤로 돌아가는 예시
    onBack()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더(뒤로가기 + 제목) */}
      <Header title="게시글 작성" onBack={onBack} />

      {/* 본문 영역: 스크롤 가능한 영역 */}
      <div style={{ padding: 16, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 1. 게시글 제목 입력 */}
        <div>
          <label>게시글 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        {/* 2. 게시글 내용 입력 */}
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={5}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              resize: 'vertical',
              fontSize: 16,
            }}
          />
        </div>

        {/* 3. 최대 참여자 선택 (- / 숫자 / +) */}
        <div>
          <label>최대 참여자</label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 12 }}>
            <button onClick={decrement} style={buttonStyle}>
              -
            </button>
            <span style={{ fontSize: 16 }}>{maxParticipants}</span>
            <button onClick={increment} style={buttonStyle}>
              +
            </button>
          </div>
        </div>

        {/* 4. 마감일 입력 (Date Picker) */}
        <div>
          <label>마감일</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: 16,
              // 모바일에서 YYYY/MM/DD 형태로 보여주는 것은 브라우저마다 다르지만,
              // 형식을 통일하려면 별도 커스텀 컴포넌트나 라이브러리를 사용해야 합니다.
            }}
          />
        </div>

        {/* 5. 사진 첨부하기 버튼 + 숨겨진 file input */}
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
              borderRadius: '6px',
              border: '1px solid #28a745',
              backgroundColor: '#fff',
              color: '#28a745',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            {/* 간단한 아이콘 대체: 📷 */}
            <span role="img" aria-label="camera">
              📷
            </span>
            사진 선택하기
          </button>
          {/* 실제로 클릭될 숨겨진 file input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImagesChange}
          />
        </div>

        {/* 6. 첨부된 이미지 미리보기 (가로 스크롤 가능한 컨테이너) */}
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

      {/* ------------------------------ */}
      {/* 하단 고정 “작성하기” 버튼 (녹색 배경) */}
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
