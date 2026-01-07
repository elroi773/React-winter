function getArea(width, height) {
    let area = width * height;
    return area;
}

console.log(getArea(5, 10));

function repeat(count, callback){
    for (let idx =1 ; idx <= count; idx++){
        callback(idx);
    }
}

repeat(5, (idx) => {
    console.log(idx);
})

repeat(5, (idx) => {
    console.log(idx * 2);
})


let castNum = 10;
let. castStr = "20";
let castResult = castNum + Number(castStr);
console.log(castResult); // 30

let implicitCastResult = castNum + castStr;
console.log(implicitCastResult); // "1020"

new Date(2025-10-12);