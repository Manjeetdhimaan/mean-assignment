import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Employee } from '../models/employee.model';

export interface EmployeesResponse {
  success: boolean;
  message: string;
  employees: Employee[];
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  employee: Employee;
}

export interface ServerResponse {
  success: boolean,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // we can also use environment variables for Api Base Url;
  employeeBaseUrl = `http://localhost:3000/api/v1/employees`;

  constructor(private http: HttpClient) { }

  getEmployees():Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>(`${this.employeeBaseUrl}/get-employees`);
  }

  getEmployee(employeeId: string):Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.employeeBaseUrl}/get-employee/${employeeId}`);
  }

  getEmployeesCount(): Observable<number> {
    return this.http.get<number>(`${this.employeeBaseUrl}/get-employee-count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  postEmployee(employeeBody: Employee):Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.employeeBaseUrl}/post-employee`, employeeBody);
  }

  updateEmployee(employeeId: string, employeeBody: Employee):Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.employeeBaseUrl}/update-employee/${employeeId}`, employeeBody);
  }

  deleteEmployee(employeeId: string):Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.employeeBaseUrl}/delete-employee/${employeeId}`);
  }
}
