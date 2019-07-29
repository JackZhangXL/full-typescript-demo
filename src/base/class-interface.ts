// 类实现接口
interface Human {
    name: string;
    eat(): void;
}

class Asian implements Human {      // implements 让类实现接口，必须实现接口中的所有属性
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() {}
    age: number = 0
    sleep() {}
}

// 接口继承接口
interface Man extends Human {
    run(): void
}

interface Child {
    cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
    name: '',
    run() {},
    eat() {},
    cry() {}
}

// 接口继承类
class Auto {
    state = 1
    // private state2 = 1
}
interface AutoInterface extends Auto {

}
class C implements AutoInterface {
    state = 1
}
class Bus extends Auto implements AutoInterface {

}
