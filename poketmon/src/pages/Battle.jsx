import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImg from "../assets/BackgroundBattle.png";
import "./Battle.css";

const STORAGE_KEY = "savedPokemons";
const MAX_POKEMON_ID = 1025;

function cap(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeImageCandidates(id, name) {
  const padded = String(id).padStart(3, "0");
  return [
    `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`,
    `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/home/${id}.png`,
    `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${id}.png`,
    `https://img.pokemondb.net/artwork/large/${name}.jpg`,
    `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`,
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padded}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  ].filter(Boolean);
}

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export default function Battle() {
  const navigate = useNavigate();

  const [saved, setSaved] = useState([]);
  const [me, setMe] = useState(null);

  const [wild, setWild] = useState(null);
  const [wildLevel, setWildLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 이미지 fallback(야생)
  const [wildImgIdx, setWildImgIdx] = useState(0);
  const [wildImgBroken, setWildImgBroken] = useState(false);

  const meDisplay = useMemo(() => {
    if (!me) return "";
    // 내 포켓몬은 nickname 우선
    return me.nickname?.trim() ? me.nickname : cap(me.name);
  }, [me]);

  const wildDisplay = useMemo(() => {
    if (!wild) return "";
    return cap(wild.name);
  }, [wild]);

  const meLevel = useMemo(() => {
    return Number.isFinite(Number(me?.level)) ? Number(me.level) : 0;
  }, [me]);

  const wildCurrentSrc = useMemo(() => {
    if (!wild?.imageCandidates?.length) return "";
    return wild.imageCandidates[Math.min(wildImgIdx, wild.imageCandidates.length - 1)];
  }, [wild, wildImgIdx]);

  const meCandidates = useMemo(() => {
    if (!me) return [];
    // 저장된 image가 있으면 그걸 1순위로 사용
    const base = [];
    if (me.image) base.push(me.image);

    // 혹시 저장된 이미지가 막혀있을 수도 있으니 id/name 기반 후보도 추가
    if (me.id && me.name) base.push(...makeImageCandidates(me.id, me.name));

    // 중복 제거
    return Array.from(new Set(base.filter(Boolean)));
  }, [me]);

  const [meImgIdx, setMeImgIdx] = useState(0);
  const [meImgBroken, setMeImgBroken] = useState(false);

  const meCurrentSrc = useMemo(() => {
    if (!meCandidates.length) return "";
    return meCandidates[Math.min(meImgIdx, meCandidates.length - 1)];
  }, [meCandidates, meImgIdx]);

  // savedPokemons 로드 + 내 포켓몬 랜덤 셋
  useEffect(() => {
    let list = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      list = Array.isArray(parsed) ? parsed : [];
    } catch {
      list = [];
    }
    setSaved(list);

    const picked = pickRandom(list);
    if (!picked) {
      alert("저장된 포켓몬이 없어요! 홈에서 포켓몬을 먼저 저장해주세요.");
      navigate("/", { replace: true });
      return;
    }

    // 내 이미지 fallback 초기화
    setMeImgIdx(0);
    setMeImgBroken(false);
    setMe(picked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWild = async () => {
    setLoading(true);
    setError("");
    setWildImgIdx(0);
    setWildImgBroken(false);

    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("야생 포켓몬을 불러오지 못했어요");

      const data = await res.json();
      const name = data.name;
      const id = data.id;

      const candidates = makeImageCandidates(id, name);

      setWild({
        id,
        name,
        imageCandidates: candidates,
      });

      // 야생 레벨은 1~20 랜덤 (원하면 숫자 바꿔도 됨)
      setWildLevel(Math.floor(Math.random() * 20) + 1);
    } catch (e) {
      setWild(null);
      setError(e?.message || "에러가 발생했어요");
    } finally {
      setLoading(false);
    }
  };

  // 첫 야생 포켓몬 로드
  useEffect(() => {
    fetchWild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextWild = () => {
    fetchWild();
  };

  const onFight = () => {
    if (!me || !wild) return;

    if (meLevel > wildLevel) {
      alert(`${meDisplay} (Lv ${meLevel}) 이(가) 이겼다!`);
      // 이겼으면 다음 야생으로
      nextWild();
      return;
    }

    if (meLevel < wildLevel) {
      alert(`${wildDisplay} (Lv ${wildLevel}) 이(가) 이겼다!`);

      // 졌으면 내 포켓몬도 다시 랜덤으로 바꿔주기(게임 계속 진행)
      const picked = pickRandom(saved);
      if (picked) {
        setMeImgIdx(0);
        setMeImgBroken(false);
        setMe(picked);
      }
      nextWild();
      return;
    }

    // 동레벨 처리 (무승부)
    alert("레벨이 같아서 무승부! 다음 야생 포켓몬이 나타났다!");
    nextWild();
  };

  const onStay = () => {
    // 가만히 있으면 다음 야생 포켓몬
    nextWild();
  };

  const onCatch = () => {
    if (!wild) return;

    // 1/2 확률
    const ok = Math.random() < 0.5;

    if (!ok) {
      alert("놓쳤다...!");
      // 실패하면 그대로 두거나 다음으로 넘길지 선택인데, 예시는 없어서 그대로 유지
      return;
    }

    alert("잡았다!");

    const nickname = prompt("잡은 포켓몬 이름(별명)을 입력해주세요!", wildDisplay);
    if (nickname === null) return;

    const trimmed = nickname.trim();

    const caught = {
      id: wild.id,
      name: wild.name,
      nickname: trimmed.length ? trimmed : wildDisplay,
      image: !wildImgBroken ? (wildCurrentSrc || "") : "",
      level: wildLevel,
      savedAt: Date.now(),
    };

    // localStorage 누적 저장
    let prev = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      prev = Array.isArray(parsed) ? parsed : [];
    } catch {
      prev = [];
    }

    const next = [caught, ...prev];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }

    setSaved(next);
    // 잡은 뒤엔 다음 야생 포켓몬 등장
    nextWild();
  };

  const onRun = () => {
    // 도망가면 홈으로
    navigate("/", { replace: true });
  };

  return (
    <div className="battlePage" style={{ backgroundImage: `url(${BackgroundImg})` }}>
      {/* 상단 배틀 영역 */}
      <div className="battleTop">
        {/* 왼쪽(내 포켓몬) */}
        <div className="slot slot--left">
          <div className="pokeCircle">
            {!me && <div className="slotStatus">내 포켓몬 없음</div>}

            {!!me && !meImgBroken && meCurrentSrc && (
              <img
                className="pokeImg"
                src={meCurrentSrc}
                alt={me.name}
                referrerPolicy="no-referrer"
                onError={() => {
                  const last = (meCandidates?.length || 1) - 1;
                  if (meImgIdx < last) setMeImgIdx((p) => p + 1);
                  else setMeImgBroken(true);
                }}
              />
            )}

            {!!me && meImgBroken && <div className="slotStatus">이미지 로딩 불가 😢</div>}
          </div>

          <div className="infoBar infoBar--left">
            <span className="infoName">{meDisplay || "—"}</span>
            <span className="infoLv">Lv {meLevel}</span>
          </div>
        </div>

        {/* 오른쪽(야생 포켓몬) */}
        <div className="slot slot--right">
          <div className="pokeCircle">
            {loading && <div className="slotStatus">Loading…</div>}
            {!loading && error && <div className="slotStatus slotStatus--error">{error}</div>}

            {!loading && !error && wild && !wildImgBroken && wildCurrentSrc && (
              <img
                className="pokeImg"
                src={wildCurrentSrc}
                alt={wild.name}
                referrerPolicy="no-referrer"
                onError={() => {
                  const last = (wild.imageCandidates?.length || 1) - 1;
                  if (wildImgIdx < last) setWildImgIdx((p) => p + 1);
                  else setWildImgBroken(true);
                }}
              />
            )}

            {!loading && !error && wild && wildImgBroken && <div className="slotStatus">이미지 로딩 불가 😢</div>}
          </div>

          <div className="infoBar infoBar--right">
            <span className="infoName">{wild ? wildDisplay : "—"}</span>
            <span className="infoLv">Lv {wild ? wildLevel : "-"}</span>
          </div>
        </div>
      </div>

      {/* 하단 선택 바 */}
      <div className="battleBottom">
        <div className="battleQuestion">무엇을 하시겠습니까?</div>

        <div className="battleBtns">
          <button className="battleBtn battleBtn--fight" type="button" onClick={onFight} disabled={!me || !wild}>
            싸우기
          </button>
          <button className="battleBtn battleBtn--stay" type="button" onClick={onStay} disabled={!wild || loading}>
            가만히 있기
          </button>
          <button className="battleBtn battleBtn--catch" type="button" onClick={onCatch} disabled={!wild || loading}>
            잡기
          </button>
          <button className="battleBtn battleBtn--run" type="button" onClick={onRun}>
            도망가기
          </button>
        </div>
      </div>
    </div>
  );
}