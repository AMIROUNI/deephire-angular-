import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingChartComponent } from './job-posting-chart.component';

describe('JobPostingChartComponent', () => {
  let component: JobPostingChartComponent;
  let fixture: ComponentFixture<JobPostingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostingChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
