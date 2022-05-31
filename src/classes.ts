/* class
- private키워드: 생성된 객체 내부에서만 접근할수 있음. 정의된 클래스에서만 변경 가능하고, 상속 받은 클래스에서 수정이 불가능함.
- readonly: 추후에 변수의 값 변경이 안되게 함. private키워드 뒤에 작성!, 초기화 중에 한번만 작성해야함.
- protected: 상속 받은 클래스에서는 변경이 가능하지만 외부에서는 수정하지 못함!!private과의 차이점~!
- get/set(): private필드의 값을 class밖에서 할당하고 불러올때 사용함, 속성처럼 실행함. ex)acc.getMethod
- 정적메소드: static붙임, 클래스를 그룹화 메커니즘으로 사용하는 것, new로 인스턴스화하지 않고도 클래스의 메서드를 사용 가능함. 객체를 반환해야함.
- 정적 속성: 정적메서드와 같이 인스턴스화하지 않고도 접근할 수 있음. 정적이 아닌 부분들에서는 this키워드로 접근할 수 없음. 무조건 '해당클래스.정적메소드/속성'으로 접근 가능함. 정적 메서드 안에서만 정적속성을 this로 접근할 수 있음.
- 추상클래스: abstract키워드 추가, 해당 클래스에도 키워드 추가, 메소드의 형태와 메소드의 구조가 어떤것인지를 정의할 뿐 수정하지 않음. 상속받은 클래스에서 해당 추상메서드를 꼭 재정의 해야함! 추상클래스는 인스턴스화가 될수 없고 확장되어야 하는 클래스임.
- 싱글톤 패턴: private생성자로 만들어 하나의 클래스만 생성하기 위함(특징이 한개인건가, 같은 인스턴스를 여러개 만들수는 있음.), new연산자로 생성할 수 없게됨.-> 정적메서드와 속성으로만 접근이 가능함. 싱글톤 클래스는 “new”로 생성하지 않고 메소드를 호출하여 구성하므로 특정 시점에 반드시 단 하나의 클래스 인스턴스가 존재합니다.
*/

abstract class Department {
  // 정적 속성 추가
  static fiscalYear = 2022;
  // private readonly id: string;
  // public name:string;
  protected employees: string[] = [];

  /* 이중 초기화 작업을 축약함! */
  constructor(protected readonly id: string, public readonly name: string) {
    // this.name = n;
  }


  // 추상화 메소드: 어떤 형태의 메소드인지 보여주려고 작성하는거임..
  // 수정 불가능, {} 제거해야함
  abstract describe(this: Department): void;

  // 부서 이름
  // describe(this: Department) {
  //   // Department인스턴스에서만 호출이 가능한 메서드로 정의함.
  //   console.log(`Department(${this.id}): ${this.name}`);
  // }

  // 직원 추가
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  // 부서 정보 출력
  printEmployeeInformation() {
    console.log("사원수: " + this.employees.length);
    console.log("사원 이름: " + this.employees);
  }

  // 정적메소드
  static createEmployee(name: string) {
    // 객체 반환해야함.
    return {name: name};
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe(): void {
    console.log(`Department(${this.id}): ${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  // 클래스내에서만 접근 가능한 정적 속성.
  // AccountingDepartment를 대체하여 클래스 이름을 지정할 수 있음.
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance(){
    // instance의 정적 속성들을 모두 접근가능함.
    if(AccountingDepartment.instance){
      // 이 클래스에 인스턴스가 있는지 확인하고, 없다면 새 인스턴스를  반환
      return this.instance;
    }
    // instance가 AccountingDepartment의 인스턴스인 것을 명시하고, 이제 private AccountingDepartment의 생성자에 접근할 수 있음.
    this.instance = new AccountingDepartment("A01", []);
    return this.instance;
  }

  describe(): void {
    console.log(`Department(${this.id}): ${this.name}`);
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report.");
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("please pass in a valid report");
    }
    this.addReports(value);
  }

  addEmployee(employee: string): void {
    if (employee === "mark") {
      return;
    }
    this.employees.push(employee);
  }
  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

// new연산자로 인스턴스화하지않고 객체를 만들 수 있음?
const employee1 = Department.createEmployee("employee1");
console.log(employee1);
console.log(Department.fiscalYear);

// const accounting = new AccountingDepartment();
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = "running";
accounting.mostRecentReport;
accounting.addReports("study");
accounting.printReports();

accounting.addEmployee("mark");
accounting.addEmployee("jungwoo");

accounting.describe();
accounting.printEmployeeInformation();

const it = new ITDepartment("A01", ["JungWoo"]);
// console.log(it);

it.addEmployee("Mark");
it.addEmployee("Haechan");

it.describe();
it.printEmployeeInformation();
console.log(it);

// const accountingCoppy = {describe: accounting.describe,name: "DUMMY" }
// // 에러가 나는 이유: Department의 인스턴스에서 호출한게 아니기 때문!!
// accountingCoppy.describe();
