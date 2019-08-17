// object 接口
interface IShop {
    readonly shopId: number // readonly 声明只读属性
    name: string
    address?: string        // ? 声明可选属性
    getBudget(): number
}

// 姿势一：显式声明类型，会非常严格地进行类型检查，属性不能多也不能少
const mockShop: IShop = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', getBudget: () => Math.random() }
// const mockShop: IShop = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', getBudget: () => Math.random(), extraParam: 1 }   // error，多了一个属性
// const mockShop: IShop = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈' }   // error，少了一个属性


// 姿势二：隐式类型推断，相对宽松点，只要是接口的超集就行，即属性可以多，但不能少
// 因为实际项目中要允许后端传一些额外的属性，变量定义时并不声明类型，让函数接受参数时进行隐式推断
function render(shop: IShop) {
    console.log(`ID：${shop.shopId}`)
    console.log(`店名：${shop.name}`)
    if (shop.address) {
        console.log(`地址：${shop.address}`)
    }
    shop.getBudget();
}

const mockShop2 = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', getBudget: () => Math.random(), extraParam: 1 } // 多属性可以
// const mockShop2 = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈' } // 少属性不行
render(mockShop2)


// 姿势三：用类型断言明确告诉编译器：“我知道我在干什么，请跳过类型检查。”  这样编译肯定能通过，但真有 bug，例如少属性，运行时会暴露
// const mockShop3 = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈' }    // 少属性，编译ok，运行时就挂了
// render(mockShop3 as IShop)  // 两种类型断言方式等价，但更推荐这种
// render(<IShop>mockShop2)    // 两种类型断言方式等价，但不推荐这种，在 React 中有歧义


// function 接口
interface IAdd2 {
    (x: number, y: number): number
}
let add9: IAdd2 = (a, b) => a + b
add9(1, 2)    // 3
// add9('1', 2)    // error，参数类型错误


// class 接口
interface IHuman {   // 其实就是 object 接口，只能描述类的 public 成员变量和成员方法
    name: string;
    eat(): void;
}

class Asian implements IHuman {      // 用 implements 让类实现接口，必须实现接口中的所有属性
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() {}
    sleep() {}
}

// 接口间可以继承
interface IMan extends IHuman {
    run(): void
}
interface IChild {
    cry(): void
}
interface IBoy extends IMan, IChild {}

let boy: IBoy = {
    name: '',
    eat() {},
    run() {},
    cry() {}
}

// 接口继承类：相当于接口将类的结构都抽象出来了
class Auto {
    price = 20
}
interface IAuto extends Auto {}
class Car implements IAuto {
    price = 50
}
class Audi extends Car implements IAuto {

}

let myAudi = new Audi();
console.log(myAudi.price)   // 50


// 混合接口：JS 本就有的特性，可以给对象随意增加属性（可以表现的像对象，也能表现的像函数），非 TS 新增特性
interface ICounter {
    (start: number): void     // 表现成函数
    interval: number          // 表现成对象（属性）
    reset(): void             // 表现成对象（方法）
}

function getCounter(): ICounter {
    let counter = ((start: number) => console.log(`start: ${start}`)) as ICounter
    counter.interval = 0
    counter.reset = () => { counter.interval = 0 }
    return counter
}

let counter1 = getCounter()
counter1(10)                      // 10
console.log(counter1.interval)    // 0

let counter2 = getCounter()
counter2.interval = 5
console.log(counter2.interval)    // 5
counter2.reset()
console.log(counter2.interval)    // 0
