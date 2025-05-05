import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGrowthChartComponent } from './company-growth-chart.component';

describe('CompanyGrowthChartComponent', () => {
  let component: CompanyGrowthChartComponent;
  let fixture: ComponentFixture<CompanyGrowthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyGrowthChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyGrowthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
