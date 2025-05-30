// src/components/BackButton.jsx
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        fontSize: 24,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      &lt;
    </button>
  )
}

export default BackButton
