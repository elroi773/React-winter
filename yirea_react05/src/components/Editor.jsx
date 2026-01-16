import React from "react";
import "./Editor.css";

function Editor({ users, setUsers, userIdRef }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const addUser = () => {
    const newUser = {
      id: userIdRef.current++,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1>사용자 추가</h1>
      <div className="Editor">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="User Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="User Email"
        />
        <button onClick={addUser} type="button">
          추가
        </button>
      </div>
    </div>
  );
}

export default Editor;
