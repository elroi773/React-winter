import { useState } from "react";

export default function SearchForm() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchOnChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    console.log(value);
  };

  const onSearchClick = () => {
    // 여기서 실제 검색 로직(필터링/요청 등)을 연결하면 됨
    console.log("검색 클릭:", searchKeyword);
  };

  return (
    <>
      검색어 : <input value={searchKeyword} onChange={searchOnChange} />
      {searchKeyword}
      <button type="button" onClick={onSearchClick}>
        검색
      </button>
    </>
  );
}

// onchange 이벤트 발생 시 입력한 값이 콘솔에 출력되도록 구현
