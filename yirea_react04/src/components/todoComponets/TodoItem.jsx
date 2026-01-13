import "./TodoItem.css";

export default function TodoItem({ item, onToggle, onRemove }) {
  if (!item) return null;

  const handleChange = () => {
    if (typeof onToggle === "function") onToggle(item.id);
  };

  const handleRemove = () => {
    if (typeof onRemove === "function") onRemove(item.id);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={!!item.isDone} onChange={handleChange} />
      <div className={item.isDone ? "content done" : "content"}>{item.content}</div>
      <div className="date">
        {item.date ? new Date(item.date).toLocaleDateString() : ""}
      </div>
      <button onClick={handleRemove}>삭제</button>
    </div>
  );
}