import TodoItem from "./TodoItem";

export default function List({ todo, onToggle, onRemove }) {
  const list = Array.isArray(todo) ? todo : [];

  return (
    <>
      {list.map((it) => (
        <TodoItem
          key={it.id}
          item={it}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </>
  );
}
