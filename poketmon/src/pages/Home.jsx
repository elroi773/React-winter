import { useEffect, useState } from "react";
import RandomPoketmon from "../components/RandomPoketmon";
import PoketmonList from "./PoketmonList";
import "./Home.css";

const STORAGE_KEY = "savedPokemons";

export default function Home() {
  const [list, setList] = useState([]);

  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setList(Array.isArray(parsed) ? parsed : []);
    } catch {
      setList([]);
    }
  };

  useEffect(() => {
    loadFromStorage();

    // 다른 페이지 갔다가 탭 포커스 돌아오면 동기화
    const onFocus = () => loadFromStorage();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // ✅ RandomPoketmon.jsx는 저장 후 onSavePokemon(item)을 호출함
  // 여기서 localStorage를 다시 읽어 list를 즉시 갱신하면 /home에서 실시간 반영됨
  const handleSavePokemon = () => {
    loadFromStorage();
  };

  return (
    <div className="homeWrap">
      <div className="random">
        <RandomPoketmon onSavePokemon={handleSavePokemon} />
      </div>
      <div className="list">
        <PoketmonList list={list} setList={setList} />
      </div>
    </div>
  );
}