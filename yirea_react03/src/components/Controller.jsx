export default function Controller(props) {
  // 지원: 부모에서 prop 이름을 다르게 넘겼을 때(초보자 실수)도 잡아주기
  const onClickButton =
    props.onClickButton ??
    props.onClickbutton ??
    props.handleClickButton ??
    props.onClickBtn;

  const safeClick = (value) => {
    if (typeof onClickButton !== "function") {
      console.error(
        "[Controller] onClickButton prop must be a function.\n" +
          "- parent에서 <Controller onClickButton={함수} /> 형태로 넘겼는지 확인하세요.\n" +
          "- 지금 들어온 값:",
        onClickButton
      );
      return;
    }
    onClickButton(value);
  };

  return (
    <>
      <button onClick={() => safeClick(-1)}>-1</button>
      <button onClick={() => safeClick(-10)}>-10</button>
      <button onClick={() => safeClick(10)}>+10</button>
      <button onClick={() => safeClick(1)}>+1</button>
    </>
  );
}