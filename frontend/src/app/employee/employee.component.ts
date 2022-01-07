import { Component, OnInit } from '@angular/core';
import { employee } from '../interfaces/employee';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  finishedloading:Boolean = false;
  employees!: MatTableDataSource<employee>;
  filterobject:employee ={ name: "",employeeid: "",jobtitle: "" ,department:"",orangehrmid:"" };
  displayedcols:string[] = ['name','employeeid','jobtitle','department'];
  constructor(private empservice:EmployeeService,private router: Router) { }
  filtertype:MatTableFilter = MatTableFilter.STARTS_WITH;
  ngOnInit(): void {
    this.empservice.getEmployees().subscribe(employees => {
      this.employees = new MatTableDataSource<employee>(employees);
      this.finishedloading = true;
    });
  }
  clickedrow(row:employee){
    this.router.navigateByUrl('/calcbonus', { state: { selectedemp: row } });
  }
}
