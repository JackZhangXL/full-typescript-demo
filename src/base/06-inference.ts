// 类型推断
let a = 1;                  // 推断出：let a: number
let b = [1, null, 'a']      // 推断出：let b: (string | number | null)[]
let c = {x: 1, y: 'a'}      // 推断出：let c: { x: number; y: string; }
let d = (x = 1) => x + 1    // 推断出：let d: (x?: number) => number

window.onkeydown = (e) => {     // 根据左侧事件类型，推断出：(parameter) e: KeyboardEvent
    // console.log(e.button)    // error，类型 KeyboardEvent 上不存在属性 button
}

interface Foo {
    bar: number
}
let foo1 = {} as Foo    // 可以用类型断言，但显然对象里并没有 bar 属性，不符合接口的约束。所以类型断言常用于兼容一些历史旧代码
let foo2 = <Foo>{}      // 第二种类型断言的方式，与上面等价，但不推荐这种，在 React 中有歧义
let foo3: Foo = {       // 这才是推荐的正确做法，避免滥用类型断言
    bar: 1            
}
