import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcbonusComponent } from './calcbonus.component';

describe('CalcbonusComponent', () => {
  let component: CalcbonusComponent;
  let fixture: ComponentFixture<CalcbonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcbonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
