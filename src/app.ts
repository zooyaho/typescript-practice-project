// intesection type: &, 두 객체타입을 결합시키거나 두 유니언타입의 공통타입으로 새로운 타입을 만듬.
// 타입가드: 유니온타입이 지닌 유연성을 활용할 수 있게 해주며, 런타임 시 코드가 정확히 작동하게 해줌. 특정 속성이나 메서드를 사용하기 전에 그것이 존재하는지 확인하거나 타입을 사용하기 전에 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식을 말함!!, 객체의 경우 in,instanceof를 사용하고 다른 타입들의 경우 typeof를 사용할 수 있음.
// 구별된 유니언: 타입가드를 쉽게 구현할 수 있게 해줌, 객체 타입 사용시 유용, 유니언을 구성하는 모든 객체에 하나의 공통속성만 있고, switch문을 사용하여 공통속성에 따른 객체를 구별하여 해당 속성을 사용함
// 형변환(typecasting): 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할을 함.

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin , Employee {};
// 두 객체타입을 결합시킴
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Mark",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numberic = number | boolean;
//두 유니언타입의 공통타입으로 새로운 타입을 만듬.
type Universal = Combinable & Numberic; // number

const num: Universal = 12;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // 위 32라인을 타입가드라고 함. typeof를 사용하는 타입가드임.
    return a.toString() + b.toString();
  }
  return a + b;
}
console.log(add(1, 12));

type UnknwonEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknwonEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    // in으로 privileges이 emp객체의 속성으로 있는지 알수있음.
    console.log(emp.privileges);
  }
  if ("startDate" in emp) {
    console.log(emp.startDate);
  }
}
printEmployeeInformation(e1);

// class 에서의 타입가드 -> instanceof
class Car {
  drive() {
    console.log("Driving~!");
  }
}
class Truck {
  drive() {
    console.log("Driving a Truck~!");
  }
  loadCargo(amount: number) {
    console.log("Loading Cargo " + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if('loadCargo' in vehicle){
  if (vehicle instanceof Truck) {
    // vehicle이 Truck의 인스턴스인지 확인함.
    // instanceof는 자바스크립트에 내장되어 있음.
    vehicle.loadCargo(1000);
  }
}
useVehicle(v1);
useVehicle(v2);

/* 구별된 유니언 */
interface Bird {
  type: "bird"; // 구별된 유니언
  flyingSpeed: number;
}
interface Horse {
  type: "horse"; // 구별된 유니언
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  // if('flyingSpeed' in animal){
  //   // interface타입이여서 instanceof로 타입가드 작성할 수 없음.
  //   console.log("Moving with speed: " + animal.flyingSpeed);
  // }
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log(animal.type + " Moving at Speed: " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 300 });

/* 형변환(typecasting) */ 
// ! : 느낌표 앞의 표현식을 null로 반환하지 않겠다고 타입스크립트에게 인식 시킴.
// <HTMLInputElement>: 이 타입은 전역적으로 사용 가능, dom lib에 포함되어있기 때문
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = "Hi There~!";

// ! 사용하지 않을 경우: null인지 확신하지 못할 때
const userInputElement2 = document.getElementById('user-input');
if(userInputElement2){
  // () 감싸서 먼저 먼저 평가되게 한 후 값을 변경
  (userInputElement2 as HTMLInputElement).value = "Hello~!";
}

