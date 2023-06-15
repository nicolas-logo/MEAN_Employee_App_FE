import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees: Employee[] = [];
  selectedEmployee: Employee = {
    name: '',
    office: '',
    position: '',
    salary: 0,
    _id: ''
  }

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => this.employees = res,
      error:(err) => console.error(err)
    });
  }

  createEmployee(form: NgForm) {
    this.employeeService.createEmployee(form.value).subscribe({
      next: (res) => this.getEmployees(),
      error:(err) => console.error(err)
    });
  }

  deleteEmployee(_id: string) {
    this.employeeService.deleteEmployee(_id).subscribe({
      next: (res) => this.getEmployees(),
      error:(err) => console.error(err)
    });
  }

  updateEmployee(form: NgForm) {
    this.employeeService.updateEmployee(form.value).subscribe({
      next: (res) => {
        this.getEmployees();
        form.reset();
      },
      error:(err) => console.error(err)
    });
  }

  loadEmployee(employee: Employee) {debugger;
    this.selectedEmployee = JSON.parse(JSON.stringify(employee));
  }

  manageEmployee(form: NgForm) {
    this.selectedEmployee._id ? this.updateEmployee(form) : this.createEmployee(form)
  }

}
