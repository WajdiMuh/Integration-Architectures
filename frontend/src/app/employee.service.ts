import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './interfaces/Employee';
import { SalesOrder } from './interfaces/SalesOrder';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/api/orangehrm/readallemployees')
    .pipe(map(employees => employees,
      catchError(err => {
        throw 'error ' + err;
      }) 
    ));
  }

  getSalesbyemployeeinyear(employeeid:string,year:string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>('/api/opencrx/readsalesbyemployeeinyear/' + employeeid + '/' + year)
    .pipe(map(salesorders => salesorders,
      catchError(err => {
        throw 'error ' + err;
      })
    ));
  }

}
