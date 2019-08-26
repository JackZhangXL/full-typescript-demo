// 类型兼容
// 对象兼容：多属性没关系，少属性不行
// 函数的参数兼容：少参数没关系，多参数不行

// 枚举兼容性：枚举和 number 类型是可以兼容的，但不同枚举间是完全不兼容的
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 1
let one: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple       // error，枚举间是完全不兼容的


// 对象兼容性：多属性没关系，少属性不行
interface IX {
    a: any;
    b: any;
}
interface IY {
    a: any;
    b: any;
    c: any;
}
let x1: IX = {a: 1, b: 2}
let y1: IY = {a: 1, b: 2, c: 3}
x1 = y1          // ok，源类型 Y 中具备目标类型 X 的必要属性
// y1 = x1       // error，源类型 X 中不具备目标类型 Y 的必要属性


// 函数兼容性
type Handler = (a: number, b: number) => number
function hoc(handler: Handler) {
    console.log(handler(1, 2))
    return handler
}

// 判断依据一：参数个数，原则：少参数没关系，多参数不行
// a.参数个数固定
let handler1 = (a: number) => a
hoc(handler1)
let handler2 = (a: number, b: number, c: number) => a + b + c
// hoc(handler2)       // error，参数多了

// b.参数个数不固定，即有可选参数和剩余参数：固定参数和剩余参数可以兼容另两者，可选参数不兼容另两者
let func1 = (a: number, b: number) => {}
let func2 = (a?: number, b?: number) => {}
let func3 = (...args: number[]) => {}
func1 = func2       // 固定参数兼容可选参数和剩余参数
func1 = func3       // 固定参数兼容可选参数和剩余参数
// func2 = func1    // error，可选参数【不】兼容固定参数和剩余参数，tips：可以关闭 strictFunctionTypes 选型来让它们兼容
// func2 = func3    // error，可选参数【不】兼容固定参数和剩余参数，tips：可以关闭 strictFunctionTypes 选型来让它们兼容
func3 = func1       // 剩余参数兼容固定和剩余参数
func3 = func2       // 剩余参数兼容固定和剩余参数

// 判断依据二：参数类型：基础类型必须一致，如果是 object 类型，同参数兼容性：少属性没关系，多属性不行
let handler3 = (a: string, b: number) => {}
// hoc(handler3)       // error，参数类型不兼容

interface IPoint2D {
    x: number;
    y: number;
}
interface IPoint3D {
    x: number;
    y: number;
    z: number;
}
let p2d = (point: IPoint2D) => {}
let p3d = (point: IPoint3D) => {}
p3d = p2d       // 参数个数相同，参数类型都是 object，参数兼容性和对象兼容性正好相反：少属性没关系，多属性不行
// p2d = p23    // error，tips：可以关闭 strictFunctionTypes 选型来让它们兼容

// 判断依据三：返回值类型：返回值可以看做是对象，满足对象兼容性原则：多属性没关系，少属性不行
let f = () => ({name: 'Alice'})
let g = () => ({name: 'Alice', location: 'Beijing'})
f = g           // 返回值可以看做是对象，满足对象兼容性原则：多属性没关系，少属性不行
// g = f        // error，tips：可以关闭 strictFunctionTypes 选型来让它们兼容

// 函数重载：列表函数的参数不能多于源函数的参数
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}           // ok
// function overload(a: any): any {}                   // ok，列表函数的参数比源函数参数少是没问题的
// function overload(a: any, b: any, c: any): any {}   // error，列表函数的参数比源函数参数多
// function overload(a: any, b: any) {}                // error，返回值类型不兼容


// 类兼容性：
// 比较的是实例所占的内存空间，占空间少的的可以兼容占空间多的。基于此推论出几个信息：
// 1.constructor 和 static 是不参与比较的。因为 constructor 是分配内存空间，而 static 并不在实例对象的内存里
// 2.没有继承关系的类实例，占空间少的的可以兼容占空间多的
// 3.有继承关系的类实例，父类可以兼容子类，但子类不能兼容父类
class Parent1 {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number = 1
    private name: string = ''
}
class Parent2 {
    constructor(id: number) {
        this.id = id;
    }
    static s = 1
    id: number = 2
}
let parent1 = new Parent1(1, 'jack')
let parent2 = new Parent2(1)
// parent1 = parent2             // error 
parent2 = parent1               // OK，占空间少的的可以兼容占空间多的
class Child extends Parent1 {
    private age: number = 0
}
let child = new Child(3, 'jack')
parent1 = child     // OK，父类实例占空间肯定比子类实例占空间少
// child = parent1     // error

// 泛型兼容性
interface IEmpty<T> {
    value: T
}
let e1: IEmpty<number> = { value: 0 };
let e2: IEmpty<string> = { value: '0' };
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
logFunc2 = logFunc1
