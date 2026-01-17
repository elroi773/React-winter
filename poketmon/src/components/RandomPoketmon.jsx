import { useEffect, useMemo, useState } from "react";
import "./RandomPoketmon.css";

const STORAGE_KEY = "savedPokemons";
const MAX_POKEMON_ID = 1025;

export default function RandomPoketmon({ onSavePokemon }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imgIdx, setImgIdx] = useState(0);
  const [imgBroken, setImgBroken] = useState(false);

  // 저장 목록(로컬 동기용)
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setSaved(parsed);
    } catch {
      // ignore
    }
  }, []);

  const displayName = useMemo(() => {
    if (!pokemon?.name) return "";
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }, [pokemon]);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError("");
    setImgIdx(0);
    setImgBroken(false);

    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("포켓몬 데이터를 불러오지 못했어요");

      const data = await res.json();
      const padded = String(data.id).padStart(3, "0");
      const name = data.name;

      const candidates = [
        `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/home/${data.id}.png`,
        `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${data.id}.png`,
        `https://img.pokemondb.net/artwork/large/${name}.jpg`,
        `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`,
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padded}.png`,
        data?.sprites?.other?.["official-artwork"]?.front_default,
        data?.sprites?.other?.home?.front_default,
        data?.sprites?.front_default,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      ].filter(Boolean);

      setPokemon({
        id: data.id,
        name: data.name,
        imageCandidates: candidates,
        types: (data.types || []).map((t) => t?.type?.name).filter(Boolean),
      });
    } catch (e) {
      setPokemon(null);
      setError(e?.message || "에러가 발생했어요");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 핵심: 저장할 때 localStorage를 즉시 읽고/쓰고 반영 (페이지 이동/언마운트에도 안전)
  const handleSave = () => {
    if (!pokemon) {
      alert("먼저 포켓몬을 뽑아주세요!");
      return;
    }

    const nickname = prompt("저장할 포켓몬 이름(별명)을 입력해주세요!", displayName);
    if (nickname === null) return;

    const trimmed = nickname.trim();

    const currentImage =
      !imgBroken && pokemon.imageCandidates?.length
        ? pokemon.imageCandidates[Math.min(imgIdx, pokemon.imageCandidates.length - 1)]
        : "";

    const item = {
      id: pokemon.id,
      name: pokemon.name,
      nickname: trimmed.length ? trimmed : displayName,
      image: currentImage,
      level: 0,
      savedAt: Date.now(),
    };

    // ✅ 기존 저장 불러와서 누적 저장
    let prev = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      prev = Array.isArray(parsed) ? parsed : [];
    } catch {
      prev = [];
    }

    const next = [item, ...prev];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }

    setSaved(next);

    if (typeof onSavePokemon === "function") {
      onSavePokemon(item);
    }
  };

  const currentSrc =
    pokemon?.imageCandidates?.length > 0
      ? pokemon.imageCandidates[Math.min(imgIdx, pokemon.imageCandidates.length - 1)]
      : "";

  return (
    <div className="pokedex">
      <section className="pokedex__top">
        <div className="pokedex__topLeds" aria-hidden="true">
          <span className="pokedex__led" />
          <span className="pokedex__led" />
        </div>

        <div className="pokedex__screen">
          <div className="pokedex__screenInner">
            {loading && <div className="pokedex__status">Loading…</div>}
            {!loading && error && <div className="pokedex__status pokedex__status--error">{error}</div>}

            {!loading && !error && pokemon && !imgBroken && currentSrc && (
              <img
                className="pokedex__img"
                src={currentSrc}
                alt={pokemon.name}
                referrerPolicy="no-referrer"
                onError={() => {
                  const last = (pokemon.imageCandidates?.length || 1) - 1;
                  if (imgIdx < last) setImgIdx((p) => p + 1);
                  else setImgBroken(true);
                }}
              />
            )}

            {!loading && !error && pokemon && imgBroken && (
              <div className="pokedex__status">
                이미지 로딩이 전부 막혀있어요 😢
                <br />
                (네트워크에서 외부 이미지 도메인이 차단된 상태)
              </div>
            )}

            {!loading && !error && !pokemon && (
              <div className="pokedex__status">아래 버튼으로 포켓몬을 뽑아주세요!</div>
            )}
          </div>
        </div>

        <div className="pokedex__topControls">
          <div className="pokedex__buttons">
            <button className="pokedex__roundBtn" type="button" onClick={handleSave} title="이름 저장">
              +
            </button>
            <button className="pokedex__roundBtn" type="button" onClick={fetchRandomPokemon} title="다시 뽑기">
              ↻
            </button>
          </div>

          <div className="pokedex__speaker" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="pokedex__bottom">
        <div className="pokedex__bars" aria-hidden="true">
          <span className="pokedex__bar pokedex__bar--left" />
          <span className="pokedex__bar pokedex__bar--right" />
        </div>

        <div className="pokedex__bottomMain">
          <div className="pokedex__bigCircle" aria-hidden="true" />
          <button className="pokedex__mainBtn" type="button" onClick={fetchRandomPokemon}>
            포켓몬 뽑기
          </button>
          <div className="pokedex__dpad" aria-hidden="true">
            <div className="pokedex__dpadCross" />
            <div className="pokedex__dpadCenter" />
          </div>
        </div>

        <div className="pokedex__dots" aria-hidden="true">
          <span className="pokedex__dot pokedex__dot--red" />
          <span className="pokedex__dot" />
          <span className="pokedex__dot" />
          <span className="pokedex__dot" />
        </div>
      </section>

      <div className="pokedex__meta">
        {pokemon ? (
          <>
            <div className="pokedex__metaName">
              #{pokemon.id} {displayName}
            </div>
            {!!pokemon.types?.length && <div className="pokedex__metaTypes">{pokemon.types.join(" / ")}</div>}
          </>
        ) : (
          <div className="pokedex__metaName">—</div>
        )}
      </div>
    </div>
  );
}