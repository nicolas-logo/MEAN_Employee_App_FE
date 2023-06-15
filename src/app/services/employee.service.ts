import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URI_API: string = 'http://localhost:4001/api/employees';

  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get<Employee[]>(this.URI_API);
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post(this.URI_API, employee);
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.URI_API}/${id}`);
  }

  updateEmployee(employee: Employee) {debugger;
    return this.httpClient.put(`${this.URI_API}/${employee._id}`, employee);
  }
}
