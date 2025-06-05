import React from "react";
import Header from "./Header";
import moisamLogo from "../assets/moisam.png"; // 상대 경로로 불러오기

function WaitingPage({ post, onBack, onDepositConfirmed }) {
  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header title="잠시만 기다려주세요..." onBack={onBack} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src={moisamLogo}
          alt="MOISAM Logo"
          style={{ width: 150, marginBottom: 24 }}
        />

        <p style={{ fontSize: 16, color: "#555", marginBottom: 32 }}>
          입금내역이 확인되면 알려드릴게요!
        </p>

        <button
          onClick={() => {
            console.log("WaitingPage: 입금 확인 버튼 클릭");
            onDepositConfirmed();
          }}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          (시뮬레이션) 입금 확인 완료
        </button>
      </div>
    </div>
  );
}

export default WaitingPage;
