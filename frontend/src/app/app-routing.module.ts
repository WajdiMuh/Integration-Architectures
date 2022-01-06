import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CalcbonusComponent } from './calcbonus/calcbonus.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'calcbonus', component: CalcbonusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
