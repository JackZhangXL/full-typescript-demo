// 泛型的意义在于约束，能约束成相同类型。这是它与 any 的最大区别，any 没有任何约束信息。

// 泛型函数
function log<T>(value: T): T {
    console.log(value);
    return value;
}

log<string[]>(['a', ',b', 'c']) // ["a", "b", "c"]
log(['a', ',b', 'c'])           // ["a", "b", "c"]

const log2: <T>(value: T) => T = (value) => { 	// 函数变量的声明方式
    console.log(value);
    return value;
}
log2(['e', ',f', 'g'])          // ["e", "f", "g"]

// 类型定义泛型
type TLog= <T>(value: T) => T   // 也可以用类型定义来定义泛型
let log3: TLog = (value) => {
    console.log(value);
    return value;
}
log3({ a: 1, b: 2 })            // { a: 1, b: 2 }


// 泛型也可以约束接口
interface ILog {
    <T>(value: T): T            // 接口中某函数声明为泛型
}
interface ILog2<T> {            // 如果接口中所有函数都为某泛型，可以将 <T> 加到接口名后面
    (value: T): T
}
interface ILog3<T = string> {   // 也可以给泛型指定默认类型
    (value: T): T
}
let log4: ILog = log            
log4(123)                       // 123
let log5: ILog2<number> = log
log5(456)                       // 456
let log6: ILog3 = log
log6('789')                     // 789


// 泛型也可以约束类
class Log<T> {
    run(value: T) {
        console.log(value)
        // console.log(value.length)    // 会提示 T 上不存在 length 属性，所以需要泛型约束
        return value
    }
}
let log7 = new Log<number>()    // 显式指定类型
log7.run(1)                     // 1
let log8 = new Log()
log8.run({ a: 1 })              // {a: 1}，隐式推导


// 泛型约束
interface ILength {      // 先预定义接口
    length: number
}
function log9<T extends ILength>(value: T): T {   // T 继承自 ILength 接口受到约束，不再所有类型都支持，只能用带 length 属性的类型
    console.log(value.length);
    return value;
}
log9([1])             // 1，数组有 length 属性
log9('123')           // 3，字符串有 length 属性
log9({ length: 5 })   // 5，该对象有 length 属性
// log9({ a: 3 })        // error，该对象没有 length 属性
