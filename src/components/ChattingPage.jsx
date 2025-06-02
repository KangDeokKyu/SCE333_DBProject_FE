import Header from './Header'

function ChattingPage({ onBack }) {
  return (
    <div>
      <Header title="공동구매 채팅방" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p>채팅 내용입니다.</p>
      </div>
    </div>
  )
}

export default ChattingPage
