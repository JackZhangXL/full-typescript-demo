abstract class Animal {
    eat() {     // 抽象类中已实现的方法，子类中可以直接继承
        console.log('eat')
    }
    abstract sleep(): void  // 抽象方法实现了多态，需要子类自己实现，是运行时绑定
}
// let animal = new Animal()   // error，抽象类不能被实例化

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()
cat.sleep()         // Cat sleep，运行时绑定

class Dog extends Animal {
    constructor(/* public */name: string) {     // constructor 构造函数的参数也可以声明 public，protected，private，这样该参数能自动变成成员变量，就不需要下面再定义了，代码可以简洁些
        super()
        this.name = name
        this.protectedFunc()
        this.privateFunc()
    }
    name: string = 'dog'            // 不声明默认就是 public
    run() { console.log('run') }    // 不声明默认就是 public
    protected protectedFunc() {}
    private privateFunc() {}
    readonly legs: number = 4
    static food: string = 'bones'
    sleep() {                       // 实现抽象类的抽象方法
        console.log('sleep')
    }
}

let dog = new Dog('wangwang')
console.log(dog.name)   // wangwang
dog.run()               // run，类自定义 public 方法
dog.eat()               // eat，从抽象类中继承来的方法
dog.sleep()             // sleep，从抽象类中继承来的抽象方法，运行时绑定
// dog.protectedFunc()  // error，声明为 protected 的方法只能在类和子类中访问，不能通过实例直接访问
                        // tips：将 constructor 声明成 protected，说明这个类只能当做基类，不能被实例化
// dog.privateFunc()    // error，声明为 private 的方法无法通过实例访问
// dog.legs = 8         // error，readonly 变量无法修改
console.log(Dog.food)   // bones
