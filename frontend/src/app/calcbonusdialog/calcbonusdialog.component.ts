import { Component, OnInit, Inject , ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SalesOrder } from '../interfaces/SalesOrder';
import { EvaluationRecord } from '../interfaces/EvaluationRecord';

@Component({
  selector: 'app-calcbonusdialog',
  templateUrl: './calcbonusdialog.component.html',
  styleUrls: ['./calcbonusdialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalcbonusdialogComponent implements OnInit {

  totalbonus:number = 0.0;
  totalbonusstring:string = "";
  remark:string = "";
  ordersbonusstring:string = "";
  performancebonusstring:string = "";

  constructor(@Inject(MAT_DIALOG_DATA) private data: {salesorders: SalesOrder[],performancerecord: EvaluationRecord}) { }

  ngOnInit(): void {
    let salesbonus:number = 0;
    this.data.salesorders.forEach(salesorder => {
      let amountofitems = 0;
      salesorder.products.forEach(product => amountofitems += product.quantity);
      salesbonus += (5 - salesorder.customer.rating) * amountofitems;
      this.ordersbonusstring += `<span class='customerrating'>${5 - salesorder.customer.rating}</span> x <span class='productquantity'>${amountofitems}</span> + `;
    });
    this.ordersbonusstring = this.ordersbonusstring.slice(0,-2);
    this.ordersbonusstring += `= ${salesbonus}€`;

    let performancebonus:number =  ((this.data.performancerecord.competence.actualval / this.data.performancerecord.competence.targetval) + 
    (this.data.performancerecord.openness.actualval / this.data.performancerecord.openness.targetval) + 
    (this.data.performancerecord.socialbehaviour.actualval / this.data.performancerecord.socialbehaviour.targetval) + 
    (this.data.performancerecord.attitude.actualval / this.data.performancerecord.attitude.targetval) + 
    (this.data.performancerecord.communication.actualval / this.data.performancerecord.communication.targetval) + 
    (this.data.performancerecord.integrity.actualval / this.data.performancerecord.integrity.targetval)) * 50;

    this.performancebonusstring = `( <sup class='actualval'>${this.data.performancerecord.competence.actualval}</sup>&#8260;<sub class='targetval'>${this.data.performancerecord.competence.targetval}</sub> + 
    <sup class='actualval'>${this.data.performancerecord.openness.actualval}</sup>/<sub class='targetval'>${this.data.performancerecord.openness.targetval}</sub> +
    <sup class='actualval'>${this.data.performancerecord.socialbehaviour.actualval}</sup>/<sub class='targetval'>${this.data.performancerecord.socialbehaviour.targetval}</sub> +
    <sup class='actualval'>${this.data.performancerecord.attitude.actualval}</sup>/<sub class='targetval'>${this.data.performancerecord.attitude.targetval}</sub> +
    <sup class='actualval'>${this.data.performancerecord.communication.actualval}</sup>/<sub class='targetval'>${this.data.performancerecord.communication.targetval}</sub> +
    <sup class='actualval'>${this.data.performancerecord.integrity.actualval}</sup>/<sub class='targetval'>${this.data.performancerecord.integrity.targetval}</sub> ) x 50 = ${performancebonus}€`;

    this.totalbonus = salesbonus + performancebonus;
    this.totalbonusstring = `<span class='ordersevaluationbonus'>${salesbonus}</span> + <span class='socialperformanceevaluationbonus'>${performancebonus}</span> = ${this.totalbonus}€`;
  }

}