// 类型兼容
// 枚举兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 1
let no: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple       // error，枚举间是完全不兼容的


// 对象兼容性：属性少的可以兼容属性多的
interface X {
    a: any;
    b: any;
}
interface Y {
    a: any;
    b: any;
    c: any;
}
let x1: X = {a: 1, b: 2}
let y1: Y = {a: 1, b: 2, c: 3}
x1 = y1          // ok，源类型 Y 中具备目标类型 X 的必要属性
// y1 = x1       // error，源类型 X 中不具备目标类型 Y 的必要属性


// 函数兼容性
type Handler = (a: number, b: number) => number
function hoc(handler: Handler) {
    console.log(handler(1, 2))
    return handler
}

// 判断依据一：参数个数，原则：参数多的可以兼容参数少的
// a.参数个数固定：参数多的可以兼容参数少的
let handler1 = (a: number) => a
hoc(handler1)
let handler2 = (a: number, b: number, c: number) => a + b + c
// hoc(handler2)       // error，参数多了

// b.参数个数不固定，即有可选参数和剩余参数
let func1 = (a: number, b: number) => {}
let func2 = (a?: number, b?: number) => {}
let func3 = (...args: number[]) => {}
func1 = func2       // 固定参数兼容可选参数和剩余参数
func1 = func3       // 固定参数兼容可选参数和剩余参数
// func2 = func1    // error，可选参数【不】兼容固定参数和剩余参数，tips：可以关闭 strictFunctionTypes 选型来让它们兼容
// func2 = func3    // error，可选参数【不】兼容固定参数和剩余参数，tips：可以关闭 strictFunctionTypes 选型来让它们兼容
func3 = func1       // 剩余参数兼容固定和剩余参数
func3 = func2       // 剩余参数兼容固定和剩余参数

// 判断依据二：参数类型
let handler3 = (a: string, b: number) => {}
// hoc(handler3)       // error，参数类型不兼容

interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
let p2d = (point: Point2D) => {}
let p3d = (point: Point3D) => {}
p3d = p2d       // 参数个数相同，参数类型都是 object，参数兼容性和对象兼容性正好相反：属性多的兼容属性少的
// p2d = p23    // error，tips：可以关闭 strictFunctionTypes 选型来让它们兼容

// 判断依据三：返回值类型
let f = () => ({name: 'Alice'})
let g = () => ({name: 'Alice', location: 'Beijing'})
f = g           // 返回值可以看做是对象，满足对象兼容性原则：属性少的兼容属性多的
// g = f        // error，tips：可以关闭 strictFunctionTypes 选型来让它们兼容

// 函数重载
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}           // ok
// function overload(a: any): any {}                   // ok，列表函数的参数比源函数参数少是没问题的
// function overload(a: any, b: any, c: any): any {}   // error，列表函数的参数比源函数参数多
// function overload(a: any, b: any) {}                // error，返回值类型不兼容


// 类兼容性
class A {
    constructor(p: number, q: number) {}
    id: number = 1
    private name: string = ''
}
class B {
    constructor(p: number) {}
    static s = 1
    id: number = 2
    private name: string = ''
}
let aa = new A(1, 2)
let bb = new B(1)
// aa = bb             // error，private 成员只在父子实例间才进行比较
// bb = aa             // error，private 成员只在父子实例间才进行比较
class C extends A {}
let cc = new C(3, 4)
aa = cc
cc = aa

// 泛型兼容性
interface Empty<T> {
    value: T
}
let e1: Empty<number> = { value: 0 };
let e2: Empty<string> = { value: '0' };
// e1 = e2              // error，不兼容

// 对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。 然后用结果类型进行比较。
let logFunc1 = <T>(x: T): T => {
    console.log('x')
    return x
}
let logFunc2 = <T>(y: T): T => {
    console.log('y')
    return y
}
logFunc1 = logFunc2
