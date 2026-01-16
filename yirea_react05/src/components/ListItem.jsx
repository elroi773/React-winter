import React, { useEffect, useState } from "react";

function ListItem({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name ?? "");
  const [newEmail, setNewEmail] = useState(user?.email ?? "");

  useEffect(() => {
    setNewName(user?.name ?? "");
    setNewEmail(user?.email ?? "");
  }, [user?.name, user?.email]);

  const editUser = () => setIsEditing(true);

  const cancelEdit = () => {
    setNewName(user?.name ?? "");
    setNewEmail(user?.email ?? "");
    setIsEditing(false);
  };

  const saveUser = () => {
    setUser((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id
          ? {
              ...u,
              name: newName,
              email: newEmail,
            }
          : u
      )
    );
    setIsEditing(false);
  };

  const deleteUser = () => {
    setUser((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
          />
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="text"
          />
          <button onClick={saveUser} type="button">
            저장
          </button>
          <button onClick={cancelEdit} type="button">
            취소
          </button>
        </>
      ) : (
        <>
          {user?.name} - {user?.email}
          <button onClick={editUser} type="button">
            수정
          </button>
          <button onClick={deleteUser} type="button">
            삭제
          </button>
        </>
      )}
    </li>
  );
}

export default ListItem;