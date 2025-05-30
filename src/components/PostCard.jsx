import React from 'react'

function PostCard({ title, category, current, total }) {
  return (
    <div style={{ display: 'flex', padding: '16px', borderBottom: '1px solid #ddd' }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#e6f0ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <span role="img" aria-label="image">🖼️</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ color: '#999', marginTop: 4 }}>{category}</div>
        {(current !== undefined && total !== undefined) && (
          <div style={{
            marginTop: 8,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#007bff'
          }}>
            {current}/{total}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
