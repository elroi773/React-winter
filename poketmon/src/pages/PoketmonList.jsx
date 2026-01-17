import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/RandomPoketmon.css";

const STORAGE_KEY = "savedPokemons";

export default function PoketmonList({ list: externalList, setList: externalSetList }) {
  const navigate = useNavigate();

  // ✅ 외부(Home)에서 list를 내려주면 그걸 사용하고,
  // 아니면 기존처럼 내부 state + localStorage 로드 방식 사용
  const [localList, setLocalList] = useState([]);
  const list = externalList ?? localList;
  const setList = externalSetList ?? setLocalList;

  const [openKey, setOpenKey] = useState(null); // 클릭한 카드(savedAt)

  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setList(Array.isArray(parsed) ? parsed : []);
    } catch {
      setList([]);
    }
  };

  // ✅ 단독(/pokedex)으로 쓰일 때만 최초 로드
  useEffect(() => {
    if (externalList == null) {
      loadFromStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // openKey가 삭제되면 닫기
  useEffect(() => {
    if (openKey == null) return;
    const exists = Array.isArray(list) && list.some((p) => p?.savedAt === openKey);
    if (!exists) setOpenKey(null);
  }, [list, openKey]);

  const sorted = useMemo(() => {
    return [...(list || [])].sort((a, b) => (b?.savedAt || 0) - (a?.savedAt || 0));
  }, [list]);

  const syncStorage = (next) => {
    setList(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleRemove = (savedAt) => {
    const next = (list || []).filter((p) => p.savedAt !== savedAt);
    syncStorage(next);
    if (openKey === savedAt) setOpenKey(null);
  };

  const handleClear = () => {
    const ok = window.confirm("저장된 포켓몬을 모두 삭제할까요?");
    if (!ok) return;
    syncStorage([]);
    setOpenKey(null);
  };

  // ✅ 레벨 조절
  const changeLevel = (savedAt, delta) => {
    const next = (list || []).map((p) => {
      if (p.savedAt !== savedAt) return p;
      const cur = typeof p.level === "number" ? p.level : 0;
      const nextLv = Math.max(0, cur + delta); // 최소 0
      return { ...p, level: nextLv };
    });
    syncStorage(next);
  };

  return (
    <div style={{ width: "min(720px, 92vw)", margin: "24px auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>내 포켓몬 도감</h2>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={() => navigate("/battle")} style={btnStyle("#2aa6ff")}>
            배틀
          </button>
          <button type="button" onClick={handleClear} style={btnStyle("#ff3a3a")}>
            전체삭제
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div
          style={{
            padding: 18,
            border: "3px solid #000",
            borderRadius: 12,
            fontWeight: 800,
            textAlign: "center",
            background: "#fff",
          }}
        >
          아직 저장된 포켓몬이 없어!
          <div style={{ marginTop: 8, fontWeight: 700, opacity: 0.85 }}>
            뽑기 화면에서 <b>+</b> 눌러서 저장해봐.
          </div>
          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={() => navigate(-1)} style={btnStyle("#39b67d")}>
              뒤로가기
            </button>
          </div>
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 12,
          }}
        >
          {sorted.map((p) => {
            const isOpen = openKey === p.savedAt;

            return (
              <li
                key={p.savedAt}
                onClick={() => setOpenKey(isOpen ? null : p.savedAt)}
                style={{
                  border: "4px solid #000",
                  borderRadius: 16,
                  padding: 12,
                  background: "#fff",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    border: "3px solid #000",
                    borderRadius: 14,
                    background: "#a7d2a7",
                    aspectRatio: "1 / 1",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "92%", height: "92%", objectFit: "contain" }}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div style={{ fontWeight: 900 }}>NO IMAGE</div>
                  )}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{p.nickname || p.name}</div>
                  <div style={{ fontWeight: 700, opacity: 0.85, marginTop: 2 }}>({p.name})</div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        padding: "6px 10px",
                        border: "3px solid #000",
                        borderRadius: 999,
                        background: "#e7e7e7",
                        minWidth: 86,
                        textAlign: "center",
                      }}
                    >
                      LV {p.level ?? 0}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(p.savedAt);
                      }}
                      style={btnStyle("#ff3a3a")}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                {/* ✅ 카드 클릭하면 레벨 조절 패널 오픈 */}
                {isOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      marginTop: 10,
                      border: "3px solid #000",
                      borderRadius: 12,
                      padding: 10,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>레벨 조절</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        type="button"
                        style={btnStyleSmall("#e7e7e7")}
                        onClick={() => changeLevel(p.savedAt, -1)}
                      >
                        -
                      </button>
                      <div style={{ fontWeight: 900, minWidth: 40, textAlign: "center" }}>
                        {p.level ?? 0}
                      </div>
                      <button
                        type="button"
                        style={btnStyleSmall("#39b67d")}
                        onClick={() => changeLevel(p.savedAt, +1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function btnStyle(bg) {
  return {
    border: "3px solid #000",
    borderRadius: 10,
    padding: "8px 12px",
    fontWeight: 900,
    background: bg,
    cursor: "pointer",
  };
}

function btnStyleSmall(bg) {
  return {
    border: "3px solid #000",
    borderRadius: 10,
    width: 40,
    height: 36,
    fontWeight: 900,
    background: bg,
    cursor: "pointer",
  };
}