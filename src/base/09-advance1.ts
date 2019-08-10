// 交叉类型
interface IDog {
    run(): void
}
interface ICat {
    jump(): void
}
let pet: IDog & ICat = {
    run() { console.log('run') },
    jump() { console.log('jump') }
}


// 联合类型
let val1: number | string = 1
let val2: 'a' | 'b' | 'c'
let val3: 1 | 2 | 3

class Dog1 {
    run() {}
    eat() {}
}
class Cat1 {
    jump() {}
    eat() {}
}
enum Master { Boy, Girl }
function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dog1() : new Cat1();
    pet.eat()       // OK，pet 被推断为 Dog1 | Cat1 的联合类型，只能访问它们都有的方法
    // pet.jump()   // error，无法确定 pet 的类型
    return pet
}

interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case 'circle':
            return Math.PI * s.radius ** 2
        default:
            return ((e: never) => {})(s)  // 如果 s 走到了这里，说明前面有分支没有覆盖到
    }
}
console.log(area({kind: 'circle', radius: 1}))  // 3.1415926


// 索引类型
let myObj = {
    a: 1,
    b: 2,
    c: 3
}

function getValues(obj: any, keys: string[]) {
    return keys.map(key => obj[key])
}
console.log(getValues(myObj, ['a', 'b']))   // [1, 2]
console.log(getValues(myObj, ['e', 'f']))   // [undefined, undefined]，编译器并没有报错，要约束这种情况需要索引类型

// keyof T：索引类型的查询操作符
interface IObj {
    a: number;
    b: string;
}
let myObj1: keyof IObj     // myObj1 的类型是 IObj 的属性的联合类型："a" | "b"

// T[K]：索引访问操作符
let myObj2: IObj['a']     // myObj1 的类型是 number

// T extends U：泛型约束

// 改造上例，让参数 keys 必须是参数 obj 里的属性，返回值是参数 obj 里的值
function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
}
console.log(getValues2(myObj, ['a', 'b']))   // [1, 2]
// console.log(getValues2(myObj, ['d', 'e']))   // error
