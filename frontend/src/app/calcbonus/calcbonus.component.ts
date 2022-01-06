import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../interfaces/employee';

@Component({
  selector: 'app-calcbonus',
  templateUrl: './calcbonus.component.html',
  styleUrls: ['./calcbonus.component.css']
})
export class CalcbonusComponent implements OnInit {
  selectedemp:employee;
  constructor(private router: Router) {
    this.selectedemp = this.router.getCurrentNavigation()?.extras?.state!['selectedemp'];
  }

  ngOnInit(): void {
  }

}
