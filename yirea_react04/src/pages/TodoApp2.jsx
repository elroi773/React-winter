import Editor from "../components/todoComponets/Editor";
import Header from "../components/todoComponets/Header";
import List from "../components/todoComponets/List";
import Search from "../components/todoComponets/Search";
import { useReducer, useRef, useMemo, useState } from "react";
import "./TodoApp.css";

const mockData = [
  { id: 0, isDone: false, content: "React공부하기", date: new Date().toISOString() },
  { id: 1, isDone: false, content: "빨래하기", date: new Date().toISOString() },
  { id: 2, isDone: false, content: "노래하기", date: new Date().toISOString() },
];

function stateReducer(state, action){
  switch(action.type){
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item)=>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
      case "DELETE" : 
        return state.filter((item) => item.id !== action.targetId);
      default:
        return state;
  }
}

export default function TodoApp2() {
  const [todo, dispatch] = useReducer(stateReducer, mockData);
  const idRef = useRef(3);
  const onCreate = (content) => {
    dispatch(
      {
        type: "CREATE",
        data: {
          id: idRef.current++,
          isDone: false,
          content: content,
          date: new Date().toISOString(),
        }
      }
    )
  }
  const [search, setSearch] = useState("");

  const filteredTodo = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return todo;
    return todo.filter((it) => it.content.toLowerCase().includes(keyword));
  }, [todo, search]);

  const onToggle = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };
  const onRemove = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  return (
    <div className="Todo">
      <Header />
      <Editor onCreate={onCreate} />
      <Search search={search} onSearch={setSearch} />
      <List todo={filteredTodo} onToggle={onToggle} onRemove={onRemove} />
    </div>
  );
}