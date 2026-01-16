import React from 'react'
import { useState } from 'react'
import "./List.css";

import ListItem from './ListItem';

function List({ users, setUsers }) {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>사용자 목록</h1>
      <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='검색어를 입력하세요' />
      <ul>
        {users
          .filter(user => user.name.toLowerCase()
            .includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
          .map(user => (
            <ListItem key={user.id} user={user} setUser={setUsers} />
          ))}
      </ul>
    </div>
  )
}

export default List
