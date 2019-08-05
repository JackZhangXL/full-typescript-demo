enum Type { Strong, Week }

class Java {
    jdk: string = '10'
    helloJava() { console.log('Hello Java') }
}

class JavaScript {
    ecma: string = '8'
    helloJavaScript() { console.log('Hello JavaScript')}
}

// 类型保护函数
// 参数是联合类型，可能是 Java 也可能是 JavaScript
// 返回值是类型谓词（参数 is 类型）
function isJava(lang: Java | JavaScript): lang is Java { 
    return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
    let lang = type === Type.Strong ? new Java() : new JavaScript();
    
    // // Step1
    // if (lang.helloJava) {        // error，类型上不存在 helloJava 属性
    //     lang.helloJava()
    // } else {
    //     lang.helloJavaScript()
    // }

    // Step2
    if ((lang as Java).helloJava) { // ok，用类型断言可以绕过类型检查，但这样每个地方都要类型断言太麻烦了
        (lang as Java).helloJava()
    } else {
        (lang as JavaScript).helloJavaScript()
    }

    // 类型保护方式一：typeof 判断基本类型
    if (typeof x === 'string') {
        console.log(x.length)
    } else {
        console.log(x.toFixed(2))   // 1.00
    }

    // 类型保护方式二：in 判断对象是否含有某属性
    if ('jdk' in lang) {
        lang.helloJava()
    } else {
        lang.helloJavaScript()
    }

    // 类型保护方式三：instanceof 判断是否某类的实例对象
    if (lang instanceof Java) {
        lang.helloJava()
    } else {
        lang.helloJavaScript()
    }

    // 类型保护方式四：自定义类型保护函数
    if (isJava(lang)) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    return lang;
}

getLanguage(Type.Week, 1)
