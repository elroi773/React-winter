// 2. 매게변수 : 나머지 매개변수 

let arr1 = [1,2,3];

function funcB (one, ...ds){
    console.log(one);  // 1
    console.log(ds);   // [2,3]
}

// map : 배열의 모든 요소를 순회 하면서, 
// 각각 콜백 함수를 실행하고 그 결과 값들을 모아서 새로운 배열로 반환 

let arr2 = [1,2,3];
const mapResult = arr2.map( (item,idx) => {
    console.log( idx, item );
    return item * 2;
});
//idx 에는 인덱스 값이 들어감