import React from 'react'
import { useState, useEffect, useRef } from 'react'

import Header from '../components/Header'
import List from '../components/List'
import Editor from '../components/Editor'

function User() {
  const [users, setUsers] = useState([])
  const userIdRef = useRef(1);
  const isFetchedRef = useRef(false);
  

  useEffect(() => {
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        const data = await response.json();
        const formattedUsers = data.map(user => ({
          id: userIdRef.current++,
          name: user.name,
          email: user.email
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users)

  return (
    <div>
      <Header />
      <Editor users={users} setUsers={setUsers} userIdRef={userIdRef} />
      <List users={users} setUsers={setUsers} />
    </div>
  )
}

export default User
