import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../employee.service';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SalesOrder } from '../interfaces/SalesOrder';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-calcbonus',
  templateUrl: './calcbonus.component.html',
  styleUrls: ['./calcbonus.component.css'],
  providers: [ { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class CalcbonusComponent implements OnInit {
  selectedemp:Employee;
  date = new FormControl();
  finishedloading:Boolean = true;
  salesorders:SalesOrder[] = [];

  constructor(private router: Router,private empservice:EmployeeService,private snackbar: MatSnackBar) {
    try {
      this.selectedemp = this.router.getCurrentNavigation()?.extras?.state!['selectedemp'];
    } catch (error) {
      this.selectedemp = {name:"",department:"",jobtitle:"",employeeid:"",orangehrmid:""};
      this.router.navigateByUrl("/");
    }
  }

  chosenYearHandler(normalizedYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    this.date.setValue(normalizedYear);
    this.finishedloading = false;
    this.empservice.getSalesbyemployeeinyear(this.selectedemp.employeeid,normalizedYear.year().toString()).subscribe(salesorders => {
      this.salesorders = salesorders;
      this.finishedloading = true;
    },error => {
      this.salesorders = [];
      this.finishedloading = true;
      this.snackbar.open('No sales orders for this employee in the specified year were found',undefined, {
        duration: 2000
      });
    });
    datepicker.close();
  }

  ngOnInit(): void {
  }

}
