let obj1 = new Object();
obj1.name = "Alice";

let obj2 = {
    name: "Bob"
};
obj2.name = "하투하";
console.log(obj1.name);
console.log(obj2.name);

function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet: function() {
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
    };
}

let person1 = createPerson("Charlie", 30);
let person2 = createPerson("Diana", 25);

person1.greet();
person2.greet(); 

if(obj1==obj2){
    console.log("obj1 and obj2 are equal");
} else {
    console.log("obj1 and obj2 are not equal");
}

let obj3 = obj1;