import { Component, OnInit } from '@angular/core';
import { employee } from '../interfaces/employee';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees!: MatTableDataSource<employee>;
  filterobject:employee ={ name: "",employeeid: "",jobtitle: "" ,department:"" };
  displayedcols:string[] = ['name','employeeid','jobtitle','department'];
  constructor(private empservice:EmployeeService) { }
  filtertype:MatTableFilter = MatTableFilter.STARTS_WITH;
  ngOnInit(): void {
    this.empservice.getEmployees().subscribe(employees => {
      this.employees = new MatTableDataSource<employee>(employees);
    });
  }

}
