import Header from './Header'

function SearchPage({ onBack }) {
  return (
    <div>
      <Header title="" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p>검색 UI는 생략됨 (테스트용)</p>
      </div>
    </div>
  )
}

export default SearchPage
