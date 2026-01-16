import { useEffect, useState } from "react";

export default function UserList({ user, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // 부모(List.jsx)에서 user가 갱신되면 입력값도 같이 동기화
  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const handleEdit = () => setIsEdit(true);

  const handleCancel = () => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setIsEdit(false);
  };

  const handleSave = () => {
    if (typeof onUpdate === "function") {
      onUpdate(user.id, { name, email });
    }
    setIsEdit(false);
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(user.id);
    }
  };

  return (
    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {isEdit ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            style={{ padding: "6px 8px" }}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            style={{ padding: "6px 8px" }}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </>
      ) : (
        <>
          <span>
            {user.name} ({user.email})
          </span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </li>
  );
}