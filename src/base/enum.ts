// 数字枚举
enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
}
// console.log(Role.Reporter)  // 1
// console.log(Role)           // {1: "Reporter", 2: "Developer", 3: "Maintainer", 4: "Owner", 5: "Guest"}

// 字符串枚举
enum Message {
    Success = '恭喜你，成功了',
    Fail = '抱歉，失败了'
}

// 异构枚举
enum Answer {
    N,
    Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 0    // error，枚举成员是只读的，定义后就不能修改
enum Char {
    // const member
    a,
    b = Char.a,
    c = 1 + 3,
    // computed member
    d = Math.random(),
    e = '123'.length,
    f = 4
}

// 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar,
    Apr = Month.Mar + 1,
    // May = () => 5
}
let month = [Month.Jan, Month.Feb, Month.Mar]   // 会被编译成：var month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */]; 代码很简洁

// 枚举类型
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// console.log(e === f)    // error，不同类型的枚举不能进行比较

let e1: E.a = 3
let e2: E.b = 3
let e3: E.a = 3
// console.log(e1 === e2)   // error
// console.log(e1 === e3)   // true

let g1: G = G.a
let g2: G.a = G.a
