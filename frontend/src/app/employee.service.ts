import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './interfaces/Employee';
import { SalesOrder } from './interfaces/SalesOrder';
import { EvaluationRecord } from './interfaces/EvaluationRecord';
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

  getperformancerecordforemployeeinyear(employeeid:string,year:string): Observable<EvaluationRecord> {
    return this.http.get<EvaluationRecord>('/api/performancerecords/readperformancerecord/' + employeeid + '/' + year)
    .pipe(map(performancerecord => performancerecord,
      catchError(err => {
        throw 'error ' + err;
      })
    ));
  }

  addremark(employeeid:string,year:string,remark:string): Observable<boolean>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.post<string>('/api/bonusremark/addremark/' + employeeid + '/' + year,remark,{ headers, responseType: 'text' as 'json'})
    .pipe(map(_ => true,
      catchError(err => {
        throw 'error ' + err;
      })
    ));
  }

}
