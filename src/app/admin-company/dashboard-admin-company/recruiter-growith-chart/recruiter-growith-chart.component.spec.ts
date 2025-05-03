import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterGrowithChartComponent } from './recruiter-growith-chart.component';

describe('RecruiterGrowithChartComponent', () => {
  let component: RecruiterGrowithChartComponent;
  let fixture: ComponentFixture<RecruiterGrowithChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterGrowithChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterGrowithChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
