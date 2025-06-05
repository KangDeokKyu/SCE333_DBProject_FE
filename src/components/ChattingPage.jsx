import Header from "./Header";

function ChattingPage({ onBack }) {
  return (
    <div>
      <Header title="공동구매 채팅방" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p>채팅방이 생성되었습니다. 채팅방 메뉴에서 확인해보세요</p>
      </div>
    </div>
  );
}

export default ChattingPage;
