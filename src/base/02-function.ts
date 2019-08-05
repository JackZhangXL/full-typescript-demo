// 定义函数
// 方式一：function 关键字
function add1(x: number, y: number): number {
    return x + y
}
// add1(1, 2, 3)   // error，多了个参数

// 方式二：变量
let add2 = (x: number, y: number): number => x + y

// 方式三：类型别名 type，TS 新增方式，只是定义函数，你还需要提供函数的具体实现
type add3 = (x: number, y: number) => number

// 方式四：接口 interface，TS 新增方式，只是定义函数，你还需要提供函数的具体实现
interface add4 {
    (x: number, y: number): number
}

// 可选参数：可选参数只能位于参数末尾，不能在参数中间插入个可选参数
function add5(x: number, y?: number) {
    return y ? x + y : x
}
add5(1)     // 1，可选参数可以不传

// 参数默认值
function add6(x: number, y: number = 2, z: number, q: number = 4) {
    return x + y + z + q
}
add6(1, undefined, 3)   // 10，如果想用【中间参数】的默认值，要传入 undefined
add6(1, 20, 3)          // 28

// 剩余参数
function add7(x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur)
}
add7(1, 2, 3, 4, 5)     // 15

// 函数重载
// 1.函数名必须相同
// 2.参数类型可以不同。如果参数类型不同，列表函数中的参数类型应设置为 any
// 3.参数数量可以不同。如果参数梳理不同，列表函数中的不同的参数设置为可选参数（?）或剩余参数（...）
// 4.返回类型也可以不同
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]) {         // 列表函数
    let first = rest[0]
    if (typeof first === 'number') {
        return rest.reduce((pre, cur) => pre + cur)
    }
    if (typeof first === 'string') {
        return rest.join('')
    }
}
add8(1, 2)              // 3
add8('a', 'b', 'c')     // abc

function disp(s1: string): void
function disp(n1: number, s1: string): void
function disp(x: any, y?:any): void {   // 列表函数
    console.log(`${x} ${y}`)
} 
disp('abc')     // abc undefined
disp(1, 'xyz')  // 1 xyz
