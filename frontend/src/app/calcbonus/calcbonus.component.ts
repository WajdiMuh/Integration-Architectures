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
import { EvaluationRecord } from '../interfaces/EvaluationRecord';
import { forkJoin } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { CalcbonusdialogComponent } from '../calcbonusdialog/calcbonusdialog.component';

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
  performancerecord?:EvaluationRecord = undefined;
  customerratings:String[] = ["Excellent","Very Good","Good","Satisfactory"];
  chosenyear?:moment.Moment = undefined;
  constructor(private router: Router,private empservice:EmployeeService,private snackbar: MatSnackBar,private dialog: MatDialog) {
    try {
      this.selectedemp = this.router.getCurrentNavigation()?.extras?.state!['selectedemp'];
    } catch (error) {
      this.selectedemp = {name:"",department:"",jobtitle:"",employeeid:"",orangehrmid:""};
      this.router.navigateByUrl("/");
    }
  }
  chosenYearHandler(normalizedYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    this.date.setValue(normalizedYear);
    this.chosenyear = normalizedYear;

    this.finishedloading = false;
    const salesobs = this.empservice.getSalesbyemployeeinyear(this.selectedemp.employeeid,normalizedYear.year().toString());
    const performancerecordobs = this.empservice.getperformancerecordforemployeeinyear(this.selectedemp.employeeid,normalizedYear.year().toString());

    forkJoin([salesobs, performancerecordobs]).subscribe(results => {
      this.salesorders = results[0];
      this.performancerecord = results[1];
      this.finishedloading = true;
    },error => {
      this.salesorders = [];
      this.performancerecord = undefined;
      this.finishedloading = true;
      this.snackbar.open('No sales orders or performance records for this employee in the specified year were found',undefined, {
        duration: 2000
      });
    });
    datepicker.close();
  }

  calculatebonus(){
    const dialogRef = this.dialog.open(CalcbonusdialogComponent,{
      width: '50%',
      data: { 
        salesorders: this.salesorders,
        performancerecord: this.performancerecord
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){

        if(result.remark !== ""){
          this.empservice.addremark(this.selectedemp.employeeid,this.chosenyear!.year().toString(),result.remark).subscribe(result => {
          },error => {
            this.snackbar.open('remark already exists',undefined, {
              duration: 2000
            });
          });
        }

        this.empservice.addbonus(this.selectedemp.orangehrmid,this.chosenyear!.year(),result.totalbonus).subscribe(result => {
        },error => {

        });

      }
    });

  }

  ngOnInit(): void {
  }

}
