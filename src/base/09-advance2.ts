// 映射类型
interface IMap {
    a: string;
    b: number;
}
type ReadonlyObj = Readonly<IMap>   // 全部变为 readonly

type PartialObj = Partial<IMap>     // 所有属性都可选

type PickObj = Pick<IMap, 'a' | 'b'>    // 抽取子集

type RecordObj = Record<'x' | 'y', IMap>    // 创建新类型


// 条件类型，语法：T extends U ? X : Y
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
type T1 = TypeName<string>      // T1 是 string 类型
type T2 = TypeName<string[]>    // T2 是 object 类型

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)
type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T
type T4 = Diff<"a" | "b" | "c", "a" | "e">
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// 所以 T4 的类型就是 "b" | "c"

type NotNull<T> = Diff<T, null | undefined>     // 从 T 中过滤掉 null 和 undefined
type T5 = NotNull<string | number | undefined | null>   // T5 是 string | number 类型

// 上面 Diff 的实现官方已经抽成了内置方法：Exclude<T, U>
// 上面 NotNull 的实现官方已经抽成了内置方法：NonNullable<T>

// 官方还提供了些内置方法：
// Extract<T, U>：和 Exclude 相反，从类型 U 中抽取出可以给 T 用的类型
type T6 = Extract<"a" | "b" | "c", "a" | "e">   // T6 是 "a" 类型

// ReturnType<T>：获取函数返回值的类型
type T8 = ReturnType<() => string>              // T8 是 string 类型
