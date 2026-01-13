import Editor from "../components/todoComponets/Editor";
import Header from "../components/todoComponets/Header";
import List from "../components/todoComponets/List";
import { useState, useRef } from "react";
import "./TodoApp.css";

const mockData = [
  { id: 0, isDone: false, content: "React공부하기", date: new Date().toISOString() },
  { id: 1, isDone: false, content: "빨래하기", date: new Date().toISOString() },
  { id: 2, isDone: false, content: "노래하기", date: new Date().toISOString() },
];

export default function TodoApp() {
  const [todo, setTodo] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content,
      date: new Date().toISOString(),
    };
    setTodo((prev) => [newTodo, ...prev]);
  };

  const onToggle = (targetId) => {
    setTodo((prev) =>
      prev.map((it) => (it.id === targetId ? { ...it, isDone: !it.isDone } : it))
    );
  };

  const onRemove = (targetId) => {
    setTodo((prev) => prev.filter((it) => it.id !== targetId));
  };

  return (
    <div className="Todo">
      <Header />
      <Editor onCreate={onCreate} />
      <List todo={todo} onToggle={onToggle} onRemove={onRemove} />
    </div>
  );
}
