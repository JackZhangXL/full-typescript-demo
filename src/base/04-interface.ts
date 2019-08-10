// object 接口
interface IShop {
    readonly shopId: number // readonly 声明只读属性
    name: string
    address?: string        // ? 声明可选属性
    getBudget(): number
}

function render(shop: IShop) {
    console.log(`ID：${shop.shopId}`)
    console.log(`店名：${shop.name}`)
    if (shop.address) {
        console.log(`地址：${shop.address}`)
    }
    shop.getBudget();
    // shop.shopId++   // error，read-only 属性不允许修改
}

// 使用姿势一：变量定义时声明了接口类型，这样就不能有接口中未定义的额外的属性
let mockShop: IShop = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', getBudget: () => Math.random() }
// let mockShop: IShop = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', phone: 111 }    // error，有未定义属性
render(mockShop)
// ID：123
// 店名：XX烧烤店 
// 地址：虹桥商圈

// 但有时候后端接口也不用完全 100% 相同，可以允许后端传一些额外的属性
// 使用姿势二：变量定义时并不声明类型（就是普通JS对象），可以允许 object 里含有一些额外的属性
let mockShop2 = { shopId: 123, name: 'XX烧烤店', address: '虹桥商圈', getBudget: () => Math.random(), phone: 111 }
render(mockShop2)

// 使用姿势三：用类型断言明确告诉编译器，我知道我在干什么。可以允许 object 里含有一些额外的属性
render(mockShop2 as IShop)  // 两种类型断言方式等价，但更推荐这种
render(<IShop>mockShop2)    // 两种类型断言方式等价，但不推荐这种，在 React 中有歧义


// function 接口
interface IAdd2 {
    (x: number, y: number): number
}
let add9: IAdd2 = (a, b) => a + b    // 函数的参数名【不需要】与接口声明的参数名相同
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
    age: number = 0
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

// 接口继承类
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


// 混合接口：即可以表现的像对象，也能表现的像函数
interface Counter {
    (start: number): void     // 表现成函数
    interval: number            // 表现成对象（属性）
    reset(): void               // 表现成对象（方法）
}

function getCounter(): Counter {
    let counter = ((start: number) => console.log(`start: ${start}`)) as Counter
    counter.interval = 0
    counter.reset = () => { counter.interval = 0 }
    return counter
}

let c1 = getCounter()
c1(10)                      // 10
console.log(c1.interval)    // 0

let c2 = getCounter()
c2.interval = 5
console.log(c2.interval)    // 5
c2.reset()
console.log(c2.interval)    // 0
