// 배열 객체 생성 방법
let array1 = new Array();
let array2 = [];
array1[0] = "첫번째";
array1[1] = 10;
console.log(array1);

let array3 = [1, 2, 3, true, "hello", null, undefined, () => {}, {}, []];

for (let i = 0; i < array3.length; i++) {
  console.log(array3[i]);
}
//-----------------------------
//구조분해할당
let person = {
  name: "홍길동",
  age: 27,
  hobby: "테니스",
};
let { name } = person;

// let array4 = [1, 2, 3];
// let [one, two, three, four = 0] = array4;
// console.log(one);
// console.log(two);
// console.log(three);
// console.log(four); // undefined