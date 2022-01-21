abstract class Department {
	static fiscalYear = 2020
	protected employees: string[] = []

	constructor(protected readonly id: string, public name: string) {}

	static createEmployee(name: string) {
		return {
			name: name,
		}
	}

	abstract describe(this: Department): void

	addEmployee(employee: string) {
		this.employees.push(employee)
	}

	printEmployeeInformation() {
		console.log(this.employees.length)
		console.log(this.employees)
	}
}

class ITDepartment extends Department {
	admins: string[]
	constructor(id: string, admins: string[]) {
		super(id, 'IT')
		this.admins = admins
	}

	describe(): void {
		console.log(`IT Department - ID: ${this.id}`)
	}
}

class AccountingDepartment extends Department {
	private lastReport: string
	private static instance: AccountingDepartment

	get mostRecentReport() {
		if (this.lastReport) return this.lastReport

		throw new Error('No report found')
	}

	set mostRecentReport(value: string) {
		if (!value) {
			throw new Error('Please pass in a valid value!')
		}
		this.addReport(value)
	}

	private constructor(id: string, private reports: string[]) {
		super(id, 'Accounting')
		this.lastReport = reports[0]
	}

	static getInstance() {
		if (AccountingDepartment.instance) return this.instance
		this.instance = new AccountingDepartment('d2', [])
		return this.instance
	}

	describe() {
		console.log(`Accounting Department - ID: ${this.id}`)
	}

	addEmployee(name: string) {
		if (name === 'Enzo') {
			return
		}

		this.employees.push(name)
	}

	addReport(text: string) {
		this.reports.push(text)
		this.lastReport = text
	}

	printReports() {
		console.log(this.reports)
	}
}

const employee = ITDepartment.createEmployee('Bonnie')
console.log(employee, Department.fiscalYear)

const itDepartment = new ITDepartment('1', ['Germán'])

itDepartment.addEmployee('Enzo')
itDepartment.addEmployee('Abi')

itDepartment.printEmployeeInformation()

itDepartment.describe()

console.log(itDepartment)

//const accounting = new AccountingDepartment('d2', [])
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()
console.log(accounting2)
accounting.mostRecentReport = 'AEA'
console.log(accounting.mostRecentReport)
accounting.addReport('Something went wrong ...')
accounting.addEmployee('Enzo')
accounting.describe()
//accounting.printReports()
//accounting.printEmployeeInformation()

//const accountingCopy = { name: "DUMMY", describe: accounting.describe }

//accountingCopy.describe()
