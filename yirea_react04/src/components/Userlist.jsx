import { useEffect, useState } from "react";

function Userlist() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("데이터 로드 실패", err));
  }, []);

  return (
    <>
      <h2>사용자 목록</h2>
      <ul>
        {users.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email})
          </li>
        ))}
      </ul>
    </>
  );
}
export default Userlist;
