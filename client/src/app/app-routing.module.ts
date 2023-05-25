import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpEditComponent } from './components/emp-edit/emp-edit.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'employees', pathMatch: 'full'
  },
  {
    path: 'employees', component: EmpListComponent, title: 'Employees List'
  },
  // using same component to edit and add employee
  {
    path: 'employees/new', component: EmpEditComponent, title: 'Add a new employee'
  },
  {
    path: 'employees/edit/:id', component: EmpEditComponent, title: 'Edit employee data'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
