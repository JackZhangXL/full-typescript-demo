abstract class Animal {
    eat() {     // 抽象类中已实现的方法，子类中可以直接继承
        console.log('eat')
    }
    abstract sleep(): void
}
// let animal = new Animal()   // error

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
        this.pri()
    }
    public name: string = 'dog'
    run() {}
    private pri() {}
    protected pro() {}
    readonly legs: number = 4
    static food: string = 'bones'
    sleep() {   // 实现抽象类的抽象方法
        console.log('Dog sleep')
    }
}
// console.log(Dog.prototype)
let dog = new Dog('wangwang')
// console.log(dog.name)   // wangwang
// dog.pri()   // error，私有方法无法通过实例访问
// dog.pro()   // error，保护方法只能在类和子类中访问，不能通过实例直接访问，将constructor声明成protected，说明这个类只能当做基类，不能被实例化
// console.log(Dog.food)   // bones
// dog.eat()   // eat
// dog.sleep()   // Dog sleep

class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name)
        this.color = color
        // this.pri()
        this.pro()
    }
    // color: string
}
// console.log(Husky.food)     // bones

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
    i.sleep()   // Dog sleep, Cat sleep，多态是运行时绑定
})

class Workflow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}
new Workflow().step1().step2()

class MyFlow extends Workflow {
    next() {
        return this
    }
}
new MyFlow().next().step1().next().step2()
