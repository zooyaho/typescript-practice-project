// interface: 객체의 구조를 정의, 타입스크립트에만 있음. 사용자 정의 타입으로 사용, 대문자로 시작, 구체적 값이 아닌 구조만 나타냄.
// 객체의 타입을 확인하는데 사용함. 세미콜론으로 구분함.
// 사용자 정의 타입과 차이점: 객체유형을 정의할때는 인터페이스를 사용함.
// 클래스에서 'implements 인터페이스' 로 사용함. 쉼표로 구분하여 여러개를 구현할 수 있음. 서로 다른 클래스간의 기능을 공유하기 위해 사용됨.
// readonly제어자 사용 가능, private,protected 사용 불가
// 함수의 구조 정의에도 사용 가능함. -> 그냥 다 사용하네 먼 -> 함수 구조는 사용자정의타입을 많이 사용함. 
// 변수에 ?을 뒤에 붙여 상속시 선택적으로 사용할 수 있게 함.

// type addFn = (a:number, b:number) => {number}
interface addFn {
  // 함수 구조 정의하는 법~! -> 익명함수에 사용해야 함.
  (a:number, b:number): number;
}

let addNum: addFn;
addNum = (a,b)=>{
  return a+b
}

let add = addNum(1,2);
console.log(add);

interface Named {
  readonly name?: string|number;
  outputName?: string; // 선택적으로 사용할수 있게 해줌
}
interface Greetable extends Named{
  // Named에 정의된 모든 요소를 입력하도록 요구하지 않음.
  name?: string; // 재정의
  greet(phrase: string): void; // 구조만 나타내야함.
}

class Person implements Greetable{
  name?: string;
  age: number = 22;
  constructor(n:string="mark") {
    if(n){
      this.name = n
    }
  }
  greet(phrase: string): void {
    console.log(phrase + ' '+ this.name);
  }
}

let user: Greetable;
user = new Person();
// user.name = "jisoo";
user.greet("hello");
