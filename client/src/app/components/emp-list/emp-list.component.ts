import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService, EmployeesResponse, ServerResponse } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html'
})
export class EmpListComponent implements OnInit {

  isLoading = false;
  errMsg: string;
  employees: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe(
      (res: EmployeesResponse) => {
        this.employees = res['employees'];
        this.isLoading = false;
        this.errMsg = '';
      },
      (err) => {
        this.isLoading = false;
        this._errorHandler(err);
      }
    );
  }

  onDeleteEmp(empId: string, emp: Employee) {
    this.errMsg = '';
    this.confirmationService.confirm({
      message: 'Are you sure to delete data of employee ' + emp.name + '?',
      header: 'Delete employee ' + emp.name + '?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(empId).subscribe(
          (res: ServerResponse) => {
            this.errMsg = '';
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res['message']
              });
              // updating data after success response
              this.employees.splice(this.employees.indexOf(emp), 1);
              // or we can fetch latest copy from the server
            }
          },
          (err) => {
            this._errorHandler(err);
          }
        );
      }
    });
  }

  onUpdateEmp(empId: string) {
    this.router.navigate(['/employees/edit/'+empId]);
  }

  private _errorHandler(err: any) {
    if (err.error['message']) {
      this.errMsg = err.error['message'];
    }
    else {
      this.errMsg = 'An Error occured'
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occured'
      });
    }
  }
}
