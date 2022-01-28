import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcbonusdialogComponent } from './calcbonusdialog.component';

describe('CalcbonusdialogComponent', () => {
  let component: CalcbonusdialogComponent;
  let fixture: ComponentFixture<CalcbonusdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcbonusdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcbonusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
