import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';

import { EmployeeResponse, EmployeeService, ServerResponse } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss']
})
export class EmpEditComponent implements OnInit {
  editMode = false;
  submitted = false;
  isLoading = false;
  errMsg: string;
  empForm: FormGroup;
  empId: string;

  constructor(private empService: EmployeeService, private messageService: MessageService, private location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._initForm();
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param['id']) {
        this.editMode = true;
        this.empId = param['id'];
        this._getUser(this.empId);
      }
      else {
        this.editMode = false;
        this.empId = '';
      }
    })
  }

  get f() {
    return this.empForm.controls;
  }

  private _initForm() {
    this.empForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required])
    })
  }

  private _postEmp(empForm: Employee) {
    this.empService.postEmployee(empForm).subscribe(
      (res: ServerResponse) => {
        this.isLoading = false;
        this.errMsg = '';
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          timer(1000).toPromise().then(() => {
            this.location.back();
          })
        }
      },
      (err) => {
        this.isLoading = false;
        this._errorHandler(err);
      }
    );
  }

  private _getUser(empId: string) {
    this.isLoading = true;
    this.empService.getEmployee(empId).subscribe((res: EmployeeResponse) => {
      this.empForm.setValue({
        name: res.employee.name,
        department: res.employee.department,
        salary: res.employee.salary
      });
      this.isLoading = false;
      this.errMsg = '';
    }, err => {
      this.isLoading = false;
      this._errorHandler(err);
    });
  }

  private _updateEmp(emp: Employee) {
    this.empService.updateEmployee(this.empId, emp).subscribe(
      (res: ServerResponse) => {
        this.errMsg = '';
        if (res.success) {
          this.messageService.add({severity:'success', summary:'Success', detail: res['message']});
          timer(1000).toPromise().then(() => {
            this.location.back();
          })
        }
      },
      (err) => {
        this._errorHandler(err);
      }
    );
  }

  onSubmitForm() {
    this.submitted = true;
    if (!this.empForm.valid) return;
    if (this.editMode) {
      this._updateEmp(this.empForm.value);
    }
    else {
      this._postEmp(this.empForm.value);
    }
  }

  private _errorHandler(err: HttpErrorResponse) {
    if (err.error['message']) {
      this.errMsg = err.error['message'];
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error['message'],
      });
    } else {
      this.errMsg = 'An error occured';
      this.messageService.add({
        severity: 'error',
        summary: 'An error occured',
        detail: 'Please try again!',
      });
    }
  }
}
