// 映射类型：将旧的类型映射成新类型
interface IMap {
    a?: string;
    b: number;
    c: boolean;
}

type ReadonlyObj = Readonly<IMap>   // 全部变为 readonly

type PartialObj = Partial<IMap>     // 所有属性都可选

type RequiredObj = Required<IMap>   // 所有属性都必须

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

type T4 = Exclude<"a" | "b" | "c", "a" | "e">   // 取两个类型的差，T4 是 "b" | "c" 类型
// Exclude<"a", "a" | "e"> | Exclude<"b", "a" | "e"> | Exclude<"c", "a" | "e">
// never | "b" | "c"
// 所以 T4 的类型就是 "b" | "c"

type T5 = Extract<"a" | "b" | "c", "a" | "e">   // 取两个类型的交集，T6 是 "a" 类型

type T6 = NonNullable<string | number | undefined | null>   // 不允许 null 和 undefined，T6 是 string | number 类型

type T7 = Parameters<(a: number, b: string) => string> // 取函数的参数类型，以元祖形式返回，T7 是 [string, number] 类型

class Foo { 
    constructor(a: number, b: boolean, c: string) {} 
}

type T8 = ConstructorParameters<typeof Foo> // 取构造函数的参数类型，以元祖形式返回，T7 是 [string, number] 类型

type T9 = InstanceType<typeof Foo>   // 获取类的类型，T9 是 Foo 类型

type T10 = ReturnType<() => string>   // 获取函数返回值的类型，T10 是 string 类型
