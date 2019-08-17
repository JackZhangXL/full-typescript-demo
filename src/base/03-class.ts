abstract class Animal {
    eat() {     // 抽象类中可以定义方法，子类能直接继承过来直接用
        console.log('eat')
    }
    abstract roar(): void  // 抽象类中可以定义抽象方法，子类需要自己去实现。这样就实现了多态，可以运行时绑定。
}
// let animal = new Animal()   // error，抽象类不能被实例化

class Cat extends Animal {
    roar() {
        console.log('miao~')
    }
}
let cat = new Cat()
cat.roar()         // miao~，运行时绑定


class Dog extends Animal {
    constructor(/* public */name: string) {     // constructor 构造函数的参数也可以声明 public，protected，private，这样该参数能自动变成成员变量，就不需要下面再定义了，代码可以简洁些
        super()
        this.name = name
    }
    name: string = 'dog'            // 不声明默认就是 public
    run() { console.log('run') }    // 不声明默认就是 public
    protected protectedFunc() {}
    private privateFunc() {}
    readonly legs: number = 4
    static food: string = 'bones'
    roar() {                       // 实现抽象类的抽象方法
        console.log('wangwang')
    }
}

let dog = new Dog('lulu')
dog.eat()               // eat，从抽象类中继承来的方法
dog.roar()              // wangwang，从抽象类中继承来的抽象方法，运行时绑定
dog.name                // lulu
dog.run()               // run
// dog.protectedFunc()  // error，声明为 protected 的方法只能在类和子类中访问，不能通过实例直接访问
//                      // tips：将 constructor 声明成 protected，说明这个类只能当做基类，不能被实例化
// dog.privateFunc()    // error，声明为 private 的方法无法通过实例访问
// dog.legs = 8         // error，readonly 变量无法修改
Dog.food                // bones


class ChinaDog extends Dog {
    constructor(name: string) {
        super(name)
    }
    someFunc() {
        this.protectedFunc()    // protected 方法可以在子类中访问
        // this.privateFunc()   // error，private 方法子类中都无法访问
    }
}
