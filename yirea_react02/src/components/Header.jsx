function Header() {
  let name = "김이레";
  let age = 27;
  let hobby = ["독서", "코딩", "운동"];
  let isLogin = true;
  let obj = {
    name: "이레",
    age: 27,
  };
  return (
    <header>
      <h1>
        {name} 입니다. <br /> 나이는 {age + 10} 이고,{" "}
        {age % 2 == 0 ? "짝수" : "홀수"}입니다.
        취미는 {hobby} 입니다. <br />
        {isLogin ? "로그인 상태입니다." : "로그아웃 상태입니다."} <br />
        객체 출력: {obj.name} {obj.age} <br />

        if(isLogin){
        <div>로그인 상태입니다.</div>
        }else{
        <div>로그아웃 상태입니다.</div>
        }
      </h1>
    </header>
  );
}

export default Header;
