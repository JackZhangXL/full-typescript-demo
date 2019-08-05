// boolean
let isProd: boolean = true

// number
let age: number = 123

// string
let str: string = 'abc'
// str = 123    // error，类型不匹配

// object
let	coordinate : { 
    x: number, 
    y: number 
} = { 
    x: 1, 
    y: 2 
}
coordinate.x = 3
// coordinate.x = '3'   // error，类型不匹配
// coordinate.z = 4     // error，未声明属性

// array
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, '4']

// tuple，TS 新增 tuple 元组类型，它是一种特殊的数组，可以将数组内元素数量和每个元素的类型都固定下来。
let tuple: [number, string] = [0, '1']
// tuple.push(2)        // OK，[0, '1', 2]，但强烈不建议这么做
// tuple[2]             // error，仍旧无法访问

// symbol
let s1: symbol = Symbol()

// undefined
let un: undefined = undefined
let un2: number | undefined = undefined

// null
let nu: null = null
let nu2: object | null = null

// void，表示函数没有返回值
function noReturn(): void {
    console.log('void means no return')
}
let vo: void = undefined  // 变量声明为 void 通常没什么用，也只能给它赋值为 undefined

// any，表示不确定类型，放弃静态编译，仍旧运行时绑定
let x: any = 1
x = []
x = () => {}

// never，表示放弃治疗
let error = () => {
    throw new Error('error')
}
let endless = () => {
    while(true) {}
}

// enum
enum Env {
    Local = 1,
    Test,
    Prod = 'prod',      // 数字，字符串混用在语法上是OK的，但不推荐这么做，没啥实际意义
}
console.log(Env.Test)   // 2
// Env.Local = 0           // error，枚举成员是只读的，定义后就不能修改

// const enum
const enum Month {      // 会被编译成：var month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */]; 代码很简洁
    Jan,
    Feb,
    Mar,
}
let firstMonth: Month = Month.Jan
console.log(firstMonth)     // 0
let month: Month[] = [Month.Jan, Month.Feb, Month.Mar]
console.log(month)          // [0, 1, 2]

