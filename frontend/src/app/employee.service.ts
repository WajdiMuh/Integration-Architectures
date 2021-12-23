import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from './interfaces/employee';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>('/api/orangehrm/readallemployees')
    .pipe(map(employees => employees,
      catchError(err => {
        throw 'error ' + err;
      }) 
    )); 
  }
}
