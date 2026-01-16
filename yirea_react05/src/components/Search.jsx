import { useEffect, useState } from "react";

export default function Search({ search = "", onSearch }) {
  const [keyword, setKeyword] = useState(search);

  useEffect(() => {
    setKeyword(search);
  }, [search]);

  useEffect(() => {
    if (typeof onSearch === "function") onSearch(keyword);
  }, [keyword, onSearch]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <h1>사용자 목록</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}