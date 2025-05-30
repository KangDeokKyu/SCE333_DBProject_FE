// src/components/Header.jsx
function Header({ title, onBack }) {
  return (
    <div
      style={{
        position: 'relative',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          left: 16,
          fontSize: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &lt;
      </button>

      {/* 중앙 제목 */}
      <h2 style={{ margin: 0 }}>{title}</h2>
    </div>
  )
}

export default Header
