// 对象接口
interface List {
    readonly id: number;
    name: string;
    age?: number;
    // [x: string]: any;
}
interface Result {
    data: List[]
}
function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
        if (value.age) {
            console.log(value.age)
        }
        // value.id++   // error，只读属性不允许修改
    })
}

// render({
//     data: [
//         {id: 1, name: 'A', sex: 'male'},
//         {id: 2, name: 'B', age: 10}
//     ]
// });          // error，如果直接传入字面量，因为接口里没有定义sex会报错，要绕过对字面量的类型检查，有三种方式：

// 方式一：变量
let result = {
    data: [
        {id: 1, name: 'A', sex: 'male'},    // 允许传入多余的字段 sex，TS只检查接口里定义好的字段是否满足要求
        {id: 2, name: 'B', age: 10}
    ]
}
render(result)  // 1 "A"  2 "B"  10

// 方式二：在字面量后加上as类型断言
render({
    data: [
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B', age: 10}
    ]
} as Result);

// 方式三：和方式二等价，只不过是不同的写法。但不推荐这种写法，会在 React 中产生歧义
render(<Result>{
    data: [
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B', age: 10}
    ]
});


// 函数接口
// 方式一：
interface AddI {
    (x: number, y: number): number
}
let addI: AddI = (x: number, y: number) => x + y
console.log(addI(1, 2));    // 3

// 方式二：
type Add2I = (x: number, y: number) => number       // 类型别名是一种更简洁的定义方式，将函数定义成一种类型
let add2I: Add2I = (a: number, b: number) => a * b  // 具体定义函数，指定为该类型
console.log(add2I(3, 4));    // 12


// 混合接口：一个对象既能做对象使用，也能做函数使用
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


// 索引类型：我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]，TS支持两种索引签名：字符串和数字
// 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
interface StringArray {
    [index: number]: string     // 用任意的数字索引 StringArray，都会得到 string
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0]; 
console.log(myStr);             // Bob
